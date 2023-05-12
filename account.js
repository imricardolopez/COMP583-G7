document.addEventListener('DOMContentLoaded', () => {
  const accountInfo = document.querySelector('.account-info');
  const orderHistory = document.querySelector('.order-history');
  const user = getUserFromLocalStorage();

  if (!user) {
      window.location.href = 'login.html';
  } else {
      displayAccountInfo(user);
      displayOrderHistory(user);
  }

  function getUserFromLocalStorage() {
      const userString = localStorage.getItem('loggedInUser');
      if (userString) {
          return JSON.parse(userString);
      }
      return null;
  }

  function displayAccountInfo(user) {
      const accountInfoHTML = `
          <h2>Account Information</h2>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
      `;
      accountInfo.innerHTML = accountInfoHTML;
  }

  function displayOrderHistory(user) {
      const orders = user.orderHistory || [];
      let orderHistoryHTML = '<h2>Order History</h2>';

      if (orders.length === 0) {
          orderHistoryHTML += '<p>You have no previous orders.</p>';
      } else {
          orders.forEach((order, index) => {
              orderHistoryHTML += `
                  <div class="order">
                      <h3>Order ${index + 1}</h3>
                      <p>Order ID: ${order.id}</p>
                      <p>Total: ${order.total}</p>
                      <ul>
              `;

              order.items.forEach(item => {
                  const product = products.find(p => p.id === item.id);
                  orderHistoryHTML += `<li class="no-bullets">${product.name} (Quantity: ${item.quantity})</li>`;
                  for(let i = 0; i < item.quantity; i++) {
                      const uniqueLink = `${product.downloadLink}?timestamp=${new Date().getTime()}&copy=${i+1}`;
                      orderHistoryHTML += `<li class="no-bullets"><a href="${uniqueLink}" target="_blank">Download Link ${i+1}</a></li>`;
                  }
              });

              orderHistoryHTML += `
                      </ul>
                  </div>
              `;
          });
      }

      orderHistory.innerHTML = orderHistoryHTML;
  }
});