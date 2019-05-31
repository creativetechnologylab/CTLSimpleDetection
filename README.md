# CTLSimpleDetection

**Work In Progress. Please let us know if you need more features from the vision api**

A small abstraction of the google vision API to just give you the basic needs to interact with.

## IMPORTANT!

The Google API is not free. It allows for 1000 uses per month and is $1.00 for every 1000 calls after that. Because of that if you add `test: true` to the options object in the constructor, it will allow you to get test data back, to build your project with first.

## Installation

Copy the `CTLSimpleDetection` folder into your project and then you can require it by using `const CTLSimpleDetection = require('./CTLSimpleDetection/CTLSimpleDetection')` in your node.js code.

You do however also need to install the cloud vision API into your project:

```
npm install @google-cloud/vision
```

You also need to download service account credentials JSON file for a google account. Look at this link <https://cloud.google.com/vision/docs/quickstart-client-libraries> and follow **Steps 1 - 4** in the **Before you begin section**

## API

**CTLSimpleDetection(credentialsFileLocation, options)**
- *credentialsFileLocation* - An absolute path to the credentials.json acquired from your google cloud service account
- *options* - An options object


**getFace(image)**
- *image* Link to image to detect
- *@returns Promise(faceAnnotations)*


**getFaceEmotions(image)**
- *image* Link to image to detect
- *@returns Promise(emotions)*


## Example

Look into the `examples/` folder for working examples