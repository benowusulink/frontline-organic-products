// creating and exporting View class for MVC on index-page
export class IndexView {
  constructor() {
    // caching index-page/about-us image element used for image
    this.aboutUsImage = document.getElementById(
      "landing-page-aboutUs-section-div-img",
    );
  }

  /* creating view function to render initial image 
based on the models  getInitialImage function */
  renderAboutUsImage = (imageSrc) => {
    this.aboutUsImage.src = imageSrc;
  };

  /* creating view function to update initial image based on the models 
updateImage function, renders image based on state of images in state, 
adds css fadein/fadeout effect on images update */
  updateAboutUsImage = (state) => {
    setTimeout(() => {
      this.aboutUsImage.classList.remove("fade-in");
      this.aboutUsImage.classList.add("fade-out");
    }, 10000);

    setTimeout(() => {
      this.aboutUsImage.src = state.images[state.imageIndex];
      this.aboutUsImage.classList.remove("fade-out");
      this.aboutUsImage.classList.add("fade-in");
    }, 1500);
  };
}
