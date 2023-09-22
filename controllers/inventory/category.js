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
    },

deleteCategoryForId: async (req, res) => {
        try {
        const { id } = req.params;
    
          // Verificar si la categoría existe antes de intentar eliminarla
        const category = await Category.findById(id);
    
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
    
          // Eliminar la categoría
        await Category.deleteOne({ _id: id });
    
        return res.json({ msg: 'Category deleted' });
        } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = categoryController