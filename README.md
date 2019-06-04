# CTLSimpleDetection

**Work In Progress. Please let us know if you need more features from the vision api**

A small abstraction of the google vision API to just give you the basic needs to interact with.

## IMPORTANT!

The Google API is not free. It allows for 1000 uses per month and is $1.00 for every 1000 calls after that. Because of that if you add `test: true` to the options object in the constructor, it will allow you to get test data back, to build your project with first.

## Installation

Copy the `CTLSimpleDetection` folder into your project and then you can require it by using `const CTLSimpleDetection = require('./CTLSimpleDetection/CTLSimpleDetection')` in your node.js code.

You do however also need to install the axios module into your project:

```
npm install axios
```

You also need to get an API Key from Google Cloud to use the google vision API. <https://cloud.google.com/docs/authentication/api-keys#creating_an_api_key>

## API

**CTLSimpleDetection(credentialsFileLocation, options)**
- *credentialsFileLocation* - An absolute path to the credentials.json acquired from your google cloud service account
- *options* - An options object

**options**

| Key             | Value                                          | Default |
|-----------------|------------------------------------------------|---------|
| test            | Returns test information, not real             | false   |

**addImage(image)**
- *image* Link to image to detect

**getFaces(maxResults)**
- *maxResults* Sets the maximum possible faces to find

**getLabels(maxResults)**
- *maxResults* Sets the maximum possible labels to find

**getText()**

**run()**
- *@returns Promise(annotations)* Runs the query to return results


## Example

Look into the `examples/` folder for working examples