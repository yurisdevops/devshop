import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useEffect, useState, useContext } from "react";
import { ProductProps } from "../home";
import { CartContext } from "../../contexts/CartContext";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";

export function Product() {
  const { id } = useParams();
  const [detailItem, setDetailItem] = useState<ProductProps>();
  const { addItemCart } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function getDetailsItems() {
      const response = await api.get(`products/${id}`);
      setDetailItem(response.data);
    }
    getDetailsItems();
  }, [id]);

  function handleAddItemCart(product: ProductProps) {
    toast.success("Produto adicionado ao carrinho", {
      style: {
        background: "#28a745",
        color: "#fff",
        borderRadius: 10,
        fontWeight: "bold",
      },
    });

    addItemCart(product);
    navigate("/cart");
  }
  return (
    <>
      <div>
        <main className="flex items-center justify-center">
          {detailItem && (
            <section className="w-full">
              <div className="flex flex-col lg:flex-row">
                <img
                  className="flex-1 w-full max-h-72 p-4 object-contain"
                  src={detailItem?.image}
                  alt={detailItem?.title}
                />

                <div className="flex-1 p-3">
                  <p className="font-bold text-2xl mt-4 mb-2 ">
                    {detailItem?.title}
                  </p>
                  <p className="my-4 max-w-screen-sm">{detailItem?.description}</p>
                  <div className="flex flex-col">
                    <strong>Avaliação: {detailItem.rating.rate}</strong>
                    <div className="flex mt-2">
                      <strong className="text-zinc-700/90 text-xl">
                        {detailItem.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </strong>
                      <button
                        className="bg-zinc-900 p-1 rounded ml-3 w-7"
                        onClick={() => handleAddItemCart(detailItem)}
                      >
                        <BsCartPlus size={20} color="#FFF" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
