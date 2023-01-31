const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { engine } = require("express-handlebars");
const errorController = require("./controllers/error");

const PORT = process.env.PORT;

const app = express();

// Templates with PUG
// app.set("view engine", "pug");

// Templates with HANDLEBARS
// app.engine("hbs", engine({ extname: ".hbs" }));
// app.set("view engine", "hbs");
// app.set("views", "./views");

// Templates with EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res, next) => {
    res.render("test");
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
