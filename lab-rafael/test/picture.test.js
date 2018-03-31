'use strict';

require('dotenv').config();
const superagent = require('superagent');
const Picture = require('../models/picture');

describe('Test AWS S3 uploads', () => {
  it('Should return 200 when the upload worked and a resource object is returned', done => {
    let imageLocation = './uploads/suitandtie.jpg';
    let uploadUrl = 'http://localhost:3000/photos/upload';

    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((err, res) => {
        if (err) res.send(err.message);
        let amazonUrl = process.env.AWS_BUCKET + '.s3.amazonaws.com';
        let isAmazonUrl = res.body.url.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);

        done();
      });
  });

  it('Should return 200 when requesting all objects from database', () => {
    let uploadsUrl = 'http://localhost:3000/photos/uploads/';
    superagent.get(uploadsUrl)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).toBe(200);
      });
  });

  it('Should return 204 when Successfuly deleted object from mongodb and S3 bucket', done => {
    let imageLocation = './uploads/suitandtie.jpg';
    let uploadUrl = 'http://localhost:3000/photos/upload/';

    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((err, res) => {
        let imageId = res.body._id;
        superagent.delete(uploadUrl + imageId)
          .end((err, res) => {
            expect(res.status).toBe(204);
            done();
          });
        done();
      });
  });

  it('Should return 200 when Successfuly fetched a photo from mongodb', done => {
    let imageLocation = './uploads/suitandtie.jpg';
    let uploadUrl = 'http://localhost:3000/photos/upload/';

    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((err, res) => {
        let imageId = res.body._id;
        superagent.get(uploadUrl + imageId)
          .end((err, res) => {
            expect(res.status).toBe(200);
            done();
          });
      });
  });
});
