const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
        pageTitle: "Add product",
        activeShop: false,
        activeAddProduct: true,
    });
};

exports.postAddProduct = (req, res, next) => {
    const newProduct = new Product(
        req.body.title,
        "path",
        req.body.price,
        req.body.description
    );
    newProduct.save();
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop", {
            pageTitle: "Shop",
            prods: products,
            isProds: products.length > 0,
            activeShop: true,
            activeAddProduct: false,
        });
    });
};
