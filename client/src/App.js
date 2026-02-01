import "./styles.css";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("menu");

  return (
    <div className="container">

      <div className="header">
        <h1>Restaurant Admin Dashboard</h1>
      </div>

      <div className="nav">

        <button
          className={page === "menu" ? "active" : ""}
          onClick={() => setPage("menu")}
        >
          Menu
        </button>

        <button
          className={page === "orders" ? "active" : ""}
          onClick={() => setPage("orders")}
        >
          Orders
        </button>

      </div>

      {page === "menu" && <MenuPage />}
      {page === "orders" && <OrdersPage />}

    </div>
  );
}

export default App;
