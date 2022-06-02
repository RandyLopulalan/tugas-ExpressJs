const Product = require("./model");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

// GET index
const index = async (req, res) => {
  const { search } = req.query;
  let result;
  if (!search) {
    result = await Product.findAll();
  } else {
    result = await Product.findAll({
      where: { name: { [Op.substring]: [`${search}%`] } },
    });
  }
  try {
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};

// GET view id
const view = async (req, res) => {
  try {
    await Product.sync();
    const result = await Product.findAll({ where: { id: req.params.id } });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};

// POST
const store = async (req, res) => {
  const { users_id, name, price, stock, status, image_url } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    await Product.sync();
    const result = await Product.create({
      users_id,
      name,
      price,
      stock,
      status,
      image_url: `https//localhost:3000/public/${image.originalname}`,
    });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

// PUT
const update = async (req, res) => {
  const { users_id, name, price, stock, status, image_url } = req.body;
  const image = req.file;
  let result;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    result = await Product.update(
      {
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `https//localhost:3000/public/${image.originalname}`,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } else {
    result = await Product.update(
      { users_id, name, price, stock, status },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  }
  try {
    await Product.sync();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

// DELETE
const deleteData = async (req, res) => {
  try {
    await Product.sync();
    await Product.destroy({ where: { id: req.params.id } });
    res.send(`Success delete data product id: ${req.params.id}`);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = { index, view, store, update, deleteData };
