import { productsList } from "../../utilities/products-info.js";

class GlobalStateModel {
  constructor() {
    this.state = {
      productsList: productsList,
      checkoutPageItems: [],
      finalCheckoutItems: [],
      totalPrice: 0,
    };
    this.listeners = [];
  }

  setState = (newState) => {
    return (this.state = { ...this.state, ...newState });
  };

  registerListener = (listener) => {
    this.listeners.push(listener);
    listener(this.state);
  };

  notifyListener = () => {
    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  };

  getState = (stateName) => {
    if (this.state[stateName]) {
      return this.state[stateName];
    } else {
      console.log("no state exists");
    }
  };

  // product page

  addToCheckOutItems = (productName) => {
    const doesProductExist = this.getState("productsList").some((product) => {
      return product.productName === productName;
    });

    if (doesProductExist) {
      const checkIfItemExistsInCheckoutPageItems = this.getState(
        "checkoutPageItems",
      ).some((product) => {
        return product.productName === productName;
      });

      if (!checkIfItemExistsInCheckoutPageItems) {
        const productToAdd = this.getState("productsList").find((product) => {
          return product.productName === productName;
        });

        this.setState({
          checkoutPageItems: [
            ...this.getState("checkoutPageItems"),
            productToAdd,
          ],
        });

        this.storeCheckoutPageItemsInSession();

        this.notifyListener();

        console.log(this.getState("checkoutPageItems"));
      } else {
        console.log("product already added to CheckoutPageItems");
        return;
      }
    } else {
      console.log("product doesnt exist");
      return;
    }
  };

  storeCheckoutPageItemsInSession = () => {
    window.sessionStorage.removeItem("checkoutList");

    const storage = window.sessionStorage.setItem(
      "checkoutList",
      JSON.stringify(this.getState("checkoutPageItems")),
    );
  };

  // checkout page

  getFinalCheckoutItems = () => {
    return this.getState("finalCheckoutItems");
  };

  retireveCheckoutPageItemsfromSession = () => {
    const checkoutListSession = JSON.parse(
      window.sessionStorage.getItem("checkoutList"),
    );

    if (checkoutListSession) {
      this.setState({ checkoutPageItems: checkoutListSession });

      return this.getState("checkoutPageItems");
    } else {
      this.setState({ checkoutPageItems: [] });

      return this.getState("checkoutPageItems");
    }
  };

  makeFinalCheckoutItems = () => {
    this.retireveCheckoutPageItemsfromSession();

    this.setState({
      finalCheckoutItems: this.retireveCheckoutPageItemsfromSession(),
    });

    if (this.getFinalCheckoutItems().length > 1) {
      this.getFinalCheckoutItems().forEach((product) => {
        if (!product.quantity) {
          product.quantity = 1;
        }
      });

      this.notifyListener();

      this.calculateProductPrice();
    } else {
      this.notifyListener();
    }
  };

  calculateProductPrice = () => {
    if (this.getFinalCheckoutItems().length >= 1) {
      const updatedPrice = this.getFinalCheckoutItems().map((product) => {
        product.productXquantity = product.productPrice * product.quantity;
        return product;
      });

      this.setState({
        finalCheckoutItems: updatedPrice,
      });

      this.notifyListener();

      this.getTotalPrice();

      return this.getFinalCheckoutItems();
    }
  };

  getTotalPrice = () => {
    if (this.getFinalCheckoutItems().length >= 1) {
      const totalPrice = this.getFinalCheckoutItems().reduce(
        (accumalator, product) => {
          return accumalator + product.productXquantity;
        },
        0,
      );

      console.log(totalPrice);

      this.setState({
        totalPrice: totalPrice,
      });

      this.notifyListener();

      console.log(this.getState("totalPrice"));
      console.log(this.getFinalCheckoutItems());

      return this.getState("totalPrice");
    }
  };

  incrementQuantityInFinalCheckoutItems = (productName) => {
    const filteredProduct = this.getFinalCheckoutItems().find((product) => {
      if (product.productName === productName) {
        return product;
      }
    });

    const newState = this.getFinalCheckoutItems().map((product) => {
      if (product.productName === filteredProduct.productName) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    this.setState({
      finalCheckoutItems: newState,
    });

    window.sessionStorage.removeItem("checkoutList");

    const storage = window.sessionStorage.setItem(
      "checkoutList",
      JSON.stringify(newState),
    );

    this.notifyListener();
    this.calculateProductPrice();
  };

  decrementQuantityInFinalCheckoutItems = (productName) => {
    const filteredProduct = this.getFinalCheckoutItems().find((product) => {
      if (product.productName === productName) {
        product.quantity = product.quantity - 1;
        return product;
      }
    });

    if (filteredProduct.quantity < 1) {
      const newArray = this.getFinalCheckoutItems().filter((product) => {
        return product.productName !== productName;
      });

      if (newArray.length < 1) {
        this.setState({
          finalCheckoutItems: [],
        });
        window.sessionStorage.removeItem("checkoutList");
        this.notifyListener();
      } else {
        this.setState({
          finalCheckoutItems: newArray,
        });

        window.sessionStorage.removeItem("checkoutList");

        const storage = window.sessionStorage.setItem(
          "checkoutList",
          JSON.stringify(newArray),
        );
        this.notifyListener();
        this.calculateProductPrice();
      }
    } else {
      const newArray = this.getFinalCheckoutItems().map((item) => {
        if (item.productName === productName) {
          return { ...item, ...filteredProduct };
        } else {
          return item;
        }
      });

      this.setState({
        finalCheckoutItems: newArray,
      });

      window.sessionStorage.removeItem("checkoutList");

      const storage = window.sessionStorage.setItem(
        "checkoutList",
        JSON.stringify(newArray),
      );

      this.notifyListener();
      this.calculateProductPrice();
    }
  };

  removeFinalCheckoutItem = (productName) => {
    const newArray = this.getFinalCheckoutItems().filter((product) => {
      return product.productName !== productName;
    });

    this.setState({ finalCheckoutItems: newArray });

    window.sessionStorage.removeItem("checkoutList");

    const storage = window.sessionStorage.setItem(
      "checkoutList",
      JSON.stringify(newArray),
    );

    this.notifyListener();
    this.calculateProductPrice();
  };

  goToPaymentButton = () => {
    const totalPrice = this.getState("totalPrice");
    const products = this.getFinalCheckoutItems();

    return {
      totalPrice,
      products,
    };
  };
}

const GlobalState = new GlobalStateModel();

export default GlobalState;
