document.getElementById('checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Get the cart items
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // If there are no items in the cart, alert the user and stop the form from submitting
  if (cartItems.length === 0) {
    alert('\t \t \t \t \tYour cart is empty. \t \t \n \t \t \t Please add some items to your cart \n \t \t \t \t \tbefore checking out. \t \t');
    event.stopImmediatePropagation();
    return;
  }
  
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    const order = {
      id: new Date().getTime(),
      items: JSON.parse(localStorage.getItem('cart')) || [],
      total: 0,
    };

    // Calculate the total order value
    order.total = order.items.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + product.price * item.quantity;
    }, 0);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedInUser.email);
    users[userIndex].orderHistory = users[userIndex].orderHistory || [];
    users[userIndex].orderHistory.push(order);

    // Update the users array and loggedInUser in localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

    // Clear the cart after placing the order
    localStorage.removeItem('cart');

    window.dispatchEvent(new Event('updateOrderHistory'));
    window.location.href = 'account.html';
  } else {
    alert('Please log in to complete your purchase.');
    event.stopImmediatePropagation();
  }
});