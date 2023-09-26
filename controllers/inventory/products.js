const Products = require('../../models/inventory/products')
const Category = require('../../models/inventory/category')


const productsController = {
    createProducts: async (req, res) => {
      try {
        const { category, ...productData } = req.body;
        let categoryFound;
    
        if (category) {
          categoryFound = await Category.findOne({ filter: category }); // Utiliza "filter" en la búsqueda
          console.log('Category:', category);
          console.log('Category Found:', categoryFound);
    
          if (!categoryFound) {
            return res.status(400).json({ error: 'Category not found', categoryValue: category });
          }
        }
    
        const product = await Products.create({
          ...productData,
          category: categoryFound ? categoryFound._id : undefined,
        });
    
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
    
    
    

    getProducts: async (req,res) => {
        try {
            const products = await Products.find({}).populate('category', 'filter')
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({msg:error.message})
          }
    },
          

    getProductsById: async (req,res) => {
        try {
              const {id} = req.params
              const product = await Products.findById(id).populate('category', 'filter')

              if (!product) {
                return res.status(404).json({ error: 'Product not found' });
              }
              return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({msg:error.message})
            }
    },
              
    updateProductsById: async (req, res) => {
      try {
        const { id } = req.params;
        const { category, ...updatedData } = req.body;
        let updatedProduct;
    
        if (category) {
          // Verificar si se proporciona una categoría
          const categoryFound = await Category.findOne({ $or: [{ name: category }, { _id: category }] });
    
          if (!categoryFound) {
            return res.status(400).json({ error: 'Category not found' });
          }
    
          updatedProduct = await Products.findByIdAndUpdate(
            id,
            { ...updatedData, category: categoryFound._id },
            { new: true }
          );
        } else {
          // Si no se proporciona una categoría, actualiza los otros campos
          updatedProduct = await Products.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
          );
        }
    
        if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        return res.status(200).json(updatedProduct);
      } catch (error) {
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
