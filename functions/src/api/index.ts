import * as functions from "firebase-functions";

import * as Koa from "koa";
import * as Router from "koa-router";

import error from "../util/error";

// Endpoints
import invite from "./invite";

const app = new Koa();
const router = new Router();

// Initalize endpoints
invite(router, app);

// Bind router to Koa
app.use(router.routes()).use(router.allowedMethods());

// General 404 for unknown endpoints
app.use(context => {
  context.status = 404;
  context.body = error("general.unkown_endpoint", "Unkown Endpoint");
});

export default functions.https.onRequest(app.callback());
