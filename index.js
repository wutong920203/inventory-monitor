const axios = require('axios');
const { email } = require("./test");

async function get(skus){
    for(let i=0; i<skus.length; i++) {
        const sku = skus[i];
    // skus.forEach((sku) => {
        axios
        .get(`https://redsky.target.com/redsky_aggregations/v1/web_platform/fiats_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&tcin=${sku}&nearby=43081-1685&radius=50&limit=20&include_only_available_stores=false&requested_quantity=1&preferred_stores=2487%2C2086`)
        // https://redsky.target.com/redsky_aggregations/v1/web_platform/product_fulfillment_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&tcin=${sku}&store_id=2487&zip=43081&state=OH&latitude=40.090&longitude=-82.850&scheduled_delivery_store_id=2487&required_store_id=2487&has_required_store_id=true
        .then(async (response) => {
            // returnArray = response.data;
            // const products = returnArray.products;
            // products.forEach((product) => {
            //     stock = product.stock;
            //     if(stock.stockLevelStatus !== "outOfStock") {
                    // email("Check Target site", `PS5 found on target site`);
            //     }
            // });
            // console.log(response.data);
            const basicData = response.data.data.fulfillment_fiats;
            const productId = basicData.product_id;
            const { locations } = basicData;
            let emailMessage = "";

            locations.forEach((location) => {
                const storeName = location.store_name;
                const instockNum = location.location_available_to_promise_quantity;
                // console.log(location.order_pickup.availability_status);
                if(location.order_pickup.availability_status === "IN_STOCK") {
                    emailMessage += `PS5(${productId}) found on ${storeName}, ${instockNum} in stock. <br>`
                }
            });
            // console.log(emailMessage);
            if(emailMessage !== "") {
                await email("Check Target site", emailMessage);
                // await notifier.notify({
                //     title: "PS5 Availability",
                //     message: "found",
                //     sound: "91404569.mp3",
                //     timeout: false,
                // });
                await console.log(emailMessage);
            } else {
                console.log("Not found;", sku);
                console.log(`Generated: ${new Date().toLocaleString()}\n`);
            }
            // console.log(response.data.data.fulfillment_fiats)
        })
        .catch((err) => {
            console.log(err.response.data.errors);
        });
    // });
    };

    // await console.log(`\nGenerated: ${new Date().toLocaleString()}`);
}

setInterval(() => {
    get([81114596]);
    // get([83374957])
}, 61100);
