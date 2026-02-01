const MenuItem = require("../models/MenuItem");

// GET ALL
exports.getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.json(menu);
  } catch (err) {
    console.log("GET MENU ERROR:", err);

    res.status(500).json({
      message: err.message,
      error: err
    });
  }
};


// CREATE
exports.createMenu = async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json(err);
  }
};

// DELETE
exports.deleteMenu = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// TOGGLE
exports.toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

// SEARCH
exports.searchMenu = async (req, res) => {
  try {
    const q = req.query.q;

    const results = await MenuItem.find({
      $text: { $search: q },
    });

    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};
