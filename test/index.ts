import SOCIAL_PAY from "../src/index";
import { invoice } from "../src/index";

SOCIAL_PAY.auth
  .TOKEN(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNRVJDSEFOVF9BX0JVWUFOVE9HVE9LSCIsImlhdCI6MTY3NTY3NjkxNX0.hG4YTn7lgs558L6FqEKBhfo5-toutz8uLTKaOkA2PPc",
    "MKZf$)AQmiYAEbBd"
  )
  .then(async (r) => {
    const res = await SOCIAL_PAY.invoice.CREATE({
      callback: "http://www.google.com",
      amount: 4,
      genToken: "Y",
      socialDeeplink: "Y",
    });
    console.log("res", res);
    // const res = await SOCIAL_PAY.invoice.CREATE.DEEP_LINK({
    //   callback: "http://www.google.com",
    //   orderId: "25772338780",
    //   amount: 4,
    //   notes: "dpp",
    // });
    // console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
