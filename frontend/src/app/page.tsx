import BuyAndSell from "@/components/buy-and-sell/buy-and-sell";
import Depth from "@/components/depth/depth";
import Klines from "@/components/klines/klines";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <div style={{display: 'flex', flexDirection: 'row', maxWidth: '70vw'}}>
   <Klines/>
   <Depth/>
   <BuyAndSell/>
   </div>
   </>
  );
}
