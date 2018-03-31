'use strict';

const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

const Picture = require('../models/picture');

router.route('/upload')
  .post(upload.single('picture'), (req, res, next) => {
    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.originalname}`,
      Body: fs.createReadStream(req.file.path)
    };

    s3.upload(params, (err, s3Data) => {
      if (err) {
        res.send(err);
      }
      Picture.create({ url: s3Data.Location })
        .then(picture => {
          res.send(picture);
        })
        .catch(err => res.send(err.message));
    });
  });

router.route('/uploads')
  .get((req, res) => {
    Picture.find()
      .then(pictures => {
        res.send(pictures);
      })
      .catch(err => res.send(err.message));
  });

router.route('/upload/:_id')
  .get((req, res) => {
    Picture.findById(req.params._id)
      .then(picture => {
        res.send(picture);
      })
      .catch(err => res.send(err.message));
  })
  .delete((req, res) => {
    Picture.findByIdAndRemove(req.params._id)
      .then(picture => {
        let imageUrl = picture.url.split('/').slice(-1)[0];
        let params = {
          Bucket: process.env.AWS_BUCKET,
          Key: imageUrl
        };

        s3.deleteObject(params, (err, data) => {
          if (err) {
           console.log(err);   
          }
          res.status(204).send('Successfuly deleted image');
        });
      })
      .catch(err => res.send(err.message));
  });

module.exports = router;
