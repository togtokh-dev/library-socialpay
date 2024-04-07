# SOCIAL_PAY

<!-- ![Alt text](https://uploads.togtokh.dev/uploads/test/image/png/65ebcfb20ed6870daf906fb9.png) -->

## Example

```bash
    import SOCIAL_PAY from "@togtokh.dev/SOCIAL_PAY";

    SOCIAL_PAY.auth
      .TOKEN(
        ""
      )
      .then(async (r) => {
        const res = await SOCIAL_PAY.invoice.CREATE({
          callback: "http://www.google.com",
          amount: 4,
          genToken: "Y",
          socialDeeplink: "Y",
        });
        console.log("res", res);
      })
      .catch((e) => {
        console.log(e);
      });


```
