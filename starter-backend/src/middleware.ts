import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;

// define middleware to handle requests made to unknown endpoint
export const unknownEndpoint = (req: SafeRequest, res: SafeResponse) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

// module.exports = { unknownEndpoint }