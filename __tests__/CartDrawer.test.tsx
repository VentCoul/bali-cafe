import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CartDrawer from '../src/components/cart/CartDrawer';
import { useCartStore } from '../src/lib/store/cartStore';

// Mock the Zustand store
jest.mock('../src/lib/store/cartStore');

describe('CartDrawer', () => {
  it('renders empty state when cart is empty', async () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      getTotalPrice: () => 0,
      clearCart: jest.fn()
    });

    render(<CartDrawer isOpen={true} onClose={jest.fn()} />);
    
    expect(await screen.findByText('Ваш кошик порожній')).toBeInTheDocument();
  });

  it('renders cart items and total price', async () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [
        {
          product: { product_id: '1', product_name: 'Кава', price: 50, weight_flag: '0' },
          quantity: 2
        }
      ],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      getTotalPrice: () => 100,
      clearCart: jest.fn()
    });

    render(<CartDrawer isOpen={true} onClose={jest.fn()} />);
    
    expect(await screen.findByText('Кава')).toBeInTheDocument();
    expect((await screen.findAllByText('100 ₴'))[0]).toBeInTheDocument();
  });
});
