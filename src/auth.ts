import axios from "axios";
import SOCIAL_PAY from "./";

const TOKEN = async (
  token: string,
  key: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  SOCIAL_PAY.host = "https://ecommerce.golomtbank.com";
  try {
    SOCIAL_PAY.token = token;
    SOCIAL_PAY.key = key;
    return {
      success: true,
      message: "success"
    };
  } catch (error) {
    return {
      success: false,
      message: "error"
    };
  }
};
export default { TOKEN };
