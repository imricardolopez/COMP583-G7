const products = [
    { id: 1, name: 'Solitare Chess', description: 'Solve puzzles on a chess board. Your main goal is to capture the pieces till one piece is left standing. Over 100+ puzzles to solve and a randomly generated daily puzzle for endless brain teasers', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653592076369930/game_images_8.png ' },
    { id: 2, name: 'Sokoban', description: 'A fun block pushing puzzle game to move them into their place. Move your character around to move every box to it’s marked location. Be carful not to get yourself stuck', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653590386065471/game_images_1.png' },
    { id: 3, name: 'Sandbox', description: 'A 2d world to mind and build what you desire. Fight monsters off as you build up your base and explore what the heavens and earth of the world give you', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653590616756264/game_images_2.png' },
    { id: 4, name: 'Melody March', description: 'March to the beat of the song in Melodey march. Keep in time to the song and complete each track in harmony. You do your best to stomp out the sour notes invading the music and bring back the melodies of the world’s song', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653590868402186/game_images_3.png' },
    { id: 5, name: 'Puzzler', description: 'A simple picture puzzle for hours of fun. Pieces ranges from 20, 100, 500 and 1000', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591086518323/game_images_4.png' },
    { id: 6, name: 'Rougelike', description: 'The endless dungeon ever changing, you never know what is up next. Grab what the rooms offer and slay the monsters that impede your decent into the lower levels. Untold treasure lay at the bottom of the dungeon protected by the fierces boss', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591342358579/game_images_5.png' },
    { id: 7, name: 'Run and Jump', description: 'TSimple platformer and collect as many coins as fast as you can through each level. It promises great challenge to those who want to master it’s movement and a relaxing time for any casual player', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591539499034/game_images_6.png' },
    { id: 8, name: 'Endless Decks', description: 'Play cards to stay alive. Everything has a cost and your party will protect you from the incoming danger', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591828910122/game_images_7.png' },
    { id: 9, name: 'Farm Sim', description: 'Build up a cozy farm of your dreams inherited from your family. Prove your worth as a farmer and restore your farm to it’s once wonderful beauty after a harsh storm tore everything down', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653592399335567/game_images_9.png' },
];

const cart = [];

function displayProducts() {
    const container = document.getElementById('products');
    const maxProducts = document.location.pathname.includes('index') ? 3 : products.length;
    for (const product of products.slice(0, maxProducts)) {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3><a href="product-${product.id}.html">${product.name}</a></h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    }
}

function initializeCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    displayCart();
}

function addToCart(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const quantity = parseInt(quantityInput.value, 10);

  const productIndex = cart.findIndex(p => p.id === productId);
  if (productIndex > -1) {
    cart[productIndex].quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));

  // Display success message
  const productName = products.find(p => p.id === productId).name;
  alert(`Successfully added ${quantity} copies of ${productName} to your cart!`);

  // Redirect to the shopping cart page
  window.location.href = 'cart.html';
}

function updateQuantity(productId, delta) {
    const product = products.find(p => p.id === productId);
    const existingCartItem = cart.find(item => item.product.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity += delta;

        if (existingCartItem.quantity <= 0) {
            cart.splice(cart.indexOf(existingCartItem), 1);
            alert(`${product.name} has been removed from your cart.`);
        } else {
            alert(`The quantity of ${product.name} has been updated to ${existingCartItem.quantity}.`);
        }
    } else if (delta > 0) {
        cart.push({ product, quantity: delta });
        alert(`${product.name} has been added to your cart.`);
    } else {
        alert(`${product.name} is not in your cart.`);
    }
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  for (const item of cart) {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>Quantity: ${item.quantity}</p>
      `;
      cartContainer.appendChild(div);
    }
  }

  // Add a "Checkout" button
  const checkoutButton = document.createElement('button');
  checkoutButton.classList.add('checkout-button');
  checkoutButton.innerHTML = 'Checkout';
  checkoutButton.onclick = () => {
    window.location.href = 'checkout.html';
  };
  cartContainer.appendChild(checkoutButton);
}

function displayProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const container = document.querySelector('main');
        const div = document.createElement('div');
        div.classList.add('product-page');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image-large">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p> <!-- Display the description here -->
                <p>Price: $${product.price}</p>
                <div class="quantity-wrapper">
                    <label for="quantity-${product.id}">Quantity:</label>
                    <input type="number" id="quantity-${product.id}" name="quantity" min="1" value="1" class="quantity-input">
                </div>
                <button class="add-to-cart-button" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(div);
    } else {
        alert('Product not found');
    }
}

function displayCheckoutCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutCartContainer = document.getElementById('checkout-cart-container');

  if (cart.length === 0) {
    checkoutCartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  for (const item of cart) {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const div = document.createElement('div');
      div.classList.add('checkout-cart-item');
      div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>Quantity: ${item.quantity}</p>
      `;
      checkoutCartContainer.appendChild(div);
    }
  }
}

function displayCheckoutForm() {
  const userInfoContainer = document.getElementById('user-info-container');

  userInfoContainer.innerHTML = `
    <h2>User Information</h2>
    <form id="checkout-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <h2>Payment Method</h2>
        <label for="payment-method">Choose a payment method:</label>
        <select id="payment-method" name="payment-method" required>
            <option value="cash">Cash</option>
        </select>
        <br>
        <button type="submit">Submit</button>
    </form>
  `;
}


document.addEventListener('DOMContentLoaded', initializeCart);

displayProducts();