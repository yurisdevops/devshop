import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
}

interface CartProps {
  id: number;
  title: string;
  price: number;
  description: string;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  function addItemCart(newItems: ProductProps) {
    const indexItem = cart.findIndex((item) => item.id === newItems.id);

    if (indexItem !== -1) {
      let cartList = cart;
      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList);
      totalResultCart(cartList);
      return;
    }
    let data = {
      ...newItems,
      amount: 1,
      total: newItems.price,
    };

    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);
    if (cart[indexItem]?.amount > 1) {
      let cartList = cart;
      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
  }

  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acumulador, objeto) => {
      return acumulador + objeto.total;
    }, 0);
    const resultFormat = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(resultFormat);
  }

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          cartAmount: cart.length,
          addItemCart,
          removeItemCart,
          total,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

export default CartProvider;
