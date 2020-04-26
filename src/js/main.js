var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: "A pair of warm, fuzzy socks",
        image: "./assets/vmSocks-green.png",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: true,
        inventory: 100,
        onSale: true,
        details: [
            "80% cotton",
            "20% polyester",
            "Gender-neutral"
        ],
        variants: [
            {
                id: 2234,
                color: "green"
            },
            {
                id: 2235,
                color: "blue"
            }
        ],
        sizes: [37, 39, 40, 44]
    }
});