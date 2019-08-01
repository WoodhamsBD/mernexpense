var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');

router.get('/', function(req, res) {
  res.render('index');
});

// Create 
router.route('/insert')
  .post(function(req, res) {
    let expense = new Expense();
      expense.description = req.body.desc;
      expense.amount = req.body.amount;
      expense.month = req.body.month;
      expense.year = req.body.year;

    // Save newly created expense
    expense.save(function(err) {
      if(err) {
        res.send(err);
      }
      res.send('Expense successfully added!');
    });
});

// Update
router.route('/update')
  .post(function(req, res) {
    const doc = {
      description: req.body.description,
      amount: req.body.amount,
      month: req.body.month,
      year: req.body.year
    };

    // Update call
    Expense.update({_id: req.body.id}, doc, function(err, result) {
      if(err)
        res.send(err);
      
      res.send('Expense successfully updated!');
    });
});

// Delete
router.get('/delete', function(req,res) {
  let id = req.query.id;
  Expense.find({_id: id}).remove().exec(function(err, expense) {
    if(err)
      res.send(err)
    res.send('Expense successfully deleted!');
  })
});

// Index return
router.get('/getAll', function (req, res) {
  let monthRec = req.query.month;
  let yearRec = req.query.year;
  if (monthRec && monthRec != 'All') {
    Expense.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function (err, expenses) {
      if (err)
        res.send(err);
      res.json(expenses);
    });
  } else {
    Expense.find({ year: yearRec }, function (err, expenses) {
      if (err)
        res.send(err);
      res.json(expenses);
    });
  }

});

module.exports = router;
