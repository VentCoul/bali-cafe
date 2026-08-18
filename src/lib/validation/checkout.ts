export function validateCheckoutPayload(data: { items?: any[], customer?: { name?: string } }): { isValid: boolean; error?: string } {
  if (!data.items || data.items.length === 0) {
    return { isValid: false, error: 'Кошик порожній' };
  }

  if (!data.customer || !data.customer.name || data.customer.name.trim() === '') {
    return { isValid: false, error: "Ім'я клієнта обов'язкове" };
  }

  for (const item of data.items) {
    if (item.quantity <= 0) {
      return { isValid: false, error: "Кількість товару має бути більше нуля" };
    }
  }

  return { isValid: true };
}
