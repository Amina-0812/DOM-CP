const product = [
    {
      id: 0,
      image: 'imgs/X.jpeg',
      title: 'iPhone X',
      price: 120,
    },
    {
      id: 1,
      image: 'imgs/12.jpeg',
      title: 'iPhone 12',
      price: 180,
    },
    {
      id: 2,
      image: 'imgs/13.jpeg',
      title: 'iPhone 13',
      price: 230,
    },
    {
      id: 3,
      image: 'imgs/11.jpeg',
      title: 'iPhone 11',
      price: 150,
    }
  ];
  
  const categories = [];
product.forEach((item) => {
  const exists = categories.some((cat) => cat.title === item.title);
  if (!exists) {  /*This ensures that only unique items (based on their title) are added to the categories array, preventing duplicates.*/
    categories.push(item);    /*If exists is false (meaning there's no item in categories with the same title)*/
  }
});

let i = 0;

document.getElementById('root').innerHTML = '';
categories.forEach((item) => {
  const { image, title, price } = item;
  const html = `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image}></img>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>
                    <button onclick='addtocart(${i++})'>Add to cart</button>

                </div>
            </div>`;
  document.getElementById('root').innerHTML += html;
});

const cart = [];

function addtocart(a) {
  cart.push({ ...categories[a], quantity: 1 }); 
  displaycart();
}



function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function updateQuantity(a, operation) {
  cart[a].quantity += operation;
  if (cart[a].quantity < 1) {
    cart[a].quantity = 1; // I used it so the quantity won't go below 1
  }
  displaycart();
}


function toggleHeartColor(index) {
  const heartIcon = document.querySelectorAll('.heart')[index];
  heartIcon.classList.toggle('liked'); 
}

function displaycart() {
  let j = 0;
  let total = 0;
  document.getElementById('count').innerHTML = cart.length;
  const cartItemElement = document.getElementById('cartItem');
  const totalElement = document.getElementById('total');
  
  if (cart.length === 0) {
    cartItemElement.innerHTML = 'Your cart is empty';
    totalElement.innerHTML = '$ 0.00';
 } else {
    cartItemElement.innerHTML = '';
    cart.forEach((items, index) => {
      const { image, title, price, quantity } = items;
      total += price * quantity;
      totalElement.innerHTML = `$ ${total}.00`;
      const cartItemHtml = `<div class='cart-item'>
                                <div class='row-img'>
                                    <img class='rowimg' src=${image}>
                                </div>
                                <p style='font-size:12px;'>${title}</p>
                                <h2 style='font-size: 15px;'>$ ${price}.00</h2>
                                <div class='quantity'>
                                    <button onclick='updateQuantity(${j},${-1})'>-</button>
                                    <span>${quantity}</span>
                                    <button onclick='updateQuantity(${j},${1})'>+</button>
                                </div>
                                <span class='heart' onclick='toggleHeartColor(${j})'>&hearts;</span>
                                <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
                            </div>`;
      cartItemElement.innerHTML += cartItemHtml;
    });
  }
}

