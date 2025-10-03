// 代码生成时间: 2025-10-03 20:02:46
class ShoppingCart {
  constructor() {
    this.items = []; // Holds the items in the cart
  }

  /**
   * Adds an item to the cart.
   * @param {object} item - The item to be added to the cart
   */
  addItem(item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item');
    }
    this.items.push(item);
  }

  /**
   * Removes an item from the cart by its unique identifier.
   * @param {number} id - The unique identifier of the item to remove
   */
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * @param {number} itemId - The unique identifier of the item to update
   * @param {number} quantity - The new quantity of the item
   */
  updateQuantity(itemId, quantity) {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    this.items[itemIndex].quantity = quantity;
  }

  /**
   * Gets the total number of items in the cart.
   * @returns {number} - The total number of items
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Gets the total price of all items in the cart.
   * @returns {number} - The total price
   */
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /**
   * Clears all items from the cart.
   */
  clearCart() {
    this.items = [];
  }
}

// Usage example
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Apple', price: 0.50, quantity: 2 });
cart.addItem({ id: 2, name: 'Banana', price: 0.30, quantity: 5 });
console.log(cart.getTotalPrice()); // Should output the total price of items in the cart
cart.removeItem(1);
console.log(cart.getItemCount()); // Should output 1 after removing an item
