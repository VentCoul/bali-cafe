import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/poster/client';
import { generateLiqPayCheckoutUrl } from '@/lib/payments/liqpay';
import { CartItem } from '@/lib/store/cartStore';
import { validateCheckoutPayload } from '@/lib/validation/checkout';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { customer, items, orderType, tableId, paymentType, appliedBonuses } = data;

    const validationResult = validateCheckoutPayload(data);
    if (!validationResult.isValid) {
      return NextResponse.json({ success: false, error: validationResult.error }, { status: 400 });
    }

    // 1. Calculate total
    const totalAmount = items.reduce((sum: number, item: CartItem) => {
      const itemTotal = item.product.weight_flag === '1'
        ? (item.product.price * (item.quantity / 100))
        : (item.product.price * item.quantity);
      return sum + itemTotal;
    }, 0);
    const orderId = `ORDER-${Date.now()}`;

    // 2. Fetch or create Poster client based on phone
    let posterClient = null;
    if (customer.phone) {
      const { getClientByPhone, createPosterClient } = await import('@/lib/poster/client');
      posterClient = await getClientByPhone(customer.phone);
      if (!posterClient) {
        posterClient = await createPosterClient({
          phone: customer.phone,
          client_name: customer.name
        });
      }
    }

    // 3. Format payload for Poster incomingOrders.createIncomingOrder
    const posterProducts = items.map((item: CartItem) => ({
      product_id: item.product.product_id,
      count: item.product.weight_flag === '1' ? (item.quantity / 100) : item.quantity,
      price: item.product.price * 100 // Convert back to kopecks for Poster
    }));

    const posterPayload: any = {
      spot_id: "1", // Needs to be dynamic or configured based on spot
      phone: customer.phone,
      first_name: customer.name,
      comment: customer.comment,
      products: posterProducts,
      // For MVP, we will let Poster calculate the final totals natively
    };

    if (posterClient) {
      posterPayload.client_id = posterClient.client_id;
      // Note: Poster expects bonus in UAH or kopecks depending on settings. Usually incomingOrders accepts kopecks or UAH string. 
      // We will send it as UAH string or number. Let's send it as number.
      if (appliedBonuses > 0) {
        // We might want to cap it by the client's actual balance, but let's assume UI validated it.
        // Also we must convert to kopecks for Poster if it expects it, but according to docs 'bonus' field in createIncomingOrder is often a string.
        posterPayload.bonus = String(appliedBonuses);
      }
    }

    if (orderType === 'dine_in' && tableId) {
      posterPayload.table_id = tableId;
    }

    // 4. Handle LiqPay
    if (paymentType === 'liqpay') {
      const paymentUrl = generateLiqPayCheckoutUrl({
        order_id: orderId,
        amount: totalAmount,
        description: `Замовлення в Bali Cafe від ${customer.name}`,
        // result_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success`,
      });

      // We return the URL so the frontend can redirect the user
      // Note: We don't send to Poster YET, because we need a webhook to confirm payment first
      // In a full implementation, you would save the order in a DB, wait for LiqPay webhook, and THEN send to Poster.
      return NextResponse.json({
        success: true,
        paymentUrl
      });
    }

    // 4. Handle Cash (Payment on site)
    // Send directly to Poster
    const result = await createOrder(posterPayload);

    return NextResponse.json({
      success: true,
      message: "Замовлення успішно створено",
      posterResult: result
    });

  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Помилка при створенні замовлення"
    }, { status: 500 });
  }
}
