import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({});
    res.json(product);
})

// @desc Fetch all products
// @route Get /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product Not Found')
    }
})


// @desc Delete a product
// @route Delete /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({message:"Product Removed Successfully"})
    } else {
        res.status(404);
        throw new Error('Product Not Found')
    }
})




export {
    getProducts,
    getProductById,
    deleteProduct
}