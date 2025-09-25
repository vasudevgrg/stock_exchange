import React from "react";

const BuyAndSell = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          height: "100vh",
          padding: "20px",
          backgroundColor: "#333131",
          color: "white",
        }}
      >
        <p>
          <button
            style={{
              backgroundColor: "lightgreen",
              color: "green",
              border: "none",
              fontSize: "16px",
              padding: "20px",
              width: "50%",
            }}
          >
            Buy/Long
          </button>
          <button
            style={{
              backgroundColor: "grey",
              color: "white",
              border: "none",
              fontSize: "16px",
              padding: "20px",
              width: "50%",
            }}
          >
            Sell/Short
          </button>
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p>Available Equity</p>
          <p>$0.00</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Price</p>
          <input
            style={{ backgroundColor: "grey", height: "40px", border: "none" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Quantity</p>
          <input
            style={{ backgroundColor: "grey", height: "40px", border: "none" }}
          />

          <input type="range" min="1" max={100} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Order Value</p>
          <input
            style={{ backgroundColor: "grey", height: "40px", border: "none" }}
          />
        </div>

        <button>
          Place Order
        </button>
      </div>
    </>
  );
};

export default BuyAndSell;
