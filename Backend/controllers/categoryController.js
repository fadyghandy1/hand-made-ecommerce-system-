const Category = require("../models/Category");
const factory = require("./handlerFactory.js");

exports.getCategories = factory.getAll(Category);
exports.getOneCategory = factory.getOne(Category);
exports.addCategory = factory.createOne(Category);
exports.updateCategory = factory.UpdateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);