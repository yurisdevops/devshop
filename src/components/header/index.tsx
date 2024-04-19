import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";

import { CartContext } from "../../contexts/CartContext";

export function Header() {
  const { cartAmount } = useContext(CartContext);

  return (
    <>
      <header className="w-full px-1 bg-slate-200">
        <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
          <Link to="/" className="font-bold flex text-2xl ">
            Dev
            <p className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Shop
            </p>
          </Link>

          <Link to="/cart" className="relative">
            <FiShoppingCart size={24} color="#121212" />
            {cartAmount > 0 && (
              <span className="absolute -top-3 -right-4 bg-blue-500 text-white px-2  rounded-full">
                {cartAmount}
              </span>
            )}
          </Link>
        </nav>
      </header>
    </>
  );
}
