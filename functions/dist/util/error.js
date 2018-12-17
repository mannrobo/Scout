"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function error(code, message, additional) {
    return {
        error: Object.assign({ message,
            code }, additional)
    };
}
exports.default = error;
//# sourceMappingURL=error.js.map