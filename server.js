import express from "express";
import mongoose from "mongoose";
import Items from "./dbItems.js";
import Cors from "cors";

const connection_url =
  "mongodb+srv://admin-anshuman:calculus126@cluster0.2h17h.mongodb.net/inventDB?retryWrites=true&w=majority";

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get("/", function (req, res) {
  res.send("hello");
});

app.post("/Create", function (req, res) {
  const dbItem = req.body;
  Items.create(dbItem, function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/Remove", function (req, res) {
  const dbItem = req.body;
  Items.deleteOne({ name: dbItem.name }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("item deleted");
      res.status(200).json({
        message: "Item deleted",
      });
    }
  });
});

app.post("/Restock", function (req, res) {
  const dbItem = req.body;

  Items.findOneAndUpdate(
    { name: dbItem.name },
    { quantity: dbItem.addQuantity },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("item updated");
        res.status(200).json({
          message: "Item Updated",
        });
      }
    }
  );
});
app.post("/use", function (req, res) {
  const dbItem = req.body;
  Items.findOneAndUpdate(
    { name: dbItem.name },
    { quantity: dbItem.reduceQuantity },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("item updated");
        res.status(200).json({
          message: "Item Updated",
        });
      }
    }
  );
});

app.get("/Create", function (req, res) {
  Items.find(function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, function () {
  console.log("listening on localhost:" + port);
});
