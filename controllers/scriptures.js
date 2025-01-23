const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getScripture = async (req, res) => {
  // #swagger.tags = ['scriptures']

  try {
    const list = await mongodb
    .getDatabase()
    .db()
    .collection('scriptures')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getScriptureById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID');
    return;
  }
  // #swagger.tags = ['scriptures']
  try {
    const id = new ObjectId(req.params.id);
    const scripture = await mongodb
    .getDatabase()
    .db()
    .collection('scriptures')
    .findOne({ _id: id });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(scripture);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const postScripture = async (req, res) => {
  // #swagger.tags = ['scriptures']
  try {
    const scripture = {
      class: req.body.class,
      book: req.body.book,
      chapter: req.body.chapter,
      verse: req.body.verse,
      text: req.body.text
    }
    await mongodb
    .getDatabase()
    .db()
    .collection('scriptures')
    .insertOne(scripture);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(scripture);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const putScripture = async (req, res) => {
  // #swagger.tags = ['scriptures']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  try {
    const id = new ObjectId(req.params.id);
    const scripture = {
      class: req.body.class,
      book: req.body.book,
      chapter: req.body.chapter,
      verse: req.body.verse,
      text: req.body.text
    }
    await mongodb
    .getDatabase()
    .db()
    .collection('scriptures')
    .updateOne({ _id: id }, { $set: scripture });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(scripture);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteScripture = async (req, res) => {
  // #swagger.tags = ['scriptures']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID');
  }

  try {
    const id = new ObjectId(req.params.id);
    await mongodb
    .getDatabase()
    .db()
    .collection('scriptures')
    .deleteOne({ _id: id });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ id });

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { getScripture, getScriptureById, postScripture, putScripture, deleteScripture };