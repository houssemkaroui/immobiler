const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

destination = (folderPath, file, cb) => {
   if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/jpeg"
   ) {
      const folderName = path.join(
         __dirname.substring(0, 34) + "/" + folderPath
      );
      //folderName.substring(0,34)
      cb(null, folderPath);

      //  mkdirp.sync(__dirname + "/" + "public/img/Challenge");
   } else if (
      file.mimetype == "audio/mpeg" ||
      file.mimetype == "audio/webm" ||
      file.mimetype == "audio/x-wav" ||
      file.mimetype == "audio/ogg" ||
      file.mimetype == "audio/mp3" ||
      file.mimetype == "audio/mp4"
   ) {
      const folderName = path.join(
         __dirname.substring(0, 34) + "/" + folderPath
      );
      // folderName.substring(0,34)
      cb(null, folderPath);
   } else if (file.mimetype == "video/mp3" || file.mimetype == "video/mp4") {
      const folderName = path.join(
         __dirname.substring(0, 34) + "/" + folderPath
      );
      // folderName.substring(0,34)
      cb(null, folderPath);
   } else if (
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/msword" ||
      file.mimetype ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
   ) {
      const folderName = path.join(
         __dirname.substring(0, 34) + "/" + folderPath
      );
      // folderName.substring(0,34)
      cb(null, folderPath);
   } else {
      cb(null, "autres");
   }
};

exports.storage = function (folderPath) {
   return multer.diskStorage({
      destination: function (req, file, cb) {
         const dir = (path.join(__dirname).substring(0, 35) + "/" + folderPath)
            .split("/")
            .join("\\");
         console.log(dir);
         if (fs.existsSync(dir)) {
            destination(folderPath, file, cb);
         } else {
            fs.mkdirSync(dir, { recursive: true }, (err) => {
               if (err) {
                  return console.error(err);
               }
            });
            destination(folderPath, file, cb);
            console.log("Directory created successfully!");
         }
      },
      filename: function (req, file, cb) {
         let hash = crypto
            .createHash("md5")
            .update(file.originalname)
            .digest("hex");
         cb(null, hash + "-" + Date.now() + path.extname(file.originalname));
      },
   });
};

// exports.upload = multer({ storage })
