
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire94c2"];
var parcelRegister = parcelRequire.register;
parcelRegister("6aw7O", function(module, exports) {

$parcel$export(module.exports, "ProductsController", () => $47dc98978a31ef5c$export$bc7d04bd56466d1);

var $98UHB = parcelRequire("98UHB");

var $8riqP = parcelRequire("8riqP");

var $5pTbg = parcelRequire("5pTbg");
class $47dc98978a31ef5c$export$bc7d04bd56466d1 {
    constructor(){
        this.productModel = new (0, $98UHB.ProductModel)();
        this.productView = new (0, $8riqP.ProductView)();
        this.productView.renderInitialProductList(this.productModel.renderInitialProductList());
        (0, $5pTbg.default).registerListener((state)=>{
            this.productView.updateCheckoutTabItemAmount(state);
        });
        this.productView.addProductToGlobalStateCheckoutPageItems(this.productModel.addToGlobalStateCheckoutPageItems);
    }
}

});
parcelRegister("98UHB", function(module, exports) {

$parcel$export(module.exports, "ProductModel", () => $6a80d853760c054a$export$f59d3de288812f26);

var $5pTbg = parcelRequire("5pTbg");
parcelRequire("hldbe");
class $6a80d853760c054a$export$f59d3de288812f26 {
    constructor(){
        this.state = {
            products: (0, $5pTbg.default).getState("productsList")
        };
    }
    renderInitialProductList = ()=>{
        return this.state.products;
    };
    addToGlobalStateCheckoutPageItems = (productName)=>{
        return (0, $5pTbg.default).addToCheckOutItems(productName);
    };
}

});
parcelRegister("5pTbg", function(module, exports) {

$parcel$export(module.exports, "default", () => $3f1a174c2e331812$export$2e2bcd8739ae039);

var $9GcqI = parcelRequire("9GcqI");
class $3f1a174c2e331812$var$GlobalStateModel {
    constructor(){
        this.state = {
            productsList: (0, $9GcqI.productsList),
            checkoutPageItems: [],
            finalCheckoutItems: [],
            totalPrice: 0
        };
        this.listeners = [];
    }
    setState = (newState)=>{
        return this.state = {
            ...this.state,
            ...newState
        };
    };
    registerListener = (listener)=>{
        this.listeners.push(listener);
        listener(this.state);
    };
    notifyListener = ()=>{
        this.listeners.forEach((listener)=>{
            listener(this.state);
        });
    };
    getState = (stateName)=>{
        if (this.state[stateName]) return this.state[stateName];
        else console.log("no state exists");
    };
    // product page
    addToCheckOutItems = (productName)=>{
        const doesProductExist = this.getState("productsList").some((product)=>{
            return product.productName === productName;
        });
        if (doesProductExist) {
            const checkIfItemExistsInCheckoutPageItems = this.getState("checkoutPageItems").some((product)=>{
                return product.productName === productName;
            });
            if (!checkIfItemExistsInCheckoutPageItems) {
                const productToAdd = this.getState("productsList").find((product)=>{
                    return product.productName === productName;
                });
                this.setState({
                    checkoutPageItems: [
                        ...this.getState("checkoutPageItems"),
                        productToAdd
                    ]
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
    storeCheckoutPageItemsInSession = ()=>{
        window.sessionStorage.removeItem("checkoutList");
        const storage = window.sessionStorage.setItem("checkoutList", JSON.stringify(this.getState("checkoutPageItems")));
    };
    // checkout page
    getFinalCheckoutItems = ()=>{
        return this.getState("finalCheckoutItems");
    };
    retireveCheckoutPageItemsfromSession = ()=>{
        const checkoutListSession = JSON.parse(window.sessionStorage.getItem("checkoutList"));
        if (checkoutListSession) {
            this.setState({
                checkoutPageItems: checkoutListSession
            });
            return this.getState("checkoutPageItems");
        } else {
            this.setState({
                checkoutPageItems: []
            });
            return this.getState("checkoutPageItems");
        }
    };
    makeFinalCheckoutItems = ()=>{
        this.retireveCheckoutPageItemsfromSession();
        this.setState({
            finalCheckoutItems: this.retireveCheckoutPageItemsfromSession()
        });
        if (this.getFinalCheckoutItems().length > 1) {
            this.getFinalCheckoutItems().forEach((product)=>{
                if (!product.quantity) product.quantity = 1;
            });
            this.notifyListener();
            this.calculateProductPrice();
        } else this.notifyListener();
    };
    calculateProductPrice = ()=>{
        if (this.getFinalCheckoutItems().length >= 1) {
            const updatedPrice = this.getFinalCheckoutItems().map((product)=>{
                product.productXquantity = product.productPrice * product.quantity;
                return product;
            });
            this.setState({
                finalCheckoutItems: updatedPrice
            });
            this.notifyListener();
            this.getTotalPrice();
            return this.getFinalCheckoutItems();
        }
    };
    getTotalPrice = ()=>{
        if (this.getFinalCheckoutItems().length >= 1) {
            const totalPrice = this.getFinalCheckoutItems().reduce((accumalator, product)=>{
                return accumalator + product.productXquantity;
            }, 0);
            console.log(totalPrice);
            this.setState({
                totalPrice: totalPrice
            });
            this.notifyListener();
            console.log(this.getState("totalPrice"));
            console.log(this.getFinalCheckoutItems());
            return this.getState("totalPrice");
        }
    };
    incrementQuantityInFinalCheckoutItems = (productName)=>{
        const filteredProduct = this.getFinalCheckoutItems().find((product)=>{
            if (product.productName === productName) return product;
        });
        const newState = this.getFinalCheckoutItems().map((product)=>{
            if (product.productName === filteredProduct.productName) return {
                ...product,
                quantity: product.quantity + 1
            };
            return product;
        });
        this.setState({
            finalCheckoutItems: newState
        });
        window.sessionStorage.removeItem("checkoutList");
        const storage = window.sessionStorage.setItem("checkoutList", JSON.stringify(newState));
        this.notifyListener();
        this.calculateProductPrice();
    };
    decrementQuantityInFinalCheckoutItems = (productName)=>{
        const filteredProduct = this.getFinalCheckoutItems().find((product)=>{
            if (product.productName === productName) {
                product.quantity = product.quantity - 1;
                return product;
            }
        });
        if (filteredProduct.quantity < 1) {
            const newArray = this.getFinalCheckoutItems().filter((product)=>{
                return product.productName !== productName;
            });
            if (newArray.length < 1) {
                this.setState({
                    finalCheckoutItems: []
                });
                window.sessionStorage.removeItem("checkoutList");
                this.notifyListener();
            } else {
                this.setState({
                    finalCheckoutItems: newArray
                });
                window.sessionStorage.removeItem("checkoutList");
                const storage = window.sessionStorage.setItem("checkoutList", JSON.stringify(newArray));
                this.notifyListener();
                this.calculateProductPrice();
            }
        } else {
            const newArray = this.getFinalCheckoutItems().map((item)=>{
                if (item.productName === productName) return {
                    ...item,
                    ...filteredProduct
                };
                else return item;
            });
            this.setState({
                finalCheckoutItems: newArray
            });
            window.sessionStorage.removeItem("checkoutList");
            const storage = window.sessionStorage.setItem("checkoutList", JSON.stringify(newArray));
            this.notifyListener();
            this.calculateProductPrice();
        }
    };
    removeFinalCheckoutItem = (productName)=>{
        const newArray = this.getFinalCheckoutItems().filter((product)=>{
            return product.productName !== productName;
        });
        this.setState({
            finalCheckoutItems: newArray
        });
        window.sessionStorage.removeItem("checkoutList");
        const storage = window.sessionStorage.setItem("checkoutList", JSON.stringify(newArray));
        this.notifyListener();
        this.calculateProductPrice();
    };
    goToPaymentButton = ()=>{
        const totalPrice = this.getState("totalPrice");
        const products = this.getFinalCheckoutItems();
        return {
            totalPrice: totalPrice,
            products: products
        };
    };
}
const $3f1a174c2e331812$var$GlobalState = new $3f1a174c2e331812$var$GlobalStateModel();
var $3f1a174c2e331812$export$2e2bcd8739ae039 = $3f1a174c2e331812$var$GlobalState;

});
parcelRegister("9GcqI", function(module, exports) {

$parcel$export(module.exports, "productsList", () => $70c1ada21c87bd3a$export$f74b06b2a4ca50e9);

var $hldbe = parcelRequire("hldbe");
const $70c1ada21c87bd3a$export$f74b06b2a4ca50e9 = [
    {
        productID: 1,
        productName: "Organic Cinnamon",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[0],
        productInfo: `Savour the rich aroma and sweet-spicy taste of our organic cinnamon,
		a powerhouse of flavour and wellness.

		This super spice balances blood sugar, boosts metabolism, and
        enhances both sweet and savoury recipes.

        Sprinkle a little goodness into your meals and enjoy its natural
        benefits!`
    },
    {
        productID: 2,
        productName: "Organic Shea Butter",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[1],
        productInfo: `Deeply moisturise and protect your skin with our raw, unrefined shea butter, rich in vitamins A and E.

This luxurious, all-natural butter soothes dryness, reduces scars, and enhances skin elasticity.

Experience the ultimate nourishment for soft, glowing skin every day!`
    },
    {
        productID: 3,
        productName: "Organic Rosemary",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[2],
        productInfo: `Experience the fresh, earthy aroma of organic rosemary, perfect for cooking, hair care, and relaxation.

Packed with antioxidants and anti-inflammatory properties, it enhances flavour in dishes while promoting scalp health.

Add a touch of nature\u{2019}s magic to your kitchen and beauty routine!`
    },
    {
        productID: 4,
        productName: "Organic Black Seed",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[3],
        productInfo: `Boost your health with the powerful benefits of black seed, known as the "seed of blessing."

		Rich in antioxidants, it supports immune function, digestion, and skin health.

		Whether in teas, oils, or smoothies, this ancient remedy is a must-have for total well-being!`
    },
    {
        productID: 5,
        productName: "Organic Cloves",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[4],
        productInfo: `Add a warm, spicy kick to your dishes with our premium organic cloves, packed with essential oils and health benefits.

Known for their antibacterial properties, cloves aid digestion, freshen breath, and enhance immune support.

Perfect for seasoning, teas, or even natural remedies!`
    },
    {
        productID: 6,
        productName: "Organic Aidan Fruit (Prekese)",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[5],
        productInfo: `Unlock the natural healing power of Aidan Fruit (Prekese), packed with antioxidants and essential nutrients.

Traditionally used in herbal remedies, this aromatic fruit enhances soups, stews, and teas while promoting overall wellness.

Add it to your daily routine for a natural immune boost and vibrant health!`
    },
    {
        productID: 7,
        productName: "Organic Hibiscus Flower",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[6],
        productInfo: `Brew a refreshing, tangy cup of hibiscus tea, rich in vitamin C and bursting with flavour.

This vibrant flower supports heart health, aids digestion, and provides a natural energy boost.

Enjoy it hot or cold for a delicious, antioxidant-rich treat!`
    },
    {
        productID: 8,
        productName: "Organic Pure Honey",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[7],
        productInfo: `Indulge in the pure, golden goodness of our 100% organic honey, harvested from the finest bees.

Naturally rich in enzymes and antioxidants, it\u{2019}s perfect for sweetening tea, drizzling over breakfast, or nourishing your skin.

Enjoy nature\u{2019}s sweetest superfood, free from additives and preservatives!`
    },
    {
        productID: 9,
        productName: "Organic Black Soap",
        productPrice: 50,
        productXquantity: 0,
        productImage: (0, $hldbe.default)[8],
        productInfo: `Reveal radiant, blemish-free skin with our handcrafted African black soap, made from natural plant-based ingredients.

Known for its deep-cleansing and exfoliating properties, it helps combat acne, dark spots, and excess oil.

Elevate your skincare routine with this ancient beauty secret!`
    }
];

});
parcelRegister("hldbe", function(module, exports) {

$parcel$export(module.exports, "default", () => $c9fe9f20e8ccc3cb$export$2e2bcd8739ae039);

var $3NaPq = parcelRequire("3NaPq");

var $feenO = parcelRequire("feenO");

var $bpIlg = parcelRequire("bpIlg");

var $6ZCAF = parcelRequire("6ZCAF");

var $9QEAs = parcelRequire("9QEAs");

var $1QUWy = parcelRequire("1QUWy");

var $4yY32 = parcelRequire("4yY32");

var $dcxac = parcelRequire("dcxac");

var $e3biN = parcelRequire("e3biN");
const $c9fe9f20e8ccc3cb$var$images = [
    (0, (/*@__PURE__*/$parcel$interopDefault($3NaPq))),
    (0, (/*@__PURE__*/$parcel$interopDefault($feenO))),
    (0, (/*@__PURE__*/$parcel$interopDefault($bpIlg))),
    (0, (/*@__PURE__*/$parcel$interopDefault($6ZCAF))),
    (0, (/*@__PURE__*/$parcel$interopDefault($9QEAs))),
    (0, (/*@__PURE__*/$parcel$interopDefault($1QUWy))),
    (0, (/*@__PURE__*/$parcel$interopDefault($4yY32))),
    (0, (/*@__PURE__*/$parcel$interopDefault($dcxac))),
    (0, (/*@__PURE__*/$parcel$interopDefault($e3biN)))
];
var $c9fe9f20e8ccc3cb$export$2e2bcd8739ae039 = $c9fe9f20e8ccc3cb$var$images;

});
parcelRegister("3NaPq", function(module, exports) {
module.exports = new URL("product1.685b36df.png", import.meta.url).toString();

});

parcelRegister("feenO", function(module, exports) {
module.exports = new URL("product2.b7ca7d72.jpg", import.meta.url).toString();

});

parcelRegister("bpIlg", function(module, exports) {
module.exports = new URL("product3.69c6121c.jpg", import.meta.url).toString();

});

parcelRegister("6ZCAF", function(module, exports) {
module.exports = new URL("product4.b2cbdec6.jpg", import.meta.url).toString();

});

parcelRegister("9QEAs", function(module, exports) {
module.exports = new URL("product5.e6227d52.png", import.meta.url).toString();

});

parcelRegister("1QUWy", function(module, exports) {
module.exports = new URL("product6.879a5d2c.png", import.meta.url).toString();

});

parcelRegister("4yY32", function(module, exports) {
module.exports = new URL("product7.3d1035eb.png", import.meta.url).toString();

});

parcelRegister("dcxac", function(module, exports) {
module.exports = new URL("product8.c251b0ea.png", import.meta.url).toString();

});

parcelRegister("e3biN", function(module, exports) {
module.exports = new URL("product9.3cb4dc70.png", import.meta.url).toString();

});





parcelRegister("8riqP", function(module, exports) {

$parcel$export(module.exports, "ProductView", () => $624f24827116ae8a$export$103e0ac69502da15);
class $624f24827116ae8a$export$103e0ac69502da15 {
    constructor(){
        this.productPageSection = document.getElementById("product-page-section");
        this.checkoutTab = document.getElementById("product-page-checkout-tab");
    }
    renderInitialProductList = (productsArray)=>{
        productsArray.forEach((product)=>{
            const div1 = document.createElement("div");
            const div2 = document.createElement("div");
            const div3 = document.createElement("div");
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
            const h3 = document.createElement("h3");
            const h4 = document.createElement("h4");
            const button = document.createElement("button");
            this.productPageSection.appendChild(div1);
            div1.appendChild(img);
            div1.appendChild(div2);
            div1.appendChild(div3);
            div2.appendChild(h2);
            div2.appendChild(h3);
            div3.appendChild(h4);
            div3.appendChild(button);
            div1.classList.add("product-page-section-div2");
            div1.id = product.productName;
            div1.name = product.productName;
            div2.classList.add("product-page-section-div3");
            img.classList.add("product-page-section-div3-img");
            img.src = product.productImage;
            h2.classList.add("product-page-section-div3-h2");
            h2.textContent = product.productName;
            h3.classList.add("product-page-section-div3-h3");
            h3.textContent = product.productInfo;
            div3.classList.add("product-page-section-div4");
            h4.classList.add("product-page-section-div4-h4");
            h4.textContent = `Price: \xa3${product.productPrice}`;
            button.classList.add("product-page-section-div4-button");
            button.id = product.productID;
            button.name = product.productName;
            button.textContent = "Add to cart";
        });
    };
    addProductToGlobalStateCheckoutPageItems = (globalAddProductFunction)=>{
        const buttons = Array.from(document.getElementsByClassName("product-page-section-div4-button"));
        buttons.forEach((button)=>{
            button.addEventListener("click", (e)=>{
                console.log("click");
                globalAddProductFunction(e.target.name);
            });
        });
    };
    updateCheckoutTabItemAmount = (state)=>{
        if (state.checkoutPageItems.length >= 1) this.checkoutTab.textContent = `Checkout: ${state.checkoutPageItems.length}`;
    };
}

});



//# sourceMappingURL=controller.9c882676.js.map
