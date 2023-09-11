const Category = require('../../models/inventory/category');


//Create

const categoryController = {

    createCategory: async (req, res) => {
        try {
            const {filter, availability} = req.body

            const category = new Category({
                filter,
                availability
            });
            await category.save();

            res.status(201).json(category)
        }catch(error){
            res.status(500).json({ error: 'Error al crear la categoría' });
        }
    },

    getCategory: async (req, res) => {
        try {
            const categorys = await Category.find({})
            return res.status(200).json(categorys)
        }catch(error){
            return res.status(500).json({msg:error.message})
        }
    },

    getCategoryForId: async (req, res) => {
        try {
            const {id} = req.params
            const categorys = await Category.findById(id)

            if (!categorys) {
                return res.status(404).json({error:  'Category not found'})
            }
            return res.status(200).json(categorys)
        } catch(error){
            return res.status(500).json({msg:error.message})
        }
    }


}

module.exports = categoryController