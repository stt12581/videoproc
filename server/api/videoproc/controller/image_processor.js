import fs from 'fs';
import StorageConfig from '../../../config/storage.conf';

var total_result = [];

export default class ImageProcessor {

  static runProgram(img_path) {
    console.log("Send request");

    var request = require('request');
    const url = 'http://localhost:8000?image_path=' + img_path;
    //console.log(img_path);
    request(url, function (error, response, content) {
      //console.log('error:', error); // Print the error if one occurred 
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      console.log('Feature:', content); // Print the HTML for the Google homepage. 

      console.log("Send python-lstm request");
      var request2 = require('request');
      const url2 = 'http://localhost:8080';
      request2.post({uri: url2, body:content}, function (error, response, body) {
        console.log('body:', body);
        total_result.push(body);
      });
    });
  }

  static sendEPA(req, res) {
    res.contentType('application/json');
    res.send(JSON.stringify(total_result));
    console.log('send EPA size: ', total_result.length);
    total_result = [];
  }
}