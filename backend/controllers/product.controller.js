import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";

async function addProduct(request, response) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = request.body;

    const image1 = request.files.image1 && request.files.image1[0];
    const image2 = request.files.image2 && request.files.image2[0];
    const image3 = request.files.image3 && request.files.image3[0];
    const image4 = request.files.image4 && request.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    response
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
}

async function listProducts(request, response) {
  try {
    const products = await productModel.find({});
    if (!products) {
      return response
        .status(404)
        .json({ success: false, message: "Products not found" });
    }

    response.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
}

async function removeProduct(request, response) {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(
      request.body.id,
    );
    if (!deletedProduct) {
      return response
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    response.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function singleProduct(request, response) {
  try {
    const { productId } = request.body;
    const product = await productModel.findById(productId);

    if (!product) {
      return response
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    response.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
}

export { addProduct, listProducts, removeProduct, singleProduct };
