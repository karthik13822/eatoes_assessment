import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Main Course");
  const [search, setSearch] = useState("");

  //Fetch Menu
  const fetchMenu = async () => {
    const res = await axios.get(`${API}/menu`);
    setMenu(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  //Add Item
  const addItem = async () => {
    await axios.post(`${API}/menu`, {
      name,
      price,
      category,
    });

    setName("");
    setPrice("");
    fetchMenu();
  };

  //Toggle
  const toggle = async (id) => {
    await axios.patch(`${API}/menu/${id}/availability`);
    fetchMenu();
  };

  //Search
  const searchMenu = useCallback(async (q) => {
    if (!q) {
      fetchMenu();
      return;
    }

    const res = await axios.get(`${API}/menu/search?q=${q}`);
    setMenu(res.data);
  },[search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMenu(search);
    }, [searchMenu]);

    return () => clearTimeout(timer);
  }, [search]);

  return (
  <div>

    <h2>Menu Management</h2>

    <div className="form-row">

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Main Course</option>
        <option>Appetizer</option>
        <option>Dessert</option>
        <option>Beverage</option>
      </select>

      <button onClick={addItem}>Add</button>

    </div>

    <input
      className="search-box"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="menu-grid">

      {menu.map((item) => (

        <div key={item._id} className="menu-card">

          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <p>{item.category}</p>

          <p
            className={
              item.isAvailable
                ? "available"
                : "unavailable"
            }
          >
            {item.isAvailable ? "Available" : "Not Available"}
          </p>

          <button onClick={() => toggle(item._id)}>
            Toggle
          </button>

        </div>
      ))}

    </div>

  </div>
);
}
