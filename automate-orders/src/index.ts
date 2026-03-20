import axios from "axios";

const MARKET = "TATA/INR";
const USER_ID = "1";

let midPrice = 1000;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// simulate market movement
function updateMidPrice() {
  const drift = getRandom(-1, 1); // small movement
  midPrice = Math.max(900, Math.min(1100, midPrice + drift));
}

async function main() {
  try {
    updateMidPrice();

    const { data } = await axios.get(
      "http://localhost:3002/orders/open",
      {
        params: { market: MARKET, userId: USER_ID }
      }
    );

    const orders = data.orders;

    const bestBid = midPrice - 0.3;
    const bestAsk = midPrice + 0.3;

    // cancel far orders
    const cancelOrders = orders.filter((o: any) => {
      if (o.side === "buy") return o.price < bestBid - 5;
      if (o.side === "sell") return o.price > bestAsk + 5;
    });

    // 🚀 batch cancel
    await Promise.all(
      cancelOrders.map((order: any) =>
        axios.delete("http://localhost:3002/orders", {
          data: { orderId: order.orderId, market: MARKET }
        })
      )
    );

    // create new liquidity
    const newOrders = [];

    // 🟢 BUY ORDERS
    for (let i = 0; i < 10; i++) {
      newOrders.push({
        market: MARKET,
        price: (bestBid - i * 0.2 - getRandom(0, 0.1)).toFixed(2),
        quantity: getRandom(1, 10).toFixed(2),
        side: "buy",
        userId: USER_ID
      });
    }

    // 🔴 SELL ORDERS
    for (let i = 0; i < 10; i++) {
      newOrders.push({
        market: MARKET,
        price: (bestAsk + i * 0.2 + getRandom(0, 0.1)).toFixed(2),
        quantity: getRandom(1, 10).toFixed(2),
        side: "sell",
        userId: USER_ID
      });
    }

    // 🚀 batch place
    await Promise.all(
      newOrders.map((order) =>
        axios.post("http://localhost:3002/orders", order)
      )
    );

    console.log(
      `Market updated → mid: ${midPrice.toFixed(2)} | orders: ${newOrders.length}`
    );
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// run every 2 sec
setInterval(main, 3000);