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
};
export default _default;
