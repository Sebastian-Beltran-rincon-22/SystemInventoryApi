const Products = require('../../models/inventory/products')
const Category = require('../../models/inventory/category')


const productsController = {
    //Create
    createProducts: async (req, res) => {
      try {
        const { filter, ...productData } = req.body;
        const categoryFound = await Category.findOne({ name:  filter});
  
  
        if (!categoryFound) {
          return res.status(400).json({ error: 'Category not found' });
        }
  
        const product = await Products.create({
          ...productData,
          category: categoryFound._id,
        });
  
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    getProducts: async (req,res) => {
        try {
            const products = await Products.find({})
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({msg:error.message})
          }
    },
          

    getProductsById: async (req,res) => {
        try {
              const {id} = req.params
              const product = await Products.findById(id)

              if (!product) {
                return res.status(404).json({ error: 'Product not found' });
              }
              return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({msg:error.message})
            }
    },
              
    updateProductsById: async (req, res) => {
        try{
            const {id} = req.params;
            const { filter, ...updatedData } = req.body;
            const categoryFound = await Category.findOne({ name: filter });
        
            if (!categoryFound) {
                return res.status(400).json({ error: 'Category not found' });
              }

        const updatedProduct = await Products.findByIdAndUpdate(
            id,
                { ...updatedData, category: categoryFound._id },
                { new: true }
              );

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

        return res.status(200).json(updatedProduct);
        }
        
        catch (error) {
            return res.status(500).json({ error: error.message });
    }
    },


    deleteProductsById: async (req, res) => {
        try {
            const {id} = req.params
            await Products.findByIdAndDelete(id)
            res.json({msg:'Deleted'})
        } catch (err) {
            console.error(err)
            return res.status(500).json({msg:err.message})
        }
      }

  };


module.exports = productsController
