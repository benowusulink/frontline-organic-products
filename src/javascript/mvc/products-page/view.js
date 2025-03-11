export class ProductView {
  constructor() {
    this.productPageSection = document.getElementById("product-page-section");
    this.checkoutTab = document.getElementById("product-page-checkout-tab");
  }

  renderInitialProductList = (productsArray) => {
    productsArray.forEach((product) => {
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const h3 = document.createElement("h3");
      const h4 = document.createElement("h4");
      const button = document.createElement("button");

      this.productPageSection.appendChild(div1);
      div1.appendChild(img);
      div1.appendChild(div2);
      div1.appendChild(div3);
      div2.appendChild(h2);
      div2.appendChild(h3);
      div3.appendChild(h4);
      div3.appendChild(button);

      div1.classList.add("product-page-section-div2");
      div1.id = product.productName;
      div1.name = product.productName;

      div2.classList.add("product-page-section-div3");

      img.classList.add("product-page-section-div3-img");
      img.src = product.productImage;

      h2.classList.add("product-page-section-div3-h2");
      h2.textContent = product.productName;

      h3.classList.add("product-page-section-div3-h3");
      h3.textContent = product.productInfo;

      div3.classList.add("product-page-section-div4");

      h4.classList.add("product-page-section-div4-h4");
      h4.textContent = `Price: £${product.productPrice}`;

      button.classList.add("product-page-section-div4-button");
      button.id = product.productID;
      button.name = product.productName;
      button.textContent = "Add to cart";
    });
  };

  addProductToGlobalStateCheckoutPageItems = (globalAddProductFunction) => {
    const buttons = Array.from(
      document.getElementsByClassName("product-page-section-div4-button"),
    );

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("click");
        globalAddProductFunction(e.target.name);
      });
    });
  };

  updateCheckoutTabItemAmount = (state) => {
    if (state.checkoutPageItems.length >= 1) {
      this.checkoutTab.textContent = `Cart: ${state.checkoutPageItems.length}`;
    }
  };
}
