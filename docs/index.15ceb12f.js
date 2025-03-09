
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("aKzDW", function(module, exports) {

$parcel$export(module.exports, "register", () => $7d39d93f9098a310$export$6503ec6e8aabbaf, (v) => $7d39d93f9098a310$export$6503ec6e8aabbaf = v);
$parcel$export(module.exports, "resolve", () => $7d39d93f9098a310$export$f7ad0328861e2f03, (v) => $7d39d93f9098a310$export$f7ad0328861e2f03 = v);
var $7d39d93f9098a310$export$6503ec6e8aabbaf;
var $7d39d93f9098a310$export$f7ad0328861e2f03;
"use strict";
var $7d39d93f9098a310$var$mapping = new Map();
function $7d39d93f9098a310$var$register(baseUrl, manifest) {
    for(var i = 0; i < manifest.length - 1; i += 2)$7d39d93f9098a310$var$mapping.set(manifest[i], {
        baseUrl: baseUrl,
        path: manifest[i + 1]
    });
}
function $7d39d93f9098a310$var$resolve(id) {
    var resolved = $7d39d93f9098a310$var$mapping.get(id);
    if (resolved == null) throw new Error('Could not resolve bundle with id ' + id);
    return new URL(resolved.path, resolved.baseUrl).toString();
}
$7d39d93f9098a310$export$6503ec6e8aabbaf = $7d39d93f9098a310$var$register;
$7d39d93f9098a310$export$f7ad0328861e2f03 = $7d39d93f9098a310$var$resolve;

});

parcelRegister("2nDZD", function(module, exports) {

var $92x9i = parcelRequire("92x9i");
module.exports = $92x9i("25e53").then(()=>parcelRequire('cYK93'));

});
parcelRegister("92x9i", function(module, exports) {
"use strict";

function $694e03a97467efc7$var$load(id) {
    // eslint-disable-next-line no-undef
    return import((parcelRequire("aKzDW")).resolve(id));
}
module.exports = $694e03a97467efc7$var$load;

});


parcelRegister("cKHjW", function(module, exports) {

var $92x9i = parcelRequire("92x9i");
module.exports = $92x9i("h2pR0").then(()=>parcelRequire('6aw7O'));

});

parcelRegister("j27kA", function(module, exports) {

var $92x9i = parcelRequire("92x9i");
module.exports = $92x9i("9hQPu").then(()=>parcelRequire('2UYyx'));

});

var $8517b091614d7c5e$exports = {};

(parcelRequire("aKzDW")).register(new URL("", import.meta.url).toString(), JSON.parse("[\"6YhBQ\",\"index.15ceb12f.js\",\"25e53\",\"controller.16618278.js\",\"1pOtR\",\"aboutus1.f477d8b7.png\",\"hjo41\",\"aboutus2.23182cbe.png\",\"h2pR0\",\"controller.9c882676.js\",\"2HVbU\",\"product1.685b36df.png\",\"2oLtR\",\"product2.b7ca7d72.jpg\",\"i41nE\",\"product3.69c6121c.jpg\",\"5UbcV\",\"product4.b2cbdec6.jpg\",\"92Aob\",\"product5.e6227d52.png\",\"15VgM\",\"product6.879a5d2c.png\",\"54VsK\",\"product7.3d1035eb.png\",\"15doT\",\"product8.c251b0ea.png\",\"8K64f\",\"product9.3cb4dc70.png\",\"9hQPu\",\"controller.2f368ef5.js\"]"));




const $25a719cccf434d36$var$startApp = ()=>{
    if (window.location.pathname === "/" || window.location.pathname === "/frontline-organic-products/" || window.location.pathname === "/frontline-organic-products/index.html") {
        console.log("Index page");
        try {
            (parcelRequire("2nDZD")).then((res)=>{
                alert(`inner width:${window.innerWidth},width:${window.screen.width}`);
                new res.IndexController();
            }).catch((err)=>{
                console.log(err);
            });
        } catch (e) {
            console.log("error importing indexcntroller", e);
        }
    } else if (window.location.pathname === "/frontline-organic-products/products.html" || window.location.pathname === "/products.html") {
        console.log("Product page");
        try {
            (parcelRequire("cKHjW")).then((res)=>{
                new res.ProductsController();
            }).catch((err)=>{
                console.log(err);
            });
        } catch (e) {
            console.log("error importing indexcntroller", e);
        }
    } else if (window.location.pathname === "/frontline-organic-products/checkout.html" || window.location.pathname === "/checkout.html") {
        console.log("Checkout page");
        try {
            (parcelRequire("j27kA")).then((res)=>{
                new res.CheckoutController();
            }).catch((err)=>{
                console.log(err);
            });
        } catch (e) {
            console.log("error importing indexcntroller", e);
        }
    }
};
$25a719cccf434d36$var$startApp();


//# sourceMappingURL=index.15ceb12f.js.map
