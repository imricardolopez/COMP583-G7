const user_nameElement = document.getElementById("name")
const emailElement = document.getElementById("email")
const passwordElement = document.getElementById("password")
const password_confirmElement = document.getElementById("password-confirm")
const signupButtonElement = document.getElementById("submit")
const loginButtonElement = document.getElementById("login-btn")


let user_name = ""
let email = ""
let password = ""
let password_confirm = ""

user_nameElement?.addEventListener("change",(e) => {
  user_name = e.target.value
})

emailElement?.addEventListener("change",(e) => {
  email = e.target.value
})

passwordElement?.addEventListener("change",(e) => {
  password = e.target.value
})

password_confirmElement?.addEventListener("change",(e) => {
  password_confirm = e.target.value
})

signupButtonElement?.addEventListener("click", () => {
  console.log("signupClicked")
  const user = {"user_name":user_name,"email":email,"password":password}
  const userStr = JSON.stringify(user)
  localStorage.setItem("user", userStr)
  fetch("http://localhost:3000/signup", {
    method:"POST", 
    body:userStr,
    headers:{
      "Content-Type":"application/json"
    }
  })
  // window.location.href = "products.html"
})

loginButtonElement?.addEventListener("click", ()=>{
  const user = {"email":email,"password":password}
  const userStr = JSON.stringify(user)
  fetch("http://localhost:3000/login", {
    method:"POST", 
    body:userStr,
    headers:{
      "Content-Type":"application/json"
    }
  })
})

const products = [
  { id: 1, name: 'Solitare Chess', description: 'Solve puzzles on a chess board. Your main goal is to capture the pieces till one piece is left standing. Over 100+ puzzles to solve and a randomly generated daily puzzle for endless brain teasers', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653592076369930/game_images_8.png' , downloadLink: 'https://example.com/download1' },
  { id: 2, name: 'Sokoban', description: 'A fun block pushing puzzle game to move them into their place. Move your character around to move every box to it’s marked location. Be carful not to get yourself stuck', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653590386065471/game_images_1.png', downloadLink: 'https://example.com/download2' },
  { id: 3, name: 'Sandbox', description: 'A 2d world to mind and build what you desire. Fight monsters off as you build up your base and explore what the heavens and earth of the world give you', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653590616756264/game_images_2.png' , downloadLink: 'https://example.com/download3' },
  { id: 4, name: 'Melody March', description: 'March to the beat of the song in Melodey march. Keep in time to the song and complete each track in harmony. You do your best to stomp out the sour notes invading the music and bring back the melodies of the world’s song', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653590868402186/game_images_3.png' , downloadLink: 'https://example.com/download4' },
  { id: 5, name: 'Puzzler', description: 'A simple picture puzzle for hours of fun. Pieces ranges from 20, 100, 500 and 1000', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591086518323/game_images_4.png' , downloadLink: 'https://example.com/download5' },
  { id: 6, name: 'Rougelike', description: 'The endless dungeon ever changing, you never know what is up next. Grab what the rooms offer and slay the monsters that impede your decent into the lower levels. Untold treasure lay at the bottom of the dungeon protected by the fierces boss', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591342358579/game_images_5.png' , downloadLink: 'https://example.com/download6' },
  { id: 7, name: 'Run and Jump', description: 'TSimple platformer and collect as many coins as fast as you can through each level. It promises great challenge to those who want to master it’s movement and a relaxing time for any casual player', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591539499034/game_images_6.png' , downloadLink: 'https://example.com/download7' },
  { id: 8, name: 'Endless Decks', description: 'Play cards to stay alive. Everything has a cost and your party will protect you from the incoming danger', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653591828910122/game_images_7.png' , downloadLink: 'https://example.com/download8' },
  { id: 9, name: 'Farm Sim', description: 'Build up a cozy farm of your dreams inherited from your family. Prove your worth as a farmer and restore your farm to it’s once wonderful beauty after a harsh storm tore everything down', price: 9.99, image: 'https://cdn.discordapp.com/attachments/212617231165554690/1092653592399335567/game_images_9.png' , downloadLink: 'https://example.com/download9' },
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
          <input type="number" id="quantity-${product.id}" value="1" min="1" max="99" class="quantity-input">
          <br>
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

// Fetch the cart from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const productIndex = cart.findIndex(p => p.id === productId);
if (productIndex > -1) {
  cart[productIndex].quantity += quantity;
} else {
  cart.push({ id: productId, quantity: quantity });
}

localStorage.setItem('cart', JSON.stringify(cart));

// Display success message
const productName = products.find(p => p.id === productId).name;
const goToCart = confirm(`Successfully added ${quantity} copies of ${productName} to your cart!\n\nWould you like to view your cart? Click 'OK' to view your cart or 'Cancel' to continue shopping.`);

// Redirect to the shopping cart page if user clicked 'OK'
if (goToCart) {
  window.location.href = 'cart.html';
}
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

function displayCartWithEditOptions() {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-container');

// Clear the cart container before re-rendering the cart items
cartContainer.innerHTML = '';

if (cart.length === 0) {
  cartContainer.innerHTML = '<p style="text-align:center">Your cart is empty.</p>';
  return;
}

for (const item of cart) {
  const product = products.find(p => p.id === item.id);
  if (product) {
    const div = document.createElement('div');
    div.classList.add('cart-item', 'cart-item-shopping');
    div.innerHTML = `
    <div class="cart-item-wrapper">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="cart-item-info">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>Quantity: <span id="quantity-${product.id}">${item.quantity}</span></p>
      </div>
      <div class="cart-item-buttons">
          <button onclick="decrementQuantity(${product.id})">-</button>
          <button onclick="incrementQuantity(${product.id})">+</button>
          <button onclick="removeFromCart(${product.id})">Remove</button>
      </div>
  </div>
`;
    cartContainer.appendChild(div);
  }
}
}

function incrementQuantity(productId) {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const item = cart.find(i => i.id === productId);

if (item) {
  item.quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById(`quantity-${productId}`).textContent = item.quantity;
}
}

function decrementQuantity(productId) {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const item = cart.find(i => i.id === productId);

if (item && item.quantity > 1) {
  item.quantity -= 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById(`quantity-${productId}`).textContent = item.quantity;
}
}

function removeFromCart(productId) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cart = cart.filter(i => i.id !== productId);
localStorage.setItem('cart', JSON.stringify(cart));
displayCartWithEditOptions();
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
      <label for="card-number">Card Number:</label>
      <input type="text" id="card-number" name="card-number" required>
      <br>
      <label for="card-exp-month">Expiry Month:</label>
      <input type="text" id="card-exp-month" name="card-exp-month" required>
      <br>
      <label for="card-exp-year">Expiry Year:</label>
      <input type="text" id="card-exp-year" name="card-exp-year" required>
      <br>
      <label for="card-cvv">CVV:</label>
      <input type="text" id="card-cvv" name="card-cvv" required>
      <br>
      <button type="submit">Submit</button>
  </form>
`;
}

function displayCheckoutCart() {
  const cartItemsContainer = document.getElementById('checkout-cart-container');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
  }

  for (const item of cart) {
      const product = products.find(p => p.id === item.id);
      if (product) {
          const div = document.createElement('div');
          div.classList.add('cart-item');
          div.innerHTML = `
              <img src="${product.image}" alt="${product.name}" class="cart-item-image">
              <div class="cart-item-info">
                  <h4>${product.name}</h4>
                  <p>Price: $${product.price}</p>
                  <p>Quantity: ${item.quantity}</p>
              </div>
          `;
          cartItemsContainer.appendChild(div);
      }
  }
}

if (document.getElementById('checkout-cart-container')) {
  document.addEventListener('DOMContentLoaded', displayCheckoutCart);
}

displayProducts();