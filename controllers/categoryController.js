import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    req.status(500).send({
      success: false,
      error,
      message: "Error in updating category",
    });
  }
};

export const getAllCategories = async (req, res) => {
  const allCategories = await categoryModel.find({});
  res.status(200).send({
    success: true,
    message: "Categories List",
    allCategories,
  });
  try {
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching categories",
      error,
    });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({slug});
    if(category){
      res.status(200).send({
        success:true,
        message: "Category Detail",
        category
      });
    }else{
      res.status(404).send({
        success: false,
        message:"Category not found"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error fetching category",
      error
    })
  }
};

export const deleteCategory = async (req, res)=>{
  try {
    const {id} = req.params;
    const deleteCategory = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      message: "Error in deleting category",
      error

    })  
  }
}
