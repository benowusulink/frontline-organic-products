// importing images used for the index-page/about-us section
import image1 from "../../../assets/images/aboutus1.png";
import image2 from "../../../assets/images/aboutus2.png";

// creating and exporting Model class for MVC on index-page
export class IndexModel {
  constructor() {
    // state for index page
    this.state = {
      imageIndex: 0,
      images: [image1, image2],
    };
    // array of view functions that need state to update and render
    this.listeners = [];
  }

  // create new state function for model
  setState = (newState) => {
    return (this.state = { ...this.state, ...newState });
  };

  // function to add view functions that need state to this.listeners array
  registerListener = (listener) => {
    this.listeners.push(listener);
    listener(this.state);
  };

  // function to notify view functions that need state that the state has been updated
  notifyListeners = () => {
    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  };

  // function to get initial image for the index-page/about-us image section
  getInitialImage = () => {
    return this.state.images[this.state.imageIndex];
  };

  /* function to update image for the index-page/about-us image section every 
10 secs and then update the state */
  updateImage = () => {
    setInterval(() => {
      this.setState({
        imageIndex: (this.state.imageIndex + 1) % this.state.images.length,
      });
      this.notifyListeners();
    }, 10000);
  };
}
