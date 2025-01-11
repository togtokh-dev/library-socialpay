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
    getSettlementDetails: (page: string, size: string, startDate: string, endDate: string, merchantId: string) => Promise<{
        success: boolean;
        message: string;
        data?: {
            id: number;
            merchantId: string;
            terminalId: string;
            batchNumber: string;
            invoiceNumber: string;
            cardNumber: string;
            token: string;
            amount: string;
            merchantInvoice: string;
            respCode: string;
            respDesc: string;
            tranTime: string;
            tranDate: string;
            sysReference: string;
            approvalCode: string;
            freeText1: string;
            freeText2: string;
            freeText3: string;
            requestDate: string;
            reversedDate: string;
            checkedDate: string;
            transferStatus: string;
        }[];
        pageable?: {
            first: true;
            last: true;
            totalPages: 1;
            totalElements: 1;
        };
    }>;
};
export default _default;
