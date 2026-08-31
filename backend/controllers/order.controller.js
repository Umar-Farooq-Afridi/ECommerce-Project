import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

const placeOrder = async (request, response) => {
  try {
    const { userId, items, amount, address } = request.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartDate: {} });

    response.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

const allOrders = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

const updateStatus = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

const userOrders = async (request, response) => {
  try {
    const { userId } = request.body;
    const orders = await orderModel.find({ userId });

    response.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, allOrders, updateStatus, userOrders };
