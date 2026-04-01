import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/${user._id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>📦 Your Orders</h2>

      <div className="grid">
        {orders.map((order) => (
          <div key={order._id} className="card">
            <h3>Order ID</h3>
            <p>{order._id}</p>
            <p>Status: <b>{order.status}</b></p>
            <p>Total: ₹{order.totalAmount}</p>

            <h4>Products:</h4>

            {order.products.map((p, index) => (
              <p key={index}>
                {p.productId.name} × {p.quantity}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;