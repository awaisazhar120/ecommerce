import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product saved successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in saving product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
      message: "Product List",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching products",
      error,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById({ _id: req.params.id })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product Detail",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching products",
      error,
    });
  }
};

export const getProductPhoto = async (req, res) => {
  try {
    const product_id = req.params.pid;
    const productPhoto = await productModel.findById(product_id).select("photo");
    if(productPhoto.photo.data){
      res.set("Content-type", productPhoto.photo.contentType);
      return res.status(200).send(productPhoto.photo.data);
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching products",
      error,
    });
  }
}; 

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const productListWithPagination = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.id ? req.params.id : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Products List",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
