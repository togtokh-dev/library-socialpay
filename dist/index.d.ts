declare const _default: {
    token: string;
    key: string;
    host: string;
    auth: {
        TOKEN: (token: string, key: string) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    invoice: {
        CREATE: (body: {
            amount: string | number;
            callback: string;
            genToken: "Y" | "N";
            socialDeeplink: "Y" | "N";
        }) => Promise<{
            success: boolean;
            message: string;
            data?: {
                socialDeeplink?: string;
                checksum: string;
                invoice: string;
                transactionId: string;
                url: {
                    en: string;
                    mn: string;
                };
            };
        }>;
        CHECKER: (transactionId: string) => Promise<{
            success: boolean;
            message: string;
            data?: any;
        }>;
        CARD_PAY: (body: {
            amount: string | number;
            token: string;
        }) => Promise<{
            success: boolean;
            message: string;
            data?: any;
        }>;
        CHECKER_CARD_PAY: (transactionId: string) => Promise<{
            success: boolean;
            message: string;
            data?: any;
        }>;
    };
};
export default _default;
export { default as invoice } from "./invoice";
