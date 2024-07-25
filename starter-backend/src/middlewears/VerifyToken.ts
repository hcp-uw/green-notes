import { auth } from "../config/firebase-config.js";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;

// Checks whether the client is logged in when they send a server request.
// If they aren't, the server request won't go through
export const VerifyToken = async (req: SafeRequest, res: SafeResponse, next: any) => {
  // let token = await req.headers.authorization.split(' ')[1];
  let token;
  const author: unknown = req.headers.authorization
  if (typeof author === "string") {
    token = author.split(' ')[1];
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