import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart", {
        userId: user._id,
        productId: productId,
        quantity: 1
      });

      alert("Added to cart");
    } catch (error) {
      console.log(error);
      alert("Error adding to cart");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        🌾 Fresh Farm Products
      </h2>

      <div className="grid">
        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="card">

              <img
                src="https://via.placeholder.com/150"
                alt="product"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              <h3 style={{ margin: "10px 0" }}>{p.name}</h3>

              <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

              <p style={{ color: "gray" }}>
                Stock: {p.quantity}
              </p>

              <button
                className="button"
                onClick={() => addToCart(p._id)}
              >
                Add to Cart
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;