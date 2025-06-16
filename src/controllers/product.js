const Product = require('../models/product');
const Category = require('../models/category');

exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        as: 'category'
      }]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'category'
      }]
    });
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.create({ name, description, price, stock, categoryId });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.update({ name, description, price, stock, categoryId });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

