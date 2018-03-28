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
});
