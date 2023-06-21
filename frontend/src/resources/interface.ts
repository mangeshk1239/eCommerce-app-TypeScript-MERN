export interface ICartItem {
    product_id: number,
    product_name: string,
    product_price: number,
    product_quantity: number,
    product_image: string
}

export interface ICheckoutAddress {
    first_name: string,
    last_name: string,
    first_address: string,
    last_address: string,
    city: string,
    state: string,
    zip_code: string,
    country: string
}

export interface ICheckoutPayment {
    card_name: string,
    card_number: string,
    card_expiry: string,
    card_cvv: string
}

export interface ICart {
    CART: ICartItem[],
    CHECKOUT_ADDRESS: ICheckoutAddress,
    CHECKOUT_PAYMENT: ICheckoutPayment
}

export interface IAction {
    CART: string,
    CHECKOUT_ADDRESS: ICheckoutAddress,
    CHECKOUT_PAYMENT: ICheckoutPayment,
    RESET: string
}

export interface IProduct {
    brand: string,
    category: string,
    description: string,
    discountPercentage: number,
    id: number,
    images: string[],
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    title: string,
}

export interface IOrder {
    orderID: string,
    orderTotal: number | undefined,
    email: string,
    createdAt: Date,
    lineItems: ICartItem[]
}