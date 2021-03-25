import { Transform } from "stream";

export const encode = new Transform();
encode._transform = function (data: any, enc: any, cb: any) {
  // TODO: replace by proper crypto
  cb(null, data.toString().toUpperCase());
};
