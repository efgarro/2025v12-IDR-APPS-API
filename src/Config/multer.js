import { S3Client } from "@aws-sdk/client-s3";
import { uuidv7 } from "uuidv7";
import { secrets } from "../Utils/aws-secrets";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://0cffae522cdd52172bbe596db41d0f8a.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: secrets.ACCESS_KEY_ID,
    secretAccessKey: secrets.SECRET_ACCESS_KEY,
  },
});

export const storageR2 = (bucket) => {
  return multerS3({
    s3: s3,
    bucket: bucket,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      req.body.image_id = uuidv7();
      req.body.image_tag = req.body.image_id.substring(24);
      cb(
        null,
        `${req.body.cluster_name}/${req.body.image_tag}_${file.originalname}`
      );
    },
  });
};
