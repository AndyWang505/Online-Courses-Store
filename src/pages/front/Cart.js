import { useOutletContext } from "react-router-dom";

function Cart() {
  const { cartData } = useOutletContext();
  console.log(cartData);

  return (
    <div className="container max-w-7xl mx-auto mb-7 mt-5 p-6">
      <h2 className="text-4xl font-bold mb-6">購物車</h2>
      <div className="flex">
        <div className="w-2/3 p-3 bg-neutral-300">
          <ul>
            {cartData?.carts?.map((item) => {
              return (
                <li className="flex w-full mb-3" key={item.product.id}>
                  <a href="/" className="flex w-1/2">
                    <div>
                      <img src={item.product.imageUrl} className="w-full h-28 rounded-none" alt="..." />
                    </div>
                    <div><h3>{item.product.title}</h3></div>
                  </a>
                  <div className="flex w-1/2">
                    <div><p>NT$ {item.final_total}</p></div>
                    <div><button>刪除</button></div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="w-1/3">
          <h2>訂單明細</h2>
          <div>
            折扣
            <p>總計NT$ {cartData.final_total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;