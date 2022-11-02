// import { Product } from "./product.js";

class CartItem {
  constructor(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    id,
    quantity
  ) {
    this.quantity = quantity;
    this.product = {
      name: name,
      price: price,
      screen: screen,
      backCamera: backCamera,
      frontCamera: frontCamera,
      img: img,
      desc: desc,
      type: type,
      id: id,
    };
  }
  calcPrice() {
    return this.quantity * +this.product.price;
  }
}
