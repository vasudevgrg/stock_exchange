import { OrderSide } from "../trade/orderbook"

export  const CREATE_ORDER ='CREATE_ORDER'

export type fromApi = {
    type: typeof CREATE_ORDER,
    data: {
        market: string,
        price: string,
        quantity: string,
        side: OrderSide,
        userId: string
    }
}