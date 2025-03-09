
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire94c2"];
var parcelRegister = parcelRequire.register;
parcelRegister("cYK93", function(module, exports) {

$parcel$export(module.exports, "IndexController", () => $972ee212e1876a4c$export$5b5e1135c5b4d9ac);
// importing index-pages Model and View

var $5Co20 = parcelRequire("5Co20");

var $aK4nl = parcelRequire("aK4nl");
class $972ee212e1876a4c$export$5b5e1135c5b4d9ac {
    constructor(){
        // initiating index-pages model and view
        this.model = new (0, $5Co20.IndexModel)();
        this.view = new (0, $aK4nl.IndexView)();
        // invoking renderInitialImage function when controller class is invoked
        this.renderInitialImage();
        // invoking updateImage function when controller class is invoked
        this.updateImage();
    }
    /* function that renders view renderAboutUsImage with data from model
getInitialImage */ renderInitialImage = ()=>{
        this.view.renderAboutUsImage(this.model.getInitialImage());
    };
    /* function that registers view updateAboutUsImage to state changes from 
the model with data from model, also invokes models updateImage to start 
updating the image */ updateImage = ()=>{
        this.model.registerListener((state)=>{
            this.view.updateAboutUsImage(state);
        });
        this.model.updateImage();
    };
}

});
parcelRegister("5Co20", function(module, exports) {

$parcel$export(module.exports, "IndexModel", () => $41732480871838fb$export$379f442843fb25b3);
// importing images used for the index-page/about-us section

var $gq1jI = parcelRequire("gq1jI");

var $2pv6p = parcelRequire("2pv6p");
class $41732480871838fb$export$379f442843fb25b3 {
    constructor(){
        // state for index page
        this.state = {
            imageIndex: 0,
            images: [
                (0, (/*@__PURE__*/$parcel$interopDefault($gq1jI))),
                (0, (/*@__PURE__*/$parcel$interopDefault($2pv6p)))
            ]
        };
        // array of view functions that need state to update and render
        this.listeners = [];
    }
    // create new state function for model
    setState = (newState)=>{
        return this.state = {
            ...this.state,
            ...newState
        };
    };
    // function to add view functions that need state to this.listeners array
    registerListener = (listener)=>{
        this.listeners.push(listener);
        listener(this.state);
    };
    // function to notify view functions that need state that the state has been updated
    notifyListeners = ()=>{
        this.listeners.forEach((listener)=>{
            listener(this.state);
        });
    };
    // function to get initial image for the index-page/about-us image section
    getInitialImage = ()=>{
        return this.state.images[this.state.imageIndex];
    };
    /* function to update image for the index-page/about-us image section every 
10 secs and then update the state */ updateImage = ()=>{
        setInterval(()=>{
            this.setState({
                imageIndex: (this.state.imageIndex + 1) % this.state.images.length
            });
            this.notifyListeners();
        }, 10000);
    };
}

});
parcelRegister("gq1jI", function(module, exports) {
module.exports = new URL("aboutus1.f477d8b7.png", import.meta.url).toString();

});

parcelRegister("2pv6p", function(module, exports) {
module.exports = new URL("aboutus2.23182cbe.png", import.meta.url).toString();

});


parcelRegister("aK4nl", function(module, exports) {

$parcel$export(module.exports, "IndexView", () => $7d219822a21cd3b3$export$427caa2aaa5306af);
// creating and exporting View class for MVC on index-page
class $7d219822a21cd3b3$export$427caa2aaa5306af {
    constructor(){
        // caching index-page/about-us image element used for image
        this.aboutUsImage = document.getElementById("landing-page-aboutUs-section-div-img");
    }
    /* creating view function to render initial image 
based on the models  getInitialImage function */ renderAboutUsImage = (imageSrc)=>{
        this.aboutUsImage.src = imageSrc;
    };
    /* creating view function to update initial image based on the models 
updateImage function, renders image based on state of images in state, 
adds css fadein/fadeout effect on images update */ updateAboutUsImage = (state)=>{
        setTimeout(()=>{
            this.aboutUsImage.classList.remove("fade-in");
            this.aboutUsImage.classList.add("fade-out");
        }, 10000);
        setTimeout(()=>{
            this.aboutUsImage.src = state.images[state.imageIndex];
            this.aboutUsImage.classList.remove("fade-out");
            this.aboutUsImage.classList.add("fade-in");
        }, 1500);
    };
}

});



//# sourceMappingURL=controller.16618278.js.map
