const Product = require("../models/Product");
const Category = require("../models/Category");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory.js");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/APIFeatures.js");

const multer = require("multer");

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid image type");
        if (isValid) uploadError = null;
        cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-");
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

exports.uploadProductImages = uploadOptions.fields([
    {
        name: "image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 8,
    },
]);

exports.getProducts = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);
exports.updateProduct = factory.UpdateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.getProductsByCategory = catchAsync(async (req, res, next) => {
    let products = new APIFeatures(Product.find({ category: req.params.id }), req.query)
        .filter()
        .sort()
        .limitfields()
        .paginate();
    products = await products.query;

    if (!products) return next(new AppError("There's No Products For this Category", 500));
    res.status(200).json({ status: "success", data: { data: products } });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    let { name, description, richDescription, price, category, countInStock } = req.body;
    category = await Category.findById(category);
    if (!category) return next(new AppError("Invalid Category", 400));

    let imageName = ""
    if (req.files.image) {
        imageName = req.files.image[0].filename;
    }

    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let imagesNames = [];
    if (req.files.images) {
        req.files.images.map((image) => imagesNames.push(`${basePath}${image.filename}`));
    }

    let product = await Product.findById(req.params.id);
    product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            richDescription,
            image: Object.keys(req.files).length !== 0 ? `${basePath}${imageName}` : product.image,
            images: product.images,
            price,
            category: req.body.category,
            countInStock,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return res.status(201).json({
        status: "success",
        data: {
            data: product,
        },
    });
});

exports.addProduct = catchAsync(async (req, res, next) => {
    let { name, description, richDescription, brand, price, category, countInStock, rating, numReviews, isFeatured } =
        req.body;
    category = await Category.findById(category);
    if (!category) return next(new AppError("Invalid Category", 400));
    console.log(req.files);
    const imageName = req.files.image[0].filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let imagesNames = [];
    if (req.files.images) {
        req.files.images.map((image) => imagesNames.push(`${basePath}${image.filename}`));
    }

    let product = await Product.create({
        name,
        description,
        richDescription,
        image: `${basePath}${imageName}`,
        //images: imagesNames,
        brand,
        price,
        category: req.body.category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
    });

    return res.status(201).json({
        status: "success",
        data: {
            data: product,
        },
    });
});

exports.searchProduct = catchAsync(async (req, res, next) => {
    const products = await Product.find({ name: { $regex: req.query.name } });
    if (!products) return next(new AppError("No Products Found", 500));
    return res.status(201).json({
        status: "success",
        results: products.length,
        data: {
            data: products,
        },
    });
});

exports.getNumberOfProducts = catchAsync(async (req, res, next) => {
    const productCount = await Product.countDocuments();
    if (!productCount) return next(new AppError("There's No Products yet", 500));
    res.status(200).json({ status: "success", data: { data: productCount } });
});

exports.getFeaturedProducts = catchAsync(async (req, res, next) => {
    let products;
    if (req.params.count) {
        products = await Product.find({
            isFeatured: true,
        }).limit(+req.params.count);
    } else {
        products = await Product.find({
            isFeatured: true,
        });
    }
    if (!products) return next(new AppError("There's No Featured Products yet", 500));
    res.status(200).json({ status: "success", data: { data: products } });
});
