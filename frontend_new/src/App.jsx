import { useState } from "react";
import "./App.css";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Address from "./pages/Address.jsx";
import Payment from "./pages/Payment.jsx";
import Orders from "./pages/Orders.jsx";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("login");

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setPage("login");
  };

  // 🔐 AUTH PAGES
  if (!isLoggedIn) {
    return (
      <div>
        {page === "login" && (
          <Login setIsLoggedIn={setIsLoggedIn} setPage={setPage} />
        )}

        {page === "register" && (
          <Register setPage={setPage} />
        )}
      </div>
    );
  }

  // 🧭 MAIN APP
  return (
    <div>

      {/* NAVBAR */}
      <div className="navbar">
        <h2>🌸 FarmKart</h2>

        <input placeholder="Search products..." />

        <div>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>Cart</button>
          <button onClick={() => setPage("orders")}>Orders</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* PAGES */}
      {page === "products" && <Products />}
      {page === "cart" && <Cart setPage={setPage} />}
      {page === "address" && <Address setPage={setPage} />}
      {page === "payment" && <Payment setPage={setPage} />}
      {page === "orders" && <Orders />}

    </div>
  );
}

export default App;