// importing index-pages Model and View
import { IndexModel } from "./model.js";
import { IndexView } from "./view.js";

// creating and exporting Controller class for MVC on index-page
export class IndexController {
  constructor() {
    // initiating index-pages model and view
    this.model = new IndexModel();
    this.view = new IndexView();

    // invoking renderInitialImage function when controller class is invoked
    this.renderInitialImage();

    // invoking updateImage function when controller class is invoked
    this.updateImage();
  }

  /* function that renders view renderAboutUsImage with data from model
getInitialImage */
  renderInitialImage = () => {
    this.view.renderAboutUsImage(this.model.getInitialImage());
  };

  /* function that registers view updateAboutUsImage to state changes from 
the model with data from model, also invokes models updateImage to start 
updating the image */
  updateImage = () => {
    this.model.registerListener((state) => {
      this.view.updateAboutUsImage(state);
    });
    this.model.updateImage();
  };
}
