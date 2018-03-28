# MongoDB RESTful API

**Author** : Rafael Malave

## Overview

This is a simple example of asset uploads using Amazon S3 SDK.
## Getting started

Clone this repository to your local computer. Run `npm install` to install the necessary packages. Start the server with npm start and start mongodb on your local machine with `mongod`. run the tests by running `npm test`.

To manually send requests, use [HTTPie](https://httpie.org/) or [Postman](https://www.getpostman.com/).
This project uses [dotenv](https://github.com/motdotla/dotenv) to load the necessary environment variables. Please create a .env file on the root of this project and add the necessary variables. The need variables for this project are:

```
PORT=
MONGODB_URI=
AWS_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Put these on your .env file and add your own values for these.

## HTTP Methods

### User endpoints
 An example upload form is found at `localhost:3000`

- POST endpoint `/photos/upload` sends the uploaded image to an amazon bucket specified in `index.js` 

- GET endpoints `/photos/uploads` Gets a JSON formated list of image objects uploaded to the MongoDD and S3 bucket.

- DELETE endpoint `/photos/upload/:_id` Removes the specified image from the MongoDB and the S3 bucket.

The server responds with status **200** for successful uploads and returns the S3 object.
The server responds with status **204** for successful removal of image objects.

## Technologies

- Nodejs
- Express
- npm
- MongoDB
- Amazon SDK
- Amazon S3




