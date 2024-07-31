import { create } from "zustand";
// import { Product } from "@prisma/client";

interface CartProduct {
  id: string;
  title: string;
  price: string;
  quantity: number;
  [key: string]: any;
}

interface CartStoreProps {
  cart: CartProduct[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStoreProps>((set) => ({
  cart: [],
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
  updateCartItem: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
