"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Koa = require("koa");
const Router = require("koa-router");
const error_1 = require("../util/error");
// Endpoints
const invite_1 = require("./invite");
const app = new Koa();
const router = new Router();
// Initalize endpoints
invite_1.default(router, app);
// Bind router to Koa
app.use(router.routes()).use(router.allowedMethods());
// General 404 for unknown endpoints
app.use(context => {
    context.status = 404;
    context.body = error_1.default("general.unkown_endpoint", "Unkown Endpoint");
});
exports.default = functions.https.onRequest(app.callback());
//# sourceMappingURL=index.js.map