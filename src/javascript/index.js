const startApp = () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/frontline-organic-products/" ||
    window.location.pathname === "/frontline-organic-products/index.html"
  ) {
    console.log("Index page");

    try {
      import("./mvc/index-page/controller.js")
        .then((res) => {
          alert(`inner width:${window.innerWidth},width:${window.screen.width}`)
          new res.IndexController();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log("error importing indexcntroller", e);
    }
  } else if (
    window.location.pathname === "/frontline-organic-products/products.html" ||
    window.location.pathname === "/products.html"
  ) {
    console.log("Product page");

    try {
      import("./mvc/products-page/controller.js")
        .then((res) => {
          new res.ProductsController();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log("error importing indexcntroller", e);
    }
  } else if (
    window.location.pathname === "/frontline-organic-products/checkout.html" ||
    window.location.pathname === "/products.html"
  ) {
    console.log("Checkout page");

    try {
      import("./mvc/checkout-page/controller.js")
        .then((res) => {
          new res.CheckoutController();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log("error importing indexcntroller", e);
    }
  }
};

startApp();
