import { OrderSide } from "../trade/orderbook"

export  const CREATE_ORDER ='create_order'
export const CANCEL_ORDER= 'cancel_order'
export const GET_OPEN_ORDERS = 'get_open_orders'

export type CreateOrder = {
    type: typeof CREATE_ORDER,
    data: {
        market: string,
        price: string,
        quantity: string,
        side: OrderSide,
        userId: string
    }
}

export type CancelOrder = {
    type: typeof CANCEL_ORDER,
    data: {
        orderId: number,
        market: string
    }
}

export type GetOpenOrders = {
    type: typeof GET_OPEN_ORDERS,
    data: {
        market: string,
        userId: string
    }
}

export type fromApi = CreateOrder | CancelOrder | GetOpenOrders