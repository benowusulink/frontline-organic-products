export class CheckoutView {
	constructor(){
		// caching main html elements needed for checkout page
		this.mainElement =
		document.getElementById("checkout-page-main");
		this.checkoutSection = 
		document.getElementById("checkout-page-main-section");
		this.checkoutButton = null;
		this.cartItems = [];
		this.spanTotalProducts = null;
		this.spanTotalPrice = null;
		this.checkoutTab = document.getElementById("checkout-page-checkout-tab");
	}

	/* function to render checkout component (recieves state from model,
	and renders based on conditions within state)*/
	renderCheckout = (state)=>{

		/* condition statement that initially render cartitems if they dont already
		exist within view class, cartitems provided by state */
		if(state.finalCheckoutItems.length >= 1 
			&& this.cartItems.length < 1 
			&& !this.checkoutButton){

				// creating go to payment button & spans for cartitem quantity & total price
				const section = document.createElement("section");
				const button = document.createElement("button");
				const span1 = document.createElement("span");
				const span2 = document.createElement("span");

				// appending go to payment button & spans for cartitem quantity & total price
				this.mainElement.appendChild(section)
				section.appendChild(span1)
				section.appendChild(span2)
				section.appendChild(button)

				// adding attributes to section
				section.id = "checkout-page-main-section2";

				// adding attributes to button 
				button.id = "checkout-page-main-section2-button";
				button.textContent = "Go to Payment"

				// adding attributes to spans for cartitem quantity & total price
				span1.id = "checkout-page-main-section2-span1";
				span1.textContent=`Number of Products in Cart:
				${state.finalCheckoutItems.length}`;
				span2.id = "checkout-page-main-section2-span2";
				span2.textContent=`Total Price: £${state.totalPrice}`;

				// caching button within checkiut view class
				this.checkoutButton = button

				// caching spans for cartitem quantity & total price
				this.spanTotalProducts = span1
				this.spanTotalPrice = span2

				/* creating cartitem elements based on how many items
				within state */
				state.finalCheckoutItems.forEach((product) =>{

				// creating final checkout elements for cart
				const div1 = document.createElement("div");
				const div2 = document.createElement("div");
				const img = document.createElement("img");
				const h2 = document.createElement("h2");
				const spanMinus = document.createElement("span");
				const spanQuantity = document.createElement("span");
				const spanPlus = document.createElement("span");
				const spanPrice = document.createElement("span");
				const spanRemoveItem= document.createElement("span");

				// appending final checkout items 
				this.checkoutSection.appendChild(div1)
				div1.append(img,h2,div2)
				div2.append(
					spanMinus,spanQuantity,spanPlus,spanPrice,spanRemoveItem
				)


				// adding attributes to final checkout elements for cart
				div1.classList.add("checkout-page-main-section-div")
				div1.id = product.productName;

				img.src = product.productImage;
				img.classList.add("checkout-page-main-section-div-img");

				h2.classList.add("checkout-page-main-section-div-h2");
				h2.textContent = product.productName

				div2.classList.add("checkout-page-main-section-div2")

				spanMinus.classList.add("checkout-page-main-section-div-span");
				spanMinus.classList.add("checkout-page-main-section-div-span-minus");
				spanMinus.id = "checkout-page-main-section-div-span-minus";
				spanMinus.name = product.productName;
				spanMinus.textContent = `-`

				spanQuantity.classList.add("checkout-page-main-section-div-span")
				spanQuantity.id = "checkout-page-main-section-div-span-quantity";
				spanQuantity.name = product.productName;
				spanQuantity.textContent = `Quantity: ${product.quantity}`

				spanPlus.classList.add("checkout-page-main-section-div-span")
				spanPlus.classList.add("checkout-page-main-section-div-span-plus");
				spanPlus.id = "checkout-page-main-section-div-span-plus";
				spanPlus.name = product.productName;
				spanPlus.textContent = `+`

				spanPrice.classList.add("checkout-page-main-section-div-span")
				spanPrice.id = "checkout-page-main-section-div-span-price";
				spanPrice.name = product.productName;
				spanPrice.textContent = `£${product.productXquantity}`;


				spanRemoveItem.classList.add("checkout-page-main-section-div-span")
				spanRemoveItem.id = "checkout-page-main-section-div-span-removeItem";
				spanRemoveItem.name = product.productName;
				spanRemoveItem.textContent = "Remove Item from Cart";


				// caching cartitem elements within checkout view class
				this.cartItems.push(div1)

				})

					this.checkoutTab.textContent = 
					`Checkout: ${state.finalCheckoutItems.length}`

			}
			else{

				const noProducts = () => {
					const article = document.createElement("article");
					const h2 = document.createElement("h2");
					const a = document.createElement("a");

					this.checkoutSection.appendChild(article)
					article.appendChild(h2)
					article.appendChild(a)

					article.id = "checkout-page-main-section-article"

					h2.id = "checkout-page-main-section-article-h2"
					h2.textContent = `No items currently added in checkout.\n 
		            Click below to Explore our lovely range of organic products`

					a.id = "checkout-page-main-section-article-a"
					a.href = "../../../products.html"
					a.textContent = "Click me!!"
				}
		/* condition to render a removed cart element, model removes cartitem from
		  state and passed into view */
				if(this.cartItems.length !== state.finalCheckoutItems.length){

					/* function to create updated view cartitems array with removed
					element recieved from state */
					const newcartItems = ()=>{
						// loops through state checkout list, updates the views checkoutlist
						// to the states updated verion
							const result = 
								state.finalCheckoutItems.reduce((acc, stateItem) => {
		  							const matches = this.cartItems.filter((cartItem) =>{
		  								return stateItem.productName === cartItem.id
		  							});
		  							return acc.concat(matches);
								}, []);

							console.log(result);

							return result
						}

				// function to find the cart item from the view that was removed
					const filteredProduct = ()=>{
							const result = 
							  this.cartItems.filter((cartItem)=>{
							  	console.log(cartItem.id)
							  	return state.finalCheckoutItems.every((stateItem)=>{
							  		if(cartItem.id !== stateItem.productName){
							  			return stateItem
							  		}
							  	})
							  })
							  console.log(result)
							return result
						}
					
					/* condition to either remove individual cart item from view
					 or clear the whole cart component view if cartitems length 
					 less than 0 */
						if(newcartItems().length < 1){

								console.log("empty product list")

								this.cartItems = newcartItems();

								this.checkoutButton = null;
								document.getElementById("checkout-page-main-section2-button").remove()

								this.spanTotalPrice = null;
								document.getElementById("checkout-page-main-section2-span2").remove()

								this.spanTotalProducts = null;
								document.getElementById("checkout-page-main-section2-span1").remove()

								this.checkoutSection.replaceChildren();
								noProducts()

								this.checkoutTab.textContent = `Checkout`

						}
						else{
							document.getElementById(filteredProduct()[0].id).remove();

							this.cartItems = newcartItems();

							console.log("product removed");

							this.spanTotalProducts.textContent = `Number of Products in Cart:
							${state.finalCheckoutItems.length}`;
							document.getElementById("checkout-page-main-section2-span1")
							.textContent = `Number of Products in Cart:
							${state.finalCheckoutItems.length}`;

							document.getElementById("checkout-page-main-section2-span2")
							.textContent = `Total Price: £${state.totalPrice}`;
							this.spanTotalPrice.textContent = `£Total Price: ${state.totalPrice}`

							this.checkoutTab.textContent = 
							`Checkout: ${state.finalCheckoutItems.length}`
						}
				}
				else{

				// condition to update view cartitems with updated state item properties
					if(this.cartItems.length >= 1 
						&& state.finalCheckoutItems.length >= 1){

						console.log("product quantity changed");

						// function to locate view cartitem for updates
						const findElement = (stateProductName) => {
							const result = this.cartItems.find((product)=>{
								return product.id === stateProductName
							})
							return result
						}

						/* locate and update each view cart item with new properties
						from new updated state cart items */
						state.finalCheckoutItems.forEach((product)=>{

							const element = findElement(product.productName)

							if(element){
								element.children[2].children[1].textContent = `Quantity: ${product.quantity}`
								element.children[2].children[3].textContent = `£${product.productXquantity}`
							}
							else{
								console.log("couldnt update values")
							}
						})

						this.spanTotalPrice.textContent = `Total Price: £${state.totalPrice}`
						document.getElementById("checkout-page-main-section2-span2")
						.textContent = `Total Price: £${state.totalPrice}`

						this.spanTotalProducts.textContent = `Number of Products in Cart:
						${this.cartItems.length}`;
						document.getElementById("checkout-page-main-section2-span1")
						.textContent = `Number of Products in Cart:
						${this.cartItems.length}`;

						this.checkoutTab.textContent = 
						`Checkout: ${state.finalCheckoutItems.length}`

					}
					/* condition to clear view cartlist component if updated state
					cartlist is empty */
					else {

						noProducts();
					}
				}
			}
		}
	

	renderIncrementOrDecrementCartItem = (
		globalModelIncrementCartItem,
		globalModelDecrementCartItem
	) => {


		if(this.cartItems.length >= 1){
			
			const spanPlus = this.cartItems.map((item)=>{
				return item.children[2].children[2]
			})

			const spanMinus = this.cartItems.map((item)=>{
				return item.children[2].children[0]
			})

			spanPlus.forEach((span)=>{
				span.addEventListener("click", (event)=>{
					globalModelIncrementCartItem(event.target.name)
					console.log("click")
				})
			})

			spanMinus.forEach((span)=>{
				span.addEventListener("click", (event)=>{
					console.log("click")
					globalModelDecrementCartItem(event.target.name)
				})
			})
		}
	}


	renderRemoveCartItem = (globalModelRemoveCartItem)=>{
		if (this.cartItems.length >= 1){

			const spanRemoveItem = this.cartItems.map((cartItem)=>{
				return cartItem.children[2].children[4]
			})

			spanRemoveItem.forEach((span)=>{
				span.addEventListener("click", (event)=>{
					globalModelRemoveCartItem(event.target.name)
				})
			})
		}
	}

	paymentButtonClick = (globalModelgoToPaymentButton)=>{

		if (this.cartItems.length >1){

			this.checkoutButton.addEventListener("click", (event)=>{
				console.log(globalModelgoToPaymentButton());
			})
		}
	}

}





