import { auth } from "../config/firebase-config.js";
// const auth = require("../config/firebase-config.js");

export const VerifyToken = async (req, res, next) => {
  // let token = await req.headers.authorization.split(' ')[1];
  let token;
  if (typeof await req.headers.authorization === "string") {
    token = req.headers.authorization.split(' ')[1];
  } else {
    console.log(typeof req.headers.authorization);
    return res.json({ message: "auth token wasn't string :("});
  }

  try {
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
  } catch (e) {
    return res.json({ message: "Internal Error" });
  }
};