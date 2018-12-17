"use strict";
/**
 * Invite manager:
 *  1) Generates new invites
 *  2) Applies them to users
 *  3)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const error_1 = require("../util/error");
function authenticateUser(jwt) {
    return __awaiter(this, void 0, void 0, function* () {
        return admin
            .auth()
            .verifyIdToken(jwt, true)
            .catch(function () {
            throw error_1.default("invite.invalid.jwt", "JWT isn't valid. Try signing out and back in again");
        });
    });
}
exports.default = (router, app) => {
    const auth = admin.auth();
    const database = admin.firestore();
    // Use invite code
    router.get("/invite/use", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let { code, jwt } = ctx.query;
        if (!code) {
            ctx.body = error_1.default("invite.no.code", "No invite code was supplied");
            return;
        }
        if (!jwt) {
            ctx.body = error_1.default("invite.no.jwt", "No JWT was supplied. Try signing in again");
            return;
        }
        // Decodes Base64 encoding
        jwt = Buffer.from(jwt, "base64").toString();
        let decodedToken = yield authenticateUser(jwt).catch(err => (ctx.body = err));
        // If we errored
        if (decodedToken.hasOwnProperty("error"))
            return;
        decodedToken = decodedToken;
        // Get the correct team
        const invite = yield database
            .collection("invite")
            .where("code", "==", code)
            .limit(1)
            .get();
        if (invite.empty) {
            ctx.body = error_1.default("invite.invalid.code", "Invalid invite code. Check your link");
            return;
        }
        const team = invite.docs[0].id;
        ctx.body = yield addUserToTeam(decodedToken.uid, team, ctx);
    }));
};
function addUserToTeam(uid, team, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // First add them to the team directly
        const teamRef = admin
            .firestore()
            .collection("teams")
            .doc(team), snapshot = yield teamRef.get();
        // See if the team is claimed
        if (!snapshot.exists) {
            return error_1.default("invite.invalid.team", "That team hasn't been claimed yet, or is unavailable for other reasons");
        }
        // Check if the team already has that member
        const data = snapshot.data();
        if (data.members.includes(uid)) {
            return error_1.default("invite.invalid.user", "User already part of this team. This is a no-op");
        }
        // Add the user to the approved invite lisrt
        const invite = admin
            .firestore()
            .collection("invite")
            .doc(team);
        const inviteData = (yield invite.get()).data();
        yield invite.update({
            approved: [...inviteData.approved, uid]
        });
        // Finally, push the user to the end of the team
        return (teamRef
            .update({
            members: [...data.members, uid]
        })
            // Create action summary
            .then(() => ({
            error: null,
            action: {
                "invite.member_add": uid,
                "invite.team": team
            }
        }))
            .catch(() => {
            ctx.status = 500;
            return error_1.default("invite.internal", "Internal Server Error. Try again in a little bit");
        }));
    });
}
//# sourceMappingURL=invite.js.map