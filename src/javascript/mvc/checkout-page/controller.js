import { CheckoutView } from "./view.js";
import GlobalState from "../global-state/model.js";

export class CheckoutController {
  constructor() {
    this.checkoutView = new CheckoutView();

    this.init();
  }

  init = () => {
    GlobalState.makeFinalCheckoutItems();

    GlobalState.registerListener((state) => {
      this.checkoutView.renderCheckout(state);
    });

    this.checkoutView.renderIncrementOrDecrementCartItem(
      GlobalState.incrementQuantityInFinalCheckoutItems,
      GlobalState.decrementQuantityInFinalCheckoutItems,
    );

    this.checkoutView.renderRemoveCartItem(GlobalState.removeFinalCheckoutItem);

    this.checkoutView.paymentButtonClick(GlobalState.goToPaymentButton);
  };
}
