const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getQuote = async (req, res) => {
  // #swagger.tags = ['quotes']

  try {
    const list = await mongodb
    .getDatabase()
    .db()
    .collection('quotes')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getQuoteById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID');
    return;
  }
  // #swagger.tags = ['quotes']
  try {
    const id = new ObjectId(req.params.id);
    const quote = await mongodb
    .getDatabase()
    .db()
    .collection('quotes')
    .findOne({ _id: id });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(quote);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const postQuote = async (req, res) => {
  // #swagger.tags = ['quotes']
  try {
    const quote = {
      class: req.body.class,
      book: req.body.book,
      chapter: req.body.chapter,
      verse: req.body.verse,
      text: req.body.text
    }
    await mongodb
    .getDatabase()
    .db()
    .collection('quotes')
    .insertOne(quote);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(quote);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const putQuote = async (req, res) => {
  // #swagger.tags = ['quotes']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  try {
    const id = new ObjectId(req.params.id);
    const quote = {
      class: req.body.class,
      book: req.body.book,
      chapter: req.body.chapter,
      verse: req.body.verse,
      text: req.body.text
    }
    await mongodb
    .getDatabase()
    .db()
    .collection('quotes')
    .updateOne({ _id: id }, { $set: quote });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(quote);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteQuote = async (req, res) => {
  // #swagger.tags = ['quotes']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid ID');
  }

  try {
    const id = new ObjectId(req.params.id);
    await mongodb
    .getDatabase()
    .db()
    .collection('quotes')
    .deleteOne({ _id: id });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ id });

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { getQuote, getQuoteById, postQuote, putQuote, deleteQuote };