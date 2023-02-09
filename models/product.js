const fs = require("fs");
const path = require("path");
const dirPath = require("../utils/path");
const p = path.join(dirPath, "data", "products.json");

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            return callback([]);
        }
        callback(JSON.parse(data));
    });
};

module.exports = class Product {
    constructor(title, imgPath, price, description) {
        this.title = title;
        this.imgPath = imgPath;
        this.price = price;
        this.description = description;
    }
    save() {
        getProductsFromFile(
            // lecture des datas actuelles si pas d'erreur
            (products) => {
                // ajout du nouveau product
                products.push(this);
                // écriture de la nouvelle liste maj
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        );
    }
    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
};
