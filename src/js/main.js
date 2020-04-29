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
                    quantity: 0,
                }
            ],
            sizes: [37, 39, 40, 44],
            cart: 0,
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
            this.cart += 1;
        },
        removeFromCart() {
            this.cart = this.cart - 1 >= 0 ? this.cart - 1 : 0;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },    
    template: `<div>
        <p>Shipping: {{shipping}}</p>
        <div class="cart">
            <span>Cart({{cart}})</span>
        </div>
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

})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
});
