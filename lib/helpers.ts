import { CartProduct } from "@/hooks/use-cart-store";

export const calculateWeight = (cart: CartProduct[]) => {
  return cart.reduce((totalWeight, product) => {
    const weight = Number(product.weight);
    const quantity = product.quantity;

    return totalWeight + weight * quantity;
  }, 0);
};
