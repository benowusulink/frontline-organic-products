console.log("js working");

import image1 from "../assets/images/header1.jpg";
import image2 from "../assets/images/header2.jpg";

const images = [image1, image2];

let currentIndex = 0; // Track the current image index
const imgElement = document.getElementById("landing-page-section-div-img");

// Function to change the image
function changeImage() {}

// Change image every 7 seconds (7000 milliseconds)
setInterval(changeImage, 7000);
