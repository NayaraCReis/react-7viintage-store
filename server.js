//import
const express = require("express"); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

// var data = require ("./build/data.json");
const app = express();
app.use(bodyParser.json());

// deploy
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile
(__dirname + "/build/index.html"));

// mongodb
mongoose.connect(
  process.env.MONGODB_URL || 
  "mongodb://localhost/react-sevenvintage-db", 
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model(
"products",
new mongoose.Schema({
_id: { type: String, default: shortid.generate },
title: String,
description: String,
image: String,
price: Number,
availableSizes: [String],
}));

app.get("/api/products", async (req, res) => {
  // is empty parameter. It means that there is no condition a 
  //return all products that said about this.
  const products = await Product.find({});
    res.send(products);
});

// to create a new product inside the database.
app.post("/api/products", async (req, res)=>{
    const newProduct = new Product (req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
const deletedProduct = await 
Product.findByIdAndDelete(req.params.id);
res.send(deletedProduct);
});

const Order = mongoose.model(
    "order",
    new mongoose.Schema(
      {
        _id: {
          type: String,
          default: shortid.generate,
        },
        email: String,
        name: String,
        address: String,
        total: Number,
        shoppingBag: [
          {
            _id: String,
            title: String,
            price: Number,
            count: Number,
          },
        ],
        shipped: Boolean,
      },
      {
        timestamps: true,
      }
    )
  );

  app.post("/api/orders/dispatch", async (req, res) => {
    const order = await Order.findOne ({
      _id: req.body._id
    });
    await order.updateOne({
      shipped: true
    });

    res.send({});
  });
  
  app.post("/api/orders", async (req, res) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.shoppingBag 
      
    ) {
      return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
  });
  
  app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
  });
  app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
  });
  

const port = process.env.PORT || 5000;
app.listen(port, () => 
console.log("serve at http://localhost:5000"));


