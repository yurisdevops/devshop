import { BsCartPlus } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface ProductProps {
  image: string | undefined;
  id: number;
  title: string;
  price: number;
  description: string;
  cover: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const { addItemCart } = useContext(CartContext);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);

  function handleAddCartItem(product: ProductProps) {
    toast.success("Produto adicionado ao carrinho", {
      style: {
        background: "#28a745",
        color: "#fff",
        borderRadius: 10,
        fontWeight: "bold",
      },
    });

    addItemCart(product);
  }
  console.log(products);

  return (
    <>
      <div>
        <main className="w-full max-w-7xl px-4 mx-auto ">
          <h1 className="font-bold text-2xl mb-10 mt-10 text-center">
            Produtos em alta
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols lg:grid-cols-5">
            {products.map((product) => (
              <section
                className="w-full justify-center items-center flex flex-col text-center "
                key={product.id}
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    className="w-28 rounded-lg mb-2 hover:scale-105 transition-all "
                    src={product.image}
                    alt={product.description}
                  />
                </Link>
                <p className="font-medium mt-5 mb-2">{product.title}</p>
                <div className="flex gap-3 items-center mb-2">
                  <strong className="text-zinc-700/90 ">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                  <button
                    onClick={() => handleAddCartItem(product)}
                    className="bg-zinc-900 p-1 rounded"
                  >
                    {" "}
                    <BsCartPlus size={20} color="#fff" />
                  </button>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
