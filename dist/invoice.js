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
    var _a, _b, _c, _d, _e, _f, _g;
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
                            ((_a = res.data) === null || _a === void 0 ? void 0 : _a.invoice) || "",
                        mn: "https://ecommerce.golomtbank.com/payment/mn/" +
                            ((_b = res.data) === null || _b === void 0 ? void 0 : _b.invoice) || "",
                    },
                    url_socialpay: {
                        en: "https://ecommerce.golomtbank.com/socialpay/en/" +
                            ((_c = res.data) === null || _c === void 0 ? void 0 : _c.invoice) || "",
                        mn: "https://ecommerce.golomtbank.com/socialpay/mn/" +
                            ((_d = res.data) === null || _d === void 0 ? void 0 : _d.invoice) || "",
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
        console.log("FAILED", (_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.data);
        return {
            success: false,
            message: ((_g = (_f = error === null || error === void 0 ? void 0 : error.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.message) || "error",
        };
    }
};
const CHECKER = async (transactionId) => {
    var _a, _b, _c;
    try {
        const data = {
            checksum: "",
            transactionId: transactionId,
        };
        data.checksum = await hmac256(_1.default.key, `${data.transactionId}${data.transactionId}`);
        const res = await axios_1.default.post(`${_1.default.host}/api/inquiry`, data, {
            headers: {
                Authorization: `Bearer ${_1.default.token}`,
                "Content-Type": "application/json",
            },
        });
        if (res.data.errorCode == "000") {
            return {
                success: true,
                message: "success",
                data: res.data,
            };
        }
        else {
            return {
                success: false,
                message: res.data.errorDesc,
                data: res.data,
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const CARD_PAY = async (body) => {
    var _a, _b, _c;
    try {
        const data = {
            amount: body.amount,
            checksum: "",
            transactionId: await mongoObjectId(),
            lang: "en",
            token: body.token,
        };
        data.checksum = await hmac256(_1.default.key, `${data.amount}${data.transactionId}${data.token}`);
        const res = await axios_1.default.post(`${_1.default.host}/api/pay`, data, {
            headers: {
                Authorization: `Bearer ${_1.default.token}`,
                "Content-Type": "application/json",
            },
        });
        if (res.data.errorCode == "000") {
            return {
                success: true,
                message: "success",
                data: res.data,
            };
        }
        else {
            return {
                success: false,
                message: res.data.errorDesc,
                data: res.data,
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const CHECKER_CARD_PAY = async (transactionId) => {
    var _a, _b, _c;
    try {
        const data = {
            checksum: "",
            transactionId: transactionId,
        };
        data.checksum = await hmac256(_1.default.key, `${data.transactionId}${data.transactionId}`);
        const res = await axios_1.default.post(`${_1.default.host}/api/check`, data, {
            headers: {
                Authorization: `Bearer ${_1.default.token}`,
                "Content-Type": "application/json",
            },
        });
        if (res.data.errorCode == "000") {
            return {
                success: true,
                message: "success",
                data: res.data,
            };
        }
        else {
            return {
                success: false,
                message: res.data.errorDesc,
                data: res.data,
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
exports.default = { CREATE, CHECKER, CARD_PAY, CHECKER_CARD_PAY };
