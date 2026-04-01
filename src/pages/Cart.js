import { useEffect, useState } from "react";
import axios from "axios";

function Cart({ setPage }) {

  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch cart items
  const fetchCart = () => {
    axios.get(`http://localhost:5000/api/cart/${user._id}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove item
  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      alert("Item removed");
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>🛒 Your Cart</h2>

      {/* CART ITEMS */}
      <div className="grid">
        {cart.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.productId.name}</h3>
            <p>₹{item.productId.price}</p>
            <p>Qty: {item.quantity}</p>

            <button className="button" onClick={() => removeItem(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* CHECKOUT BUTTON */}
      {cart.length > 0 && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button
            className="button"
            onClick={() => setPage("address")}
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;