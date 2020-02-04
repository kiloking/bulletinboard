// 
const express = require('express');
const router = express.Router();
const CategoriesModel = require('../model/CategoriesModel');

// GET api/categories
router.get('/', (req, res) => {
  CategoriesModel.find().then(profile => {
    if (!profile) {
      return res.status(404).json('没有任何内容');
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});

// POST api/categories/
router.post('/', (req, res) => {
  // res.json({ msg: 'profile Post' });
  // PostModel.create(req.body).then(function(post){
  //   res.send(post)
  // })
  const postFields = {};
  if (req.body.title) postFields.title = req.body.title;
  if (req.body.backgroundcolor) postFields.backgroundcolor = req.body.backgroundcolor;
  if (req.body.fontcolor) postFields.fontcolor = req.body.fontcolor;


  new CategoriesModel(postFields).save().then(post => {
    res.json(post);
  });

});


// get apo/categories/:id 拿到單個
router.get(
  '/:id',(req, res) => {
    CategoriesModel.findOne({ _id: req.params.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json('没有任何内容');
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// put api/categories/id
router.put('/:id', (req, res) => {
  // res.json({ msg: 'post put' });
  const postFields = {};
  if (req.body.title) postFields.title = req.body.title;
  if (req.body.backgroundcolor) postFields.backgroundcolor = req.body.backgroundcolor;
  if (req.body.fontcolor) postFields.fontcolor = req.body.fontcolor;

  CategoriesModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFields },
    { new: true }
  ).then(profile => res.json(profile));

});

// delete api/categories/id
router.delete('/:id', (req, res) => {
  CategoriesModel.findOneAndRemove({ _id: req.params.id })
    .then(profile => {
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json('删除失败!'));
});

module.exports = router;