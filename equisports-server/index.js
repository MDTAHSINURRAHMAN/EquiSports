const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 4000;

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmztt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// MIDDLEWARE
app.use(express.json());
app.use(cors());

async function Main() {
  try {
    const allEquipments = client.db("EquiSports").collection("equipments");
    const userColllection = client.db("EquiSports").collection("users");

    // Endpoint to Add Equipment
    app.post("/add-equipments", async (req, res) => {
      const data = req.body;
      const result = await allEquipments.insertOne(data);
      res.send(result);
    });

    // Endpoint to Update Equipment by ID
    app.put("/add-equipments/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEquipment = req.body;

      try {
        const result = await allEquipments.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedEquipment }
        );
        res.json({ modifiedCount: result.modifiedCount });
      } catch (error) {
        console.error("Error updating equipment:", error);
        res.status(500).json({ error: "Failed to update equipment." });
      }
    });

    // Endpoint to Delete Equipment by ID
    app.delete("/add-equipments/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await allEquipments.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
          res.json({ message: "Equipment deleted successfully!" });
        } else {
          res.status(404).json({ message: "Equipment not found." });
        }
      } catch (error) {
        console.error("Error deleting equipment:", error);
        res
          .status(500)
          .json({ message: "Server error while deleting equipment." });
      }
    });

    // Endpoint to Get All Equipment
    app.get("/add-equipments", async (req, res) => {
      const result = await allEquipments.find().toArray();
      res.send(result);
    });

    // Endpoint to get all equipment added by a specific user
    app.get("/my-equipments/:uid", async (req, res) => {
      const { uid } = req.params; // Extract the user ID from the request parameters

      try {
        // Find all equipment matching the user's UID
        const result = await allEquipments.find({ userId: uid }).toArray();
        if (result.length === 0) {
          return res
            .status(404)
            .send({ message: "No equipment found for this user." });
        }
        res.send(result);
      } catch (error) {
        console.error("Error fetching equipment for user:", error);
        res.status(500).send({ message: "Server error" });
      }
    });

    // Endpoint to Get Equipment by ID
    app.get("/add-equipments/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const equipment = await allEquipments.findOne({
          _id: new ObjectId(id),
        });
        if (equipment) {
          res.json(equipment);
        } else {
          res.status(404).send({ message: "Equipment not found" });
        }
      } catch (error) {
        res.status(500).send({ message: "Invalid ID format or server error" });
      }
    });

    //
    app.get("/my-equipments/:userId", async (req, res) => {
      const { userId } = req.params;
      const result = await allEquipments.find({ userId }).toArray();
      res.send(result);
    });

    // Users Related APIs
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userColllection.insertOne(newUser);
      res.send(result);
    });

    app.patch("/users", async (req, res) => {
      const email = req.body.email;
      const filter = { email };
      const updatedDoc = {
        $set: {
          lastSignInTime: req.body?.lastSignInTime,
        },
      };
      const result = await userColllection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

Main();

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(port, () => {
  console.log("Server Running on port:", port);
});
