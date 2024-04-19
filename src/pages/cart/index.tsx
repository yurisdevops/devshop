import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto ">
        <h1 className="font-medium text-3xl mb-10 text-center my-4 ">
          Minhas Compras
        </h1>

        {cart.length === 0 && (
          <div className="w-full flex items-center flex-col justify-center ">
            <h2 className="font-sans text-2xl font-medium">
              Não existem items no seu carrinho
            </h2>
            <Link
              className="bg-slate-600 p-1 px-3 rounded-md my-3 text-white font-bold"
              to="/"
            >
              Acessar Loja
            </Link>
          </div>
        )}

        {cart.map((cart) => (
          <section
            key={cart.id}
            className="flex items-center justify-between border-b-2 mb-5 border-gray-300 flex-col gap-2 lg:flex-row"
          >
            <img
              className="w-20 mb-2 md:float-left"
              src={cart.image}
              alt={cart.description}
            />
            <span className="w-7/12 flex text-center justify-center font-medium text-1">
              {" "}
              {cart.title}
            </span>
            <strong>
              {cart.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
            <div className="flex items-center justify-center gap-3 ">
              <button
                onClick={() => removeItemCart(cart)}
                className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
              >
                -
              </button>
              {cart.amount}
              <button
                onClick={() => addItemCart(cart)}
                className="bg-slate-600 px-2  rounded text-white font-medium flex items-center justify-center"
              >
                +
              </button>
            </div>

            <strong className="float-right md: mb-2">
              SubTotal:{" "}
              {cart.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </section>
        ))}
        {cart.length !== 0 && (
          <p className="font-bold text-lg float-right mt-4 p-2">Total: {total}</p>
        )}
      </div>
    </>
  );
}
