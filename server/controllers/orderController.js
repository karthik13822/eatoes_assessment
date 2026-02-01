const Order = require("../models/order");

// GET ALL
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuItem");

    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE
exports.createOrder = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    const order = new Order({
      ...req.body,
      orderNumber: "ORD-" + (orderCount + 1),
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};
