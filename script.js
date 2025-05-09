const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

const cart = JSON.parse(sessionStorage.getItem("cartProducts")) || [];

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="remove-from-cart-btn" data-id="${product.id}">Remove From Cart</button>`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cartProducts", JSON.stringify(cart));
    renderCart();
  }
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
    sessionStorage.setItem("cartProducts", JSON.stringify(cart));
    renderCart();
  }
}

function clearCart() {
  cart.length = 0;
  sessionStorage.removeItem("cartProducts");
  renderCart();
}

// Event delegation for Add/Remove buttons
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addToCart(Number(e.target.dataset.id));
  }

  if (e.target.classList.contains("remove-from-cart-btn")) {
    removeFromCart(Number(e.target.dataset.id));
  }
});

clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
