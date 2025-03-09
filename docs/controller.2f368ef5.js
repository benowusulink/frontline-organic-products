
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire94c2"];
var parcelRegister = parcelRequire.register;
parcelRegister("2UYyx", function(module, exports) {

$parcel$export(module.exports, "CheckoutController", () => $21ffc8ecb7bafcb6$export$8cc5b49137b63d);

var $caffw = parcelRequire("caffw");

var $5pTbg = parcelRequire("5pTbg");
class $21ffc8ecb7bafcb6$export$8cc5b49137b63d {
    constructor(){
        this.checkoutView = new (0, $caffw.CheckoutView)();
        this.init();
    }
    init = ()=>{
        (0, $5pTbg.default).makeFinalCheckoutItems();
        (0, $5pTbg.default).registerListener((state)=>{
            this.checkoutView.renderCheckout(state);
        });
        this.checkoutView.renderIncrementOrDecrementCartItem((0, $5pTbg.default).incrementQuantityInFinalCheckoutItems, (0, $5pTbg.default).decrementQuantityInFinalCheckoutItems);
        this.checkoutView.renderRemoveCartItem((0, $5pTbg.default).removeFinalCheckoutItem);
        this.checkoutView.paymentButtonClick((0, $5pTbg.default).goToPaymentButton);
    };
}

});
parcelRegister("caffw", function(module, exports) {

$parcel$export(module.exports, "CheckoutView", () => $8db23f6755f64e26$export$88fc563dfb3b4c0e);
class $8db23f6755f64e26$export$88fc563dfb3b4c0e {
    constructor(){
        // caching main html elements needed for checkout page
        this.mainElement = document.getElementById("checkout-page-main");
        this.checkoutSection = document.getElementById("checkout-page-main-section");
        this.checkoutButton = null;
        this.cartItems = [];
        this.spanTotalProducts = null;
        this.spanTotalPrice = null;
        this.checkoutTab = document.getElementById("checkout-page-checkout-tab");
    }
    /* function to render checkout component (recieves state from model,
	and renders based on conditions within state)*/ renderCheckout = (state)=>{
        /* condition statement that initially render cartitems if they dont already
		exist within view class, cartitems provided by state */ if (state.finalCheckoutItems.length >= 1 && this.cartItems.length < 1 && !this.checkoutButton) {
            // creating go to payment button & spans for cartitem quantity & total price
            const section = document.createElement("section");
            const button = document.createElement("button");
            const span1 = document.createElement("span");
            const span2 = document.createElement("span");
            // appending go to payment button & spans for cartitem quantity & total price
            this.mainElement.appendChild(section);
            section.appendChild(span1);
            section.appendChild(span2);
            section.appendChild(button);
            // adding attributes to section
            section.id = "checkout-page-main-section2";
            // adding attributes to button
            button.id = "checkout-page-main-section2-button";
            button.textContent = "Go to Payment";
            // adding attributes to spans for cartitem quantity & total price
            span1.id = "checkout-page-main-section2-span1";
            span1.textContent = `Number of Products in Cart:
				${state.finalCheckoutItems.length}`;
            span2.id = "checkout-page-main-section2-span2";
            span2.textContent = `Total Price: \xa3${state.totalPrice}`;
            // caching button within checkiut view class
            this.checkoutButton = button;
            // caching spans for cartitem quantity & total price
            this.spanTotalProducts = span1;
            this.spanTotalPrice = span2;
            /* creating cartitem elements based on how many items
				within state */ state.finalCheckoutItems.forEach((product)=>{
                // creating final checkout elements for cart
                const div1 = document.createElement("div");
                const div2 = document.createElement("div");
                const img = document.createElement("img");
                const h2 = document.createElement("h2");
                const spanMinus = document.createElement("span");
                const spanQuantity = document.createElement("span");
                const spanPlus = document.createElement("span");
                const spanPrice = document.createElement("span");
                const spanRemoveItem = document.createElement("span");
                // appending final checkout items
                this.checkoutSection.appendChild(div1);
                div1.append(img, h2, div2);
                div2.append(spanMinus, spanQuantity, spanPlus, spanPrice, spanRemoveItem);
                // adding attributes to final checkout elements for cart
                div1.classList.add("checkout-page-main-section-div");
                div1.id = product.productName;
                img.src = product.productImage;
                img.classList.add("checkout-page-main-section-div-img");
                h2.classList.add("checkout-page-main-section-div-h2");
                h2.textContent = product.productName;
                div2.classList.add("checkout-page-main-section-div2");
                spanMinus.classList.add("checkout-page-main-section-div-span");
                spanMinus.classList.add("checkout-page-main-section-div-span-minus");
                spanMinus.id = "checkout-page-main-section-div-span-minus";
                spanMinus.name = product.productName;
                spanMinus.textContent = `-`;
                spanQuantity.classList.add("checkout-page-main-section-div-span");
                spanQuantity.id = "checkout-page-main-section-div-span-quantity";
                spanQuantity.name = product.productName;
                spanQuantity.textContent = `Quantity: ${product.quantity}`;
                spanPlus.classList.add("checkout-page-main-section-div-span");
                spanPlus.classList.add("checkout-page-main-section-div-span-plus");
                spanPlus.id = "checkout-page-main-section-div-span-plus";
                spanPlus.name = product.productName;
                spanPlus.textContent = `+`;
                spanPrice.classList.add("checkout-page-main-section-div-span");
                spanPrice.id = "checkout-page-main-section-div-span-price";
                spanPrice.name = product.productName;
                spanPrice.textContent = `\xa3${product.productXquantity}`;
                spanRemoveItem.classList.add("checkout-page-main-section-div-span");
                spanRemoveItem.id = "checkout-page-main-section-div-span-removeItem";
                spanRemoveItem.name = product.productName;
                spanRemoveItem.textContent = "Remove Item from Cart";
                // caching cartitem elements within checkout view class
                this.cartItems.push(div1);
            });
            this.checkoutTab.textContent = `Checkout: ${state.finalCheckoutItems.length}`;
        } else {
            const noProducts = ()=>{
                const article = document.createElement("article");
                const h2 = document.createElement("h2");
                const a = document.createElement("a");
                this.checkoutSection.appendChild(article);
                article.appendChild(h2);
                article.appendChild(a);
                article.id = "checkout-page-main-section-article";
                h2.id = "checkout-page-main-section-article-h2";
                h2.textContent = `No items currently added in checkout.\n 
		            Click below to Explore our lovely range of organic products`;
                a.id = "checkout-page-main-section-article-a";
                a.href = `${window.location.origin}/frontline-organic-products/products.html`;
                a.textContent = "Click me!!";
            };
            /* condition to render a removed cart element, model removes cartitem from
		  state and passed into view */ if (this.cartItems.length !== state.finalCheckoutItems.length) {
                /* function to create updated view cartitems array with removed
					element recieved from state */ const newcartItems = ()=>{
                    // loops through state checkout list, updates the views checkoutlist
                    // to the states updated verion
                    const result = state.finalCheckoutItems.reduce((acc, stateItem)=>{
                        const matches = this.cartItems.filter((cartItem)=>{
                            return stateItem.productName === cartItem.id;
                        });
                        return acc.concat(matches);
                    }, []);
                    console.log(result);
                    return result;
                };
                // function to find the cart item from the view that was removed
                const filteredProduct = ()=>{
                    const result = this.cartItems.filter((cartItem)=>{
                        console.log(cartItem.id);
                        return state.finalCheckoutItems.every((stateItem)=>{
                            if (cartItem.id !== stateItem.productName) return stateItem;
                        });
                    });
                    console.log(result);
                    return result;
                };
                /* condition to either remove individual cart item from view
					 or clear the whole cart component view if cartitems length 
					 less than 0 */ if (newcartItems().length < 1) {
                    console.log("empty product list");
                    this.cartItems = newcartItems();
                    this.checkoutButton = null;
                    document.getElementById("checkout-page-main-section2-button").remove();
                    this.spanTotalPrice = null;
                    document.getElementById("checkout-page-main-section2-span2").remove();
                    this.spanTotalProducts = null;
                    document.getElementById("checkout-page-main-section2-span1").remove();
                    this.checkoutSection.replaceChildren();
                    noProducts();
                    this.checkoutTab.textContent = `Checkout`;
                } else {
                    document.getElementById(filteredProduct()[0].id).remove();
                    this.cartItems = newcartItems();
                    console.log("product removed");
                    this.spanTotalProducts.textContent = `Number of Products in Cart:
							${state.finalCheckoutItems.length}`;
                    document.getElementById("checkout-page-main-section2-span1").textContent = `Number of Products in Cart:
							${state.finalCheckoutItems.length}`;
                    document.getElementById("checkout-page-main-section2-span2").textContent = `Total Price: \xa3${state.totalPrice}`;
                    this.spanTotalPrice.textContent = `\xa3Total Price: ${state.totalPrice}`;
                    this.checkoutTab.textContent = `Checkout: ${state.finalCheckoutItems.length}`;
                }
            } else // condition to update view cartitems with updated state item properties
            if (this.cartItems.length >= 1 && state.finalCheckoutItems.length >= 1) {
                console.log("product quantity changed");
                // function to locate view cartitem for updates
                const findElement = (stateProductName)=>{
                    const result = this.cartItems.find((product)=>{
                        return product.id === stateProductName;
                    });
                    return result;
                };
                /* locate and update each view cart item with new properties
						from new updated state cart items */ state.finalCheckoutItems.forEach((product)=>{
                    const element = findElement(product.productName);
                    if (element) {
                        element.children[2].children[1].textContent = `Quantity: ${product.quantity}`;
                        element.children[2].children[3].textContent = `\xa3${product.productXquantity}`;
                    } else console.log("couldnt update values");
                });
                this.spanTotalPrice.textContent = `Total Price: \xa3${state.totalPrice}`;
                document.getElementById("checkout-page-main-section2-span2").textContent = `Total Price: \xa3${state.totalPrice}`;
                this.spanTotalProducts.textContent = `Number of Products in Cart:
						${this.cartItems.length}`;
                document.getElementById("checkout-page-main-section2-span1").textContent = `Number of Products in Cart:
						${this.cartItems.length}`;
                this.checkoutTab.textContent = `Checkout: ${state.finalCheckoutItems.length}`;
            } else /* condition to clear view cartlist component if updated state
					cartlist is empty */ noProducts();
        }
    };
    renderIncrementOrDecrementCartItem = (globalModelIncrementCartItem, globalModelDecrementCartItem)=>{
        if (this.cartItems.length >= 1) {
            const spanPlus = this.cartItems.map((item)=>{
                return item.children[2].children[2];
            });
            const spanMinus = this.cartItems.map((item)=>{
                return item.children[2].children[0];
            });
            spanPlus.forEach((span)=>{
                span.addEventListener("click", (event)=>{
                    globalModelIncrementCartItem(event.target.name);
                    console.log("click");
                });
            });
            spanMinus.forEach((span)=>{
                span.addEventListener("click", (event)=>{
                    console.log("click");
                    globalModelDecrementCartItem(event.target.name);
                });
            });
        }
    };
    renderRemoveCartItem = (globalModelRemoveCartItem)=>{
        if (this.cartItems.length >= 1) {
            const spanRemoveItem = this.cartItems.map((cartItem)=>{
                return cartItem.children[2].children[4];
            });
            spanRemoveItem.forEach((span)=>{
                span.addEventListener("click", (event)=>{
                    globalModelRemoveCartItem(event.target.name);
                });
            });
        }
    };
    paymentButtonClick = (globalModelgoToPaymentButton)=>{
        if (this.cartItems.length > 1) this.checkoutButton.addEventListener("click", (event)=>{
            console.log(globalModelgoToPaymentButton());
        });
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






//# sourceMappingURL=controller.2f368ef5.js.map
