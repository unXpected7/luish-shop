const path = require('path');
const fs = require('fs');
const config = require('../config');
const Product = require('./model');
const Category = require('../category/model');
const Tag = require('../tag/model');

const store = async (req, res, next) => {
    try{
        let payload = req.body;
        // update related category
        if(payload.category) {
            let category =
                await Category.findOne({name: {$regex: payload.category, $options: 'i'}});
            if(category) {
                payload = {...payload, category: category._id};
            } else {
                delete payload.category;
            }
        }

        if(payload.tags && payload.tags.length > 0) {
            let tags =
                await Tag.find({ name: {$in: payload.tag} });
            if(tags.length) {
                payload = {...payload, tags: tags.map(tag => tag._id)};
            
            } else {
                delete payload.tags;
                }
            };



        if(req.file) {
            let tmp_path = req.file.path; //? temporary path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]; //? extension file
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`); //? path uplaod
            //? 4 lines over configure file

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            
            src.on('end', async () => {
                try{

                    let product = new Product({...payload, image_url: filename})
                    await product.save()
                    return res.json(product);
                } catch(err){
                    fs.unlinkSync(target_path); //? hapus file
                    if(err && err.name === 'ValidationError'){ //? 'ValidationError dari model validation'
                        return res.json({
                            error: 1,
                            message: err.message, //? error daro catch
                            fields: err.errors //? error dari fields
                        })
                    }
                    next(err);
                }
                
            });
            src.on('error', async() => {
                next(err);
            });

        } else {
            let product = new Product(payload);
            await product.save();
            return res.json(product);
        }
    } catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}
const update = async (req, res, next) => {
    try{
        let payload = req.body;
        let { id } = req.params;

        if(payload.category) {
            let category =
                await Category.findOne({name: {$regex: payload.category, $options: 'i'}}); // ignore Uppercase and LowerCase
            if(category) {
                payload = {...payload, category: category._id};
            } else {
                delete payload.category;
            }
        }
        if(payload.tags && payload.tags.length > 0) {
            let tags =
                await Tag.find({ name: {$in: payload.tag} });
            if(tags.length) {
                payload = {...payload, tags: tags.map(tag => tag._id)};
            
            } else {
                delete payload.tags;
                }
            };


        if(req.file) {
            let tmp_path = req.file.path; //? temporary path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]; //? extension file
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`); //? path uplaod
            //? 4 lines over configure file

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            
            src.on('end', async () => {
                try{

                    let product = await Product.findById(id);
                    let currentImage = `${config.rootPath}/public/images/products/${product.iamge_url}`

                    console.log(currentImage); 
                    if(fs.existSync(currentImage)) {
                        fs.inlinkSync(currentImage);
                    }
                    product = await Product.findByIdAndUpdate(id, payload, {
                        new: true, //? uploading new data
                        runValidators: true
                    });
                    return res.json(product);
                } catch(err){
                    fs.unlinkSync(target_path); //? hapus file
                    if(err && err.name === 'ValidationError'){ //? 'ValidationError dari model validation'
                        return res.json({
                            error: 1,
                            message: err.message, //? error daro catch
                            fields: err.errors //? error dari fields
                        })
                    }
                    next(err);
                }
                
            });
            src.on('error', async() => {
                next(err);
            });

        } else {
            let product = await Product.findByIdAndUpdate(id, payload, {
                new: true, //? uploading new data
                runValidators: true
            });
            return res.json(product);
        }
    } catch(err){
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const index = async (req, res, next) => {
    try{
        let { skip = 0, limit = 10, q = '', category = '', tags = []} = req.query; //? FILTER
        let criteria = {};
        if(q.length) {
            criteria = {
               ...criteria,
               name: {$regex: q, $options: 'i'}
            }
        }
        if(category.length) {
           let  categoryResult = await Category.findOne({name: {$regex: `${category}`, $options: 'i'}});
            if(categoryResult) {
                criteria = {
                    ...criteria,
                    category: categoryResult._id
                }
            }
        }

        if(tags.length){
        let tagResult = await Tag.find({name: {$in: tags}});
           if(tagResult.length) {
                criteria = {
                    ...criteria,
                    tags: {$in: tagResult.map(tag => tag._id)}
                }
            
            }
            criteria = {...criteria, tags: {$in: tagResult.map(tag => tag._id)}}
        }
        let count = await Product.find().countDocuments(criteria); //? count
        let product = await Product
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit)) //? PAGINATION
        .populate('category')
        .populate('tags'); //? insert in postman
        return res.json({
            data: product,
            count: count
        });
    } catch(err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        let product = await Product.findOneAndDelete( req.params.id);

        let currentImage = `${config.rootPath}public/images/products/${product.image_url}`;

        if(fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage)
        }

        return res.json(product);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    store,
    index,
    update,
    destroy
}