var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: "A pair of warm, fuzzy socks",
        image: "./assets/vmSocks-green.png",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: false,
        inventory: 0,
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
                image: "./assets/vmSocks-green.png"
            },
            {
                id: 2235,
                color: "blue",
                image: "./assets/vmSocks-blue.png"
            }
        ],
        sizes: [37, 39, 40, 44],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            this.cart = this.cart - 1 >= 0 ? this.cart - 1 : 0;
        },
        updateProduct(image) {
            this.image = image;
        }
    }
});