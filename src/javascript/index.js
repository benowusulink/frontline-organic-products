console.log(window.location.pathname)

const startApp = () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    console.log("Index page");

    try {
      import("./mvc/index-page/controller.js")
        .then((res) => {
          new res.IndexController();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log("error importing indexcntroller", e);
    }
  } else if (window.location.pathname === "/products.html") {
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
  }
else if (window.location.pathname === "/checkout.html") {
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
