const Cart = require("../models/cart");

const addToCart = async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Nếu chưa có cart thì tạo mới
      cart = new Cart({
        userId,
        items: [{ food: foodId, quantity }],
      });
    } else {
      // Kiểm tra món ăn đã có trong giỏ chưa
      const existingItem = cart.items.find(
        (item) => item.food.toString() === foodId
      );

      if (existingItem) {
        existingItem.quantity += quantity; // tăng số lượng
      } else {
        cart.items.push({ food: foodId, quantity }); // thêm món mới
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: "Đã thêm vào giỏ hàng", cart });
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.food");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Giỏ hàng trống" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

module.exports = {
  addToCart,
  getCartByUserId,
};
