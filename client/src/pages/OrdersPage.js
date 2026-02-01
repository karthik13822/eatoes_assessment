import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get(`${API}/orders`);
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/orders/${id}/status`, {
      status,
    });

    fetchOrders();
  };

  return (
  <div>

    <h2>Orders Dashboard</h2>

    {orders.map((order) => (

      <div key={order._id} className="order-card">

        <h3>{order.orderNumber}</h3>

        <p>Customer: {order.customerName || "N/A"}</p>
        <p>Total: ₹{order.totalAmount || 0}</p>

        <p
          className={
            order.status === "Delivered"
              ? "status-delivered"
              : order.status === "Cancelled"
              ? "status-cancelled"
              : "status-pending"
          }
        >
          {order.status}
        </p>

        <select
          value={order.status}
          onChange={(e) =>
            updateStatus(order._id, e.target.value)
          }
        >
          <option>Pending</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

      </div>
    ))}

  </div>
);
}
