import GlobalState from "../global-state/model.js";
import { images } from "../../utilities/images.js";

export class ProductModel {
  constructor() {
    this.state = {
      products: GlobalState.getState("productsList"),
      // productImages: images
    };
  }

  renderInitialProductList = () => {
    return this.state.products;
  };

  addToGlobalStateCheckoutPageItems = (productName) => {
    return GlobalState.addToCheckOutItems(productName);
  };
}
