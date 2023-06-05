const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const cors = require("cors");
const { FoundError, NotFoundError } = require("./errors.js");
const { cars } = require("./mock.js");

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

app.use(cors());

app.use(express.static(`${__dirname}/public`));

(async () => {
  await mongoClient.connect();
  app.locals.collection = mongoClient.db("usersdb").collection("users");

  await mongoClient.db("usersdb").collection("cars").deleteMany({});

  app.locals.carCollection = mongoClient.db("usersdb").collection("cars");

  await app.locals.carCollection.insertOne({ cars });

  app.listen(3001);
})();

app.post("/api/registration", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const collection = req.app.locals.collection;

  try {
    await collection.insertOne(req.body);

    const registeredUser = await collection.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(registeredUser);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/api/login", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const collection = req.app.locals.collection;

  try {
    const registeredUser = await collection.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!registeredUser) throw new NotFoundError();

    res.status(200).json(registeredUser);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
});

app.post("/api/checkEmail", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const collection = req.app.locals.collection;

  try {
    const registeredUser = await collection.findOne({ email: req.body.email });

    if (registeredUser) throw new FoundError();

    res.sendStatus(200);
  } catch (err) {
    if (err instanceof FoundError) {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
  }
});

app.get("/api/cars/unavailable", async (req, res) => {
  const collection = req.app.locals.collection;

  try {
    const allUsers = await collection.find().toArray();

    const rentHistory = [];

    for (let i of allUsers) {
      rentHistory.push(...i.rentedCars);
    }

    const unavailableCars = [];

    for (let i of rentHistory) {
      if (
        new Date(i.rentStarted).getTime() + i.rentInHours * 60 * 60 * 1000 >=
        new Date().getTime()
      ) {
        unavailableCars.push(i.carId);
      }
    }

    res.json(unavailableCars);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/api/cars/all", async (req, res) => {
  const carCollection = req.app.locals.carCollection;

  try {
    const allCars = (await carCollection.findOne({})).cars;

    res.json(allCars);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/api/toggleUserBookmark", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const collection = req.app.locals.collection;

  try {
    let bookmarkedCars = (
      await collection.findOne({ _id: new objectId(req.body.userId) })
    ).bookmarkedCars;

    let result;

    if (bookmarkedCars.includes(req.body.carId)) {
      result = bookmarkedCars.filter((item) => item !== req.body.carId);
    } else {
      result = [...bookmarkedCars, req.body.carId];
    }

    await collection.updateOne(
      { _id: new objectId(req.body.userId) },
      { $set: { bookmarkedCars: result } }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/toggleRentedCar", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const collection = req.app.locals.collection;

  try {
    let rentedCars = (
      await collection.findOne({ _id: new objectId(req.body.userId) })
    ).rentedCars;

    let result;

    if (rentedCars.find((item) => item.carId === req.body.car.carId)) {
      result = rentedCars.filter((item) => item.carId !== req.body.car.carId);
    } else {
      result = [...rentedCars, { ...req.body.car }];
    }

    await collection.updateOne(
      { _id: new objectId(req.body.userId) },
      { $set: { rentedCars: result } }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/refreshRentedCars", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const collection = req.app.locals.collection;

  try {
    const registeredUser = await collection.findOne({
      _id: new objectId(req.body.userId),
    });

    if (!registeredUser) throw new Error();

    const stillReleventRentedCars = [];

    for (let i of registeredUser.rentedCars) {
      if (
        new Date(i.rentStarted).getTime() +
          i.rentInHours * 60 * 60 * 1000 -
          new Date().getTime() >
        0
      ) {
        stillReleventRentedCars.push(i);
      }
    }

    await collection.updateOne(
      { _id: new objectId(req.body.userId) },
      { $set: { rentedCars: stillReleventRentedCars } }
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/api/refreshUserData", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const collection = req.app.locals.collection;

  try {
    const user = await collection.findOne({
      _id: new objectId(req.body.userId),
    });

    res.json(user);
  } catch (err) {
    res.sendStatus(500);
  }
});

process.on("SIGINT", async () => {
  await app.locals.carCollection.deleteMany({});
  await mongoClient.close();
  process.exit();
});
