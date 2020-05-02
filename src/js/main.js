Vue.component('product',{
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            selectedVariant: 0,
            product: "Socks",
            brand: "Vue Mastery",
            description: "A pair of warm, fuzzy socks",
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            onSale: true,
            details: [
                "80% cotton",
                "20% polyester",
                "Gender-neutral"
            ],
            reviews: [],
            variants: [
                {
                    id: 2234,
                    color: "green",
                    image: "./assets/vmSocks-green.png",
                    quantity: 10,
                },
                {
                    id: 2235,
                    color: "blue",
                    image: "./assets/vmSocks-blue.png",
                    quantity: 2,
                }
            ],
            sizes: [37, 39, 40, 44],
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inventory() {
            return this.variants[this.selectedVariant].quantity;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        sale() {
            return this.brand + " " + this.product + " are " + (this.inStock ? "on sale!" : "not on sale.");
        },
        shipping() {
            if(this.premium) {
                return "Free";
            } else {
                return 2.99;
            }
        }
    },    
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        }
    },    
    template: `<div>
        <p>Shipping: {{shipping}}</p>
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText">
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p>{{sale}}</p>
                <product-details :details="details"></product-details>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
                <p v-else :class="{lineThrough: !inStock}">Out of Stock</p>
                <span v-show="onSale">On Sale</span>
                <div>
                    <div class="color-box"
                        v-for="(variant, index) in variants"
                        :key="variant.id"
                        :style="{backgroundColor: variant.color}"
                        @mouseover="updateProduct(index)"
                        >
                    </div>
                </div>
                <div>
                    <strong>Sizes:</strong>
                    <span v-for="size in sizes">{{size}} </span>
                </div>
                <div>
                    <button v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{disabledButton: !inStock}">
                        Add to cart
                    </button>
                </div>
                <div>
                    <button v-on:click="removeFromCart">Remove from cart</button>
                </div>
                <p><a :href="link" target="_blank">More products like this</a></p>
            </div>
        </div>
        <reviews :reviews="reviews" ></reviews>
        <product-review @review-submitted="addReview" ></product-review>
    </div>`,
});

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `<ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>`

});

Vue.component('product-review', {
    props: {},
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(!this.name) this.errors.push("Name required");
            if(!this.review) this.errors.push("Review required");
            if(!this.rating) this.errors.push("Rating required");

            if(!this.errors.length) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: Number(this.rating)
                }
                this.$emit('review-submitted', productReview);
                
                this.name = null;
                this.review = null;
                this.rating = null;
                this.errors = [];
            }
        }
    },
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s).</b>
                <ul>
                    <li v-for="error in errors">
                        {{error}}
                    </li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name" required>
            </p>

            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating" required>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit">  
            </p>    
        </form>
    `
});

Vue.component('reviews', {
    props: {
        reviews: {
            type: Array
        }
    },
    template: `
    <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
                <p>{{review.name}}</p>
                <p>Rating: {{review.rating}}</p>
                <p>{{review.review}}</p>
            </li>
        </ul>
    </div>
    `
});

var app = new Vue({
    el: '#app',
    methods: {
        addToCart(id) {
            if(!this.cart.hasOwnProperty(id)) {
                this.cart[id] = 0;
            }
            this.cart[id] += 1;
            this.cartItems += 1;
        },
        removeFromCart(id) {
            if(this.cart.hasOwnProperty(id) && this.cart[id]) {
                this.cart[id] -= 1;

                if(!this.cart[id]) {
                    delete this.cart[id];
                }

                this.cartItems -= 1;
            }
        }
    },
    data: {
        premium: true,
        cart: {},
        cartItems: 0
    }
});
