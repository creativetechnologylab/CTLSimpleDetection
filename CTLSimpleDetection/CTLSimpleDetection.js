const axios = require('axios');

const { LIKELIHOOD, likelihoodPercentage, getJsonFromFile, base64Encode } = require('./constants');

const FEATURES = {
    LABEL_DETECTION: {
        "type":"LABEL_DETECTION",
        "maxResults":5            
    },
    FACE_DETECTION: {
        "type":"FACE_DETECTION",
        "maxResults":5            
    },
    TEXT_DETECTION: {
        "type":"TEXT_DETECTION"      
    }
};

const FEATURE_KEY = {
  FACE_DETECTION: 'faceAnnotations',
  LABEL_DETECTION: 'labelAnnotations',
  TEXT_DETECTION: 'textAnnotations',
};

class CTLSimpleDetection {
    constructor(apiKey, options = {}) {
        this.key = apiKey;

        this.testFiles = {
            FACE_DETECTION: __dirname + '/test/face.json',
            LABEL_DETECTION: __dirname + '/test/label.json',
            TEXT_DETECTION: __dirname + '/test/text.json',
        };

        this.defaults = {
            test: false
        };

        this.options = Object.assign({}, this.defaults, options);

        this.requests = [];
        
        this.endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${this.key}`;
    }

    _cleanup() {
      this.requests = [];
    }

    run() {
      let p;

      if (!this.options.test) {
        p = axios.post(this.endpoint, {
          requests: this.requests
        });
      } else {
        p = this._getTestResults(this.requests);
      }

      return p.then(response => response.data.responses)
        .then(responses => {
          return this._mutateResponses(responses);
        })
        .then(data => {
          this._cleanup();
          return data;
        })
    }

    addImage(img) {
      this.requests.push({
        image: { content: base64Encode(img) },
        features: []
      });

      return this;
    }

    getFaces(maxResults = 5) {
      this.requests[this.requests.length - 1].features.push(
        Object.assign({}, FEATURES.FACE_DETECTION, { maxResults })
      );

      return this;
    }

    getLabels(maxResults = 5) {
      this.requests[this.requests.length - 1].features.push(
        Object.assign({}, FEATURES.LABEL_DETECTION, { maxResults })
      );

      return this;
    }

    getText() {
      this.requests[this.requests.length - 1].features.push(
        Object.assign({}, FEATURES.TEXT_DETECTION)
      );

      return this;
    }

    _getTestResults(requests) {
      const responses = requests.map(r => {
        const obj = {};
        const featureList = r.features.map(f => f.type);

        featureList.forEach(k => {
          obj[FEATURE_KEY[k]] = getJsonFromFile(this.testFiles[k])[0][FEATURE_KEY[k]];
        });
        
        return obj;
      });

      return Promise.resolve({ data: { responses }});
    }

    _mutateResponses(responses) {
      return responses.map(response => {
        const obj = {};
        Object.keys(response).forEach(k => {
          switch (k) {
            case 'faceAnnotations':
              obj[k] = this._mutateFaces(response[k]);
              break;
            default:
              obj[k] = response[k];
              break;
          }
        });
        return obj;
      });
    }

    _mutateFaces(faceAnnotations) {
        return faceAnnotations.map(f => {
          return Object.assign({}, f, {
            percentages: {
              joy: likelihoodPercentage(f.joyLikelihood),
              sorrow: likelihoodPercentage(f.sorrowLikelihood),
              anger: likelihoodPercentage(f.angerLikelihood),
              surprise: likelihoodPercentage(f.surpriseLikelihood),
              underExposed: likelihoodPercentage(f.underExposedLikelihood),
              blurred: likelihoodPercentage(f.blurredLikelihood),
              headwear: likelihoodPercentage(f.headwearLikelihood),
            }
          });
        });
    }
}

module.exports = CTLSimpleDetection;