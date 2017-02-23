import fs from 'fs';
import StorageConfig from '../../../config/storage.conf';

export default class VideoprocController {
  static uploadImage(req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let blobs = [];

    req.on('readable', function() {
      let blob = req.read();
      if (blob === null) {
        if (!fs.existsSync(StorageConfig.storageDir)) {
          fs.mkdirSync(StorageConfig.storageDir);
        }

        let image_data = Buffer.concat(blobs);
        let path = StorageConfig.storageDir + StorageConfig.getTimestamp() + StorageConfig.getExtension();
        fs.writeFile(path, image_data, (err) => {
          if (err) {
            return res.status(500).end();
          }
          return res.status(200).end();
        });
      } else {
        blobs.push(blob);
      }
    });
  }

  static getCsrf(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send({csrfToken: req.csrfToken()});
  }
}
