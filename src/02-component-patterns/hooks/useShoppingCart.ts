import { useState } from "react";
import { ProductInCart, onChangeArgs } from "../interfaces/interfaces";

export const useShoppingCart = () => {
    const [shoppingCart, setShoppingCart] = useState<{
        [key: string]: ProductInCart;
    }>({});

    const onProductCountChange = ({ count, product }: onChangeArgs) => {
        setShoppingCart((oldShoppingCart) => {
            //cuando shopping cart llega a 0, el producto que me llega, lo borro del cart y mantengo el que esté
            // if (count === 0) {
            //   const { [product.id]: toDelete, ...rest } = oldShoppingCart
            //   return rest
            // }
            // return {
            //   ...oldShoppingCart,
            //   [product.id]: { ...product, count }
            // }

            //lo de abajo es para tipo, que el productincart tenga el control del carrito
            //solo él
            const productInCart: ProductInCart = oldShoppingCart[product.id] || { ...product, count: 0 }

            if (Math.max(productInCart.count + count, 0) > 0) {
                productInCart.count += count
                return {
                    ...oldShoppingCart,
                    [product.id]: productInCart
                }
            }

            const { [product.id]: toDelete, ...rest } = oldShoppingCart
            return rest


        })
    }

    return {
        onProductCountChange,
        shoppingCart
    }
}