var app = new Vue({
    el: '#app',
    data: {
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
    }
});