import { validateCheckoutPayload } from '../src/lib/validation/checkout';

describe('validateCheckoutPayload', () => {
  it('rejects payload without items', () => {
    const payload = {
      customer: { name: 'Test', phone: '+380991234567' },
      items: [],
      orderType: 'takeaway',
      paymentType: 'cash'
    };
    const result = validateCheckoutPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Кошик порожній');
  });

  it('rejects payload without customer name', () => {
    const payload = {
      customer: { name: '', phone: '+380991234567' },
      items: [{ product: { product_id: '1', price: 100 }, quantity: 1 }],
      orderType: 'takeaway',
      paymentType: 'cash'
    };
    const result = validateCheckoutPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Ім'я клієнта обов'язкове");
  });

  it('rejects items with zero or negative quantity', () => {
    const payload = {
      customer: { name: 'Test', phone: '+380991234567' },
      items: [{ product: { product_id: '1', price: 100 }, quantity: 0 }],
      orderType: 'takeaway',
      paymentType: 'cash'
    };
    const result = validateCheckoutPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Кількість товару має бути більше нуля");
  });

  it('accepts valid payload', () => {
    const payload = {
      customer: { name: 'Test', phone: '+380991234567' },
      items: [{ product: { product_id: '1', price: 100 }, quantity: 1 }],
      orderType: 'takeaway',
      paymentType: 'cash'
    };
    const result = validateCheckoutPayload(payload);
    expect(result.isValid).toBe(true);
  });
});
