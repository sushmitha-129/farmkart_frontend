import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("products");

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div>

      {/* NAVBAR */}
      <div className="navbar">
        <h2>🌸 FarmKart</h2>

        <input placeholder="Search products..." />

        <div>
          <button className="nav-btn" onClick={() => setPage("products")}>Products</button>
          <button className="nav-btn" onClick={() => setPage("cart")}>Cart</button>
          <button className="nav-btn" onClick={() => setPage("orders")}>Orders</button>
          <button className="nav-btn" onClick={logout}>Logout</button>
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