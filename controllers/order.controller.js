import Order from "../models/Order.js";

export async function createOrder(req, res) {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "No items" });
    const total = items.reduce((sum, it) => sum + (it.price * it.qty), 0);
    const order = await Order.create({
      user: req.user.id,
      items: items.map(i => ({ menuItem: i._id, name: i.name, price: i.price, qty: i.qty })),
      total
    });
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function myOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function allOrders(req, res) {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["pending", "preparing", "ready", "completed", "cancelled"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
