const Cart = require("../models/cart");
const Product = require("../models/product");

// Add item 
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id ;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    // Add item, with cart item's price snapshot
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      } else {
              cart.items.push({ product: productId, quantity, price: product.price });
      }

cart.totalPrice = calculateTotal(cart.items); // Use sync helper
await cart.save();


    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper
const calculateTotal = (items) => {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
};

