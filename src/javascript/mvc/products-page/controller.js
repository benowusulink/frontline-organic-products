import { ProductModel } from "./model.js";
import { ProductView } from "./view.js";
import GlobalState from "../global-state/model.js";

export class ProductsController {
  constructor() {
    this.productModel = new ProductModel();
    this.productView = new ProductView();

    this.productView.renderInitialProductList(
      this.productModel.renderInitialProductList(),
    );

    GlobalState.registerListener((state) => {
      this.productView.updateCheckoutTabItemAmount(state);
    });

    this.productView.addProductToGlobalStateCheckoutPageItems(
      this.productModel.addToGlobalStateCheckoutPageItems,
    );
  }
}
