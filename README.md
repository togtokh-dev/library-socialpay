# SOCIAL_PAY

<!-- ![Alt text](https://uploads.togtokh.dev/uploads/test/image/png/65ebcfb20ed6870daf906fb9.png) -->

## Example

```bash
    import SOCIAL_PAY from "@togtokh.dev/SOCIAL_PAY";

    SOCIAL_PAY.auth
    .TOKEN("staging", {
      username: "",
      password: "",
      merchant_id: "63355157543e6b7d9e7ba95b",
      third_party_token: "---",
      spose_token: "",
    })
    .then(async (r) => {
      const res = await SOCIAL_PAY.invoice.CREATE.QR({
        callback: "http://www.google.com",
        orderId: "25772338780",
        amount: 4,
        notes: "dpp",
      });
      console.log(res);
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

```

## CALLBACK

```bash
    export const callback = async (req: Request, res: Response) => {
      const {
        orderID,
        orderId,
        transactionID,
        status,
        statusCode,
        transRequestId,
        token,
        amount,
        requestId,
      } = req.body;
      console.log(req.body);
      if (requestId) {
      } else {
      }
    };

```
