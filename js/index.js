// 1>global product
let globalProduct = [];
let cartList = [];

// 5> thêm sp vào cart
const addToCart = (e) => {
  const currentProductId = e.target.getAttribute("data-id");
  // tìm product theo id
  const res = globalProduct.find((item, i) => {
    return item.id === currentProductId;
  });
  for (let i in cartList) {
    if (res.id === cartList[i].product.id) {
      cartList[i].quantity += 1;
      setLocalCart();
      renderCart();
      countQuantity();
      return;
    }
  }
  const newCartItem = new CartItem(
    res.name,
    res.price,
    res.screen,
    res.backCamera,
    res.frontCamera,
    res.img,
    res.desc,
    res.type,
    res.id,
    1
  );
  cartList.push(newCartItem);
  setLocalCart();
  renderCart();
  countQuantity();
};

// 2>API fetch:
const fetchProduct = async () => {
  try {
    const res = await axios({
      url: "https://634e792f4af5fdff3a5d5a07.mockapi.io/CyperPhone",
      method: "GET",
    });
    globalProduct = res.data;
    renderProduct(globalProduct);
  } catch (error) {
    console.log(error);
  }
};

// 3> Render sp lên html
const renderProduct = (data) => {
  if (!data) data = globalProduct;
  for (let i in data) {
  }
  let html = "";
  for (let i in data) {
    html += `
        <div class="col">
            <div class="item">
                <div class="img">
                    <img src="${data[i].img}" alt="">
                </div>
                <div class="info">
                    <h1 class="productName">${data[i].name}</h1>
                    <p class="desc">${data[i].desc}</p>
                    <div class="productPrice"><span class="">${data[i].price}$</span></div>
                    <div class="detail">
                        <p class="screen">Màn hình: ${data[i].screen}</p>
                        <p class="frontCamera">Camera trước: ${data[i].frontCamera}</p>
                        <p class="backCamera">Camera sau: ${data[i].backCamera}</p>
                    </div>
                    <div class="action">
                      <button class="btn buyNow"  data-id="${data[i].id}"  onclick="buyNow(event)">Buy Now</button>                    
                      <button class="btn addToCart" 
                            id="buy-${data[i].id}" 
                            data-id="${data[i].id}" 
                            onclick="addToCart(event)">
                        Add Cart 
                      </button>
                    </div>
                    
                </div>
            </div>
        </div>`;
  }
  document.getElementById("productListHTML").innerHTML = html;
};

// 4> Filter search
const filterSearch = () => {
  const samsung = document.getElementById("samsung").checked;
  const iphone = document.getElementById("iphone").checked;

  let fileredProducts = [];

  if (!samsung && !iphone) return renderProduct();
  if (samsung) {
    for (let i in globalProduct) {
      if (globalProduct[i].type === "samsung") {
        fileredProducts.push(globalProduct[i]);
      }
    }
  }
  if (iphone) {
    for (let i in globalProduct) {
      if (globalProduct[i].type === "iphone") {
        fileredProducts.push(globalProduct[i]);
      }
    }
  }

  renderProduct(fileredProducts);
};

// 6> In cart ra html, mỗi sp là 1 <tr>

// const renderCart = (data) => {
//   if (!data) {
//     data = cartList;
//   }
//   console.log();
//   let html = "";
//   for (let i in cartList) {
//     html += `
//             <div class="item">
//                 <div class="img">
//                     <img src="${cartList[i].product.img}" alt="">
//                 </div>
//                 <div class="info">
//                     <h1 class="productName">${cartList[i].product.name}</h1>
//                     <div class="detail">
//                         <p class="desc">${cartList[i].product.desc}</p>
//                         <p class="screen">Màn hình: ${cartList[i].product.screen}</p>
//                         <p class="backCamera">Camera sau: ${cartList[i].product.backCamera}</p>
//                         <p class="frontCamera">Camera trước: ${cartList[i].product.frontCamera}</p>
//                     </div>
//                     <p class="productPrice">Giá: ${cartList[i].product.price}</p>
//                     <p class="quantity">
//                       Số lượng:
//                       <button
//                         class="btn deduct"
//                         data-productId="${cartList[i].product.id}"
//                         onclick="quantityDeduct(event)">
//                            -
//                       </button>
//                     ${cartList[i].quantity}
//                       <button
//                         class="btn raise"
//                         data-productId="${cartList[i].product.id}"
//                         onclick="quantityRaise(event)">
//                           +
//                       </button>
//                       <button
//                         class="btn delete"
//                         onclick="deleteCartItem(event)"
//                         data-productId="${cartList[i].product.id}">
//                           Xóa
//                       </button>
//                     </p>

//                 </div>
//             </div>
//     `;
//   }
//   document.getElementById("cartListHTML").innerHTML = html;
//   calcPrice();
// };
const renderCart = (data) => {
  if (!data) {
    data = cartList;
  }
  console.log();
  let html = "";
  for (let i in cartList) {
    html += `
            <div class="item">
                <div class="img">
                    <img src="${cartList[i].product.img}" alt="">
                </div>
                <div class="info">
                    <h1 class="productName">${
                      cartList[i].product.name
                    }</h1>                   
                </div>
                <p class="quantity">
                      <button 
                        class="btn deduct" 
                        data-productId="${cartList[i].product.id}"
                        onclick="quantityDeduct(event)">
                           <
                      </button> 
                    <span>${cartList[i].quantity}</span>
                      <button 
                        class="btn raise" 
                        data-productId="${cartList[i].product.id}"
                        onclick="quantityRaise(event)">
                          >
                      </button> 
                </p>
                <p class="productPrice"> ${
                  +cartList[i].product.price * +cartList[i].quantity
                }
                $</p>
                <button 
                        class="btn delete"
                        onclick="deleteCartItem(event)"
                        data-productId="${cartList[i].product.id}">
                        <i class="fa fa-trash-alt"></i>
                </button> 
                                                      
                    
                </div>
            </div>
    `;
  }
  document.getElementById("cartListHTML").innerHTML = html;
  calcPrice();
};
//Lưu giỏ hàng vào localStorage
const setLocalCart = () => {
  const cartJSON = JSON.stringify(cartList);
  localStorage.setItem("CART", cartJSON);
};

// const getLocalCart = () => {
//   const localCart = localStorage.getItem("CART");
//   cartList = JSON.parse(localCart);
//   if (!localCart) return;
//   renderCart();
// };
const getLocalCart = () => {
  const localCart = localStorage.getItem("CART");
  if (!localCart) return;
  const newCartList = JSON.parse(localCart);
  mapData(newCartList);
  renderCart();
};
const mapData = (data) => {
  for (let item of data) {
    const newCartItem = new CartItem(
      item.product.name,
      item.product.price,
      item.product.screen,
      item.product.backCamera,
      item.product.frontCamera,
      item.product.img,
      item.product.desc,
      item.product.type,
      item.product.id,
      item.quantity
    );
    cartList.push(newCartItem);
  }
};

// 9> Tăng giảm sl cart item

// Tăng sl sp trong cart
window.quantityRaise = (e) => {
  const currentProductId = e.target.getAttribute("data-productId");
  const res = findByID(currentProductId);
  res.quantity += 1;
  setLocalCart();
  renderCart();
  countQuantity();
};

// window.quantityRaise = (e) => {
//   const currentProductId = e.target.getAttribute("data-productId");
//   console.log(currentProductId);
//   const res = cartList.find((item, i) => {
//     return item.product.id === currentProductId;
//   });
//   res.quantity += 1;
//   setLocalCart();
//   renderCart();
// };

// Giảm sl sp trong cart
window.quantityDeduct = (e) => {
  const currentProductId = e.target.getAttribute("data-productId");
  const res = findByID(currentProductId);
  if (res.quantity === 1) {
    const resIndex = findIndexByID(currentProductId);
    if (!confirm("Xóa sản phẩm?")) return;
    cartList.splice(resIndex, 1);
    renderCart();
    setLocalCart();
    countQuantity();
    return;
  }
  res.quantity -= 1;
  renderCart();
  setLocalCart();
  countQuantity();
};

// Xóa sp khỏi cart
window.deleteCartItem = (e) => {
  const currentProductId = e.target.getAttribute("data-productId");
  const res = findIndexByID(currentProductId);
  if (!confirm("Xóa sản phẩm?")) return;
  cartList.splice(res, 1);
  renderCart();
  setLocalCart();
  countQuantity();
};

const findByID = (id) => {
  const res = cartList.find((item) => {
    return item.product.id === id;
  });
  return res;
};
const findIndexByID = (id) => {
  const res = cartList.findIndex((item) => {
    return item.product.id === id;
  });
  return res;
};

const calcPrice = () => {
  let totalPayment = 0;
  for (let item of cartList) {
    totalPayment += item.calcPrice();
  }
  document.getElementById("calcPrice").innerHTML = totalPayment;
};

const payment = () => {
  let totalPayment = document.getElementById("calcPrice").innerHTML;
  if (!confirm(`Xác nhận thanh toán ${totalPayment}?`)) return;
  cartList = [];
  setLocalCart();
  renderCart();
  countQuantity();
  document.getElementById("cartList").style.width = "0";
  alert("Thanh toán thành công");
};
let isShowned = false;
const showCart = () => {
  if (!isShowned) {
    document.getElementById("cartList").style.width = "100%";
    document.getElementById("cartList").style.opacity = "100%";
    isShowned = true;
    return;
  }
  document.getElementById("cartList").style.width = "0";
  document.getElementById("cartList").style.opacity = "0";
  isShowned = false;
};

const countQuantity = () => {
  let count = 0;
  for (let item of cartList) {
    count += item.quantity;
  }
  document.getElementById("cartQuantity").innerHTML = count;
};

const buyNow = (event) => {
  console.log(event);
  addToCart(event);
  document.getElementById("cartList").style.width = "100%";
  document.getElementById("cartList").style.opacity = "100%";
  flag = true;
};
const emptyCart = () => {
  if (!confirm(`Xóa tất cả sản phẩm trong giỏ hàng?`)) return;
  cartList = [];
  setLocalCart();
  renderCart();
  countQuantity();
};
window.onload = function () {
  fetchProduct();
  getLocalCart();
  countQuantity();
  document.getElementById("iphone").addEventListener("change", filterSearch);
  document.getElementById("samsung").addEventListener("change", filterSearch);
  document.getElementById("payment").addEventListener("click", payment);
  document.getElementById("emptyCart").addEventListener("click", emptyCart);
  document.getElementById("cart").addEventListener("click", showCart);
  document.getElementById("btn-closeCart").addEventListener("click", showCart);
};
