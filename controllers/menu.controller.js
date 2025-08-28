import MenuItem from "../models/MenuItem.js";

export async function listMenu(req, res) {
  try {
    const items = await MenuItem.find({ inStock: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
