'use client';
import BuyAndSell from "@/components/buy-and-sell/buy-and-sell";
import Depth from "@/components/depth/depth";
import Klines from "@/components/klines/klines";
import { getMarketPriceAction } from "@/features/market/market.action";
import { AppDispatch, RootState } from "@/store/store";
import useWebSocket from "@/websocket/websocket";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const {messages, sendMessage} = useWebSocket('ws://localhost:3002');
        const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };


  useEffect(() => {
    dispatch(getMarketPriceAction(1))
  }, []);
  return (
   <>
   <div style={{display: 'flex', flexDirection: 'row'}}>
   <Klines/>
   <Depth/>
   <BuyAndSell/>

           <div>
            <h1>Real-time Chat</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>

   </div>
   </>
  );
}
