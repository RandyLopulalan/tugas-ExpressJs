const Product = require('./model')
const path = require('path')
const fs = require('fs')

const store = async (req,res) => {
    const {users_id, name, price, stock, status, image_url} = req.body
    const image = req.file
    if (image) {
        const target = path.join(__dirname, "../../uploads", image.originalname);
        fs.renameSync(image.path, target);
    }
    try{
        await Product.sync();
        const result = await Product.create({users_id, name, price, stock, status, image_url: `https//localhost:3000/public/${image.originalname}`})
        res.send(result)
    } catch (err) {
        res.send(err)
    }
}

module.exports = {store}