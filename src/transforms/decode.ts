import { Transform } from "stream";

export const decode = new Transform();
decode._transform = function (data: any, enc: any, cb: any) {
  // TODO: replace by proper crypto
  cb(null, data.toString().toLowerCase());
};
