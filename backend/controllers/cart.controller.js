import userModel from "../models/user.model.js";

async function addToCart(request, response) {
  try {
    const { userId, itemId, size } = request.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    response.status(200).json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
}

async function updateCart(request, response) {
  try {
    const { userId, itemId, size, quantity } = request.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });

    response.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
}

async function getUserCart(request, response) {
  try {
    const { userId } = request.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    response.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
}

export { addToCart, updateCart, getUserCart };
