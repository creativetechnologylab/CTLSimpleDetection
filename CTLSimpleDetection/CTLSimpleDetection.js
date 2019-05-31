const vision = require('@google-cloud/vision');

const { LIKELIHOOD, likelihoodPercentage, getJsonFromFile } = require('./constants');

class CTLSimpleDetection {
    constructor(credentials, options = {}) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = credentials;

        this.testFiles = {
            face: __dirname + '/test/face.json'
        };

        this.defaults = {
            test: false,
            multiple: false
        };

        this.options = Object.assign({}, this.defaults, options);

        this.client = new vision.ImageAnnotatorClient();
    }

    getFace(img) {
        let p;
        
        if (!this.options.test) {
            p = this.client.faceDetection(img)
        } else {
            p = Promise.resolve(
                getJsonFromFile(this.testFiles.face)
            );
        }
        
        return p.then(([result]) => {
            return result.faceAnnotations;
        });
    }

    getFaceEmotions(img) {
        return this.getFace(img)
            .then(faces => {
                return faces.map(f => {
                    return {
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