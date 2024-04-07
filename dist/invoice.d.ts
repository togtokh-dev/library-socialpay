type createT = {
    amount: number | string;
    callback: string;
    genToken: "Y" | "N";
    socialDeeplink: "Y" | "N";
};
type createBackT = {
    socialDeeplink?: string;
    checksum: string;
    invoice: string;
    transactionId: string;
    url: {
        en: string;
        mn: string;
    };
};
declare const _default: {
    CREATE: (body: createT) => Promise<{
        success: boolean;
        message: string;
        data?: createBackT;
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
        data?: {
            amount: string;
            approvalCode: string;
            errorDesc: string;
            checksum: string;
            errorCode: string;
            transactionId: string;
            cardNumber: string;
        };
    }>;
    CHECKER_CARD_PAY: (transactionId: string) => Promise<{
        success: boolean;
        message: string;
        data?: {
            amount: string;
            errorDesc: string;
            checksum: string;
            errorCode: string;
            transactionId: string;
            cardNumber: string;
            token: string;
        };
    }>;
};
export default _default;
