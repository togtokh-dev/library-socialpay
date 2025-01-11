import axios from "axios";
import SOCIAL_PAY from ".";
import { createHmac } from "crypto";
const hmac256 = async (key: string, message: string) => {
  const hash = createHmac("sha256", key).update(message);
  return hash.digest("hex");
};
const mongoObjectId = async () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

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

const CREATE = async (
  body: createT
): Promise<{
  success: boolean;
  message: string;
  data?: createBackT;
}> => {
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
    data.checksum = await hmac256(
      SOCIAL_PAY.key,
      `${data.transactionId}${data.amount}${data.returnType}${data.callback}`
    );
    const res = await axios.post(`${SOCIAL_PAY.host}/api/invoice`, data, {
      headers: {
        Authorization: `Bearer ${SOCIAL_PAY.token}`,
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
            en:
              "https://ecommerce.golomtbank.com/payment/en/" +
                res.data?.invoice || "",
            mn:
              "https://ecommerce.golomtbank.com/payment/mn/" +
                res.data?.invoice || "",
          },
          url_socialpay: {
            en:
              "https://ecommerce.golomtbank.com/socialpay/en/" +
                res.data?.invoice || "",
            mn:
              "https://ecommerce.golomtbank.com/socialpay/mn/" +
                res.data?.invoice || "",
          },
        },
      };
    } else {
      return {
        success: false,
        message: res.data.message || "",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
const CHECKER = async (
  transactionId: string
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    const data = {
      checksum: "",
      transactionId: transactionId,
    };
    data.checksum = await hmac256(
      SOCIAL_PAY.key,
      `${data.transactionId}${data.transactionId}`
    );
    const res = await axios.post(`${SOCIAL_PAY.host}/api/inquiry`, data, {
      headers: {
        Authorization: `Bearer ${SOCIAL_PAY.token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.errorCode == "000") {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: res.data.errorDesc,
        data: res.data,
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
const CARD_PAY = async (body: {
  amount: number | string;
  token: string;
}): Promise<{
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
}> => {
  try {
    const data = {
      amount: body.amount,
      checksum: "",
      transactionId: await mongoObjectId(),
      lang: "en",
      token: body.token,
    };
    data.checksum = await hmac256(
      SOCIAL_PAY.key,
      `${data.amount}${data.transactionId}${data.token}`
    );
    const res = await axios.post(`${SOCIAL_PAY.host}/api/pay`, data, {
      headers: {
        Authorization: `Bearer ${SOCIAL_PAY.token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.errorCode == "000") {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: res.data.errorDesc,
        data: res.data,
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
const CHECKER_CARD_PAY = async (
  transactionId: string
): Promise<{
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
}> => {
  try {
    const data = {
      checksum: "",
      transactionId: transactionId,
    };
    data.checksum = await hmac256(
      SOCIAL_PAY.key,
      `${data.transactionId}${data.transactionId}`
    );
    const res = await axios.post(`${SOCIAL_PAY.host}/api/check`, data, {
      headers: {
        Authorization: `Bearer ${SOCIAL_PAY.token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.errorCode == "000") {
      return {
        success: true,
        message: "success",
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: res.data.errorDesc,
        data: res.data,
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
const getSettlementDetails = async (
  page: string,
  size: string,
  startDate: string,
  endDate: string,
  merchantId: string
): Promise<{
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
}> => {
  try {
    // Request data
    const data = {
      checksum: "",
      token: SOCIAL_PAY.token,
      merchantId: merchantId,
    };

    // Generate checksum
    data.checksum = await hmac256(
      SOCIAL_PAY.key,
      `${data.merchantId}${data.token}`
    );

    // Log API endpoint and request data (optional for debugging)
    console.log(
      `${SOCIAL_PAY.host}/api/getSettlementDetails?page=${page}&size=${size}&start=${startDate}&end=${endDate}`
    );
    console.log("Request data:", data);

    // Send POST request
    const res = await axios.post(
      `${SOCIAL_PAY.host}/api/getSettlementDetails?page=${page}&size=${size}&start=${startDate}&end=${endDate}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${SOCIAL_PAY.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle success response
    if (res.data.errorCode === "000") {
      return {
        success: true,
        message: "Request successful",
        data: res.data.content,
        pageable: res.data.pageable,
      };
    } else {
      return {
        success: false,
        message: res.data.errorDesc || "Unknown error",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
export default {
  CREATE,
  CHECKER,
  CARD_PAY,
  CHECKER_CARD_PAY,
  getSettlementDetails,
};
