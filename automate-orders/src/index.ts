import axios from "axios";

async function main() {
    const orders = await axios.get('http://localhost:8080/orders/open', {
        params: {
            market: 'TATA/INR',
            userId: '1'
        }
    })

    const price = Math.random()*1000;

    const cancelBuyOrders = orders.data.filter(order=> {
        return order.side === 'buy' && order.price < price
    })

    const cancelSellOrders = orders.data.filter(order=> {
        return order.side === 'sell' && order.price > price
    })

    for(let order of cancelBuyOrders) {
        await axios.delete('http://localhost:8080/orders', {
            data: {
                orderId: order.orderId,
                market: 'TATA/INR'
            }
        })
    }

    for(let order of cancelSellOrders) {
        await axios.delete('http://localhost:8080/orders', {
            data: {
                orderId: order.orderId,
                market: 'TATA/INR'
            }
        })
    }

    for(let i=0;i< cancelBuyOrders.length;i++) {
        await axios.post('http://localhost:8080/orders', {
            market: 'TATA/INR',
            price: (price - Math.random()*10).toFixed(2),
            quantity: (Math.random()*10).toFixed(2),
            side: 'buy',
            userId: '1'
        });
    }

    for(let i=0;i< cancelSellOrders.length;i++) {
        await axios.post('http://localhost:8080/orders', {
            market: 'TATA/INR',
            price: (price + Math.random()*10).toFixed(2),
            quantity: (Math.random()*10).toFixed(2),
            side: 'sell',
            userId: '1'
        });
    }       
}

main(); // run immediately

setInterval(() => {
    main();
}, 3000);