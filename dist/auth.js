"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const TOKEN = async (token, key) => {
    _1.default.host = "https://ecommerce.golomtbank.com";
    try {
        _1.default.token = token;
        _1.default.key = key;
        return {
            success: true,
            message: "success"
        };
    }
    catch (error) {
        return {
            success: false,
            message: "error"
        };
    }
};
exports.default = { TOKEN };
