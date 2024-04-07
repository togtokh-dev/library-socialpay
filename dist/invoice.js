"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _1 = require(".");
const crypto_1 = require("crypto");
const hmac256 = async (key, message) => {
    const hash = (0, crypto_1.createHmac)("sha256", key).update(message);
    return hash.digest("hex");
};
const mongoObjectId = async () => {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (timestamp +
        "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, function () {
            return ((Math.random() * 16) | 0).toString(16);
        })
            .toLowerCase());
};
const CREATE = async (body) => {
    var _a, _b, _c, _d, _e;
    try {
        const data = {
            amount: body.amount,
            callback: body.callback,
            checksum: "",
            genToken: body.genToken,
            returnType: "GET",
            transactionId: await mongoObjectId(),
            socialDeeplink: body.socialDeeplink,
        };
        data.checksum = await hmac256(_1.default.key, `${data.transactionId}${data.amount}${data.returnType}${data.callback}`);
        const res = await axios_1.default.post(`${_1.default.host}/api/invoice`, data, {
            headers: {
                Authorization: `Bearer ${_1.default.token}`,
                "Content-Type": "application/json",
            },
        });
        if (res.data) {
            return {
                success: true,
                message: "success",
                data: {
                    ...res.data,
                    url: {
                        en: "https://ecommerce.golomtbank.com/payment/en/" +
                            ((_a = res.data) === null || _a === void 0 ? void 0 : _a.transactionId) || "",
                        mn: "https://ecommerce.golomtbank.com/payment/mn/" +
                            ((_b = res.data) === null || _b === void 0 ? void 0 : _b.transactionId) || "",
                    },
                },
            };
        }
        else {
            return {
                success: false,
                message: res.data.message || "",
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data);
        return {
            success: false,
            message: ((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || "error",
        };
    }
};
exports.default = { CREATE };
