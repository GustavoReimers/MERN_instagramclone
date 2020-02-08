const express = require("express");
const router = express.Router();
const Article = require("../models/article");

router.post("/getarticles", function(req, res) {
  console.log("article id-->", req.query.id);
  if (!req.query.id) {
    Article.find(function(err, articles) {
      res.json(articles);
    });
  } else {
    Article.findById(req.query.id, function(err, article) {
      if (!article) {
        res.status(404).send("no result");
      } else {
        res.json(article);
      }
    });
  }
});

router.post("/articles", function(req, res) {
  let article = new Article(req.body);

  article
    .save()
    .then(article => {
      res.send(article);
    })
    .catch(function(err) {
      res.status(422).send("Article add failed");
    });
});

router.patch("/articles", function(req, res) {
  Article.findByIdAndUpdate(req.query.id, req.body)
    .then(function() {
      res.json("updated successfully");
    })
    .catch(function(err) {
      res.status(422).send("update failed");
    });
});

router.delete("/articles", function(req, res) {
  Article.findById(req.query.id, function(err, article) {
    if (!article) {
      res.status(404).send("article not found");
    } else {
      Article.findByIdAndRemove(req.query.id)
        .then(function() {
          res.status(200).send("deleted");
        })
        .catch(function(err) {
          res.status(400).send("article delete failed");
        });
    }
  });
});

module.exports = router;
