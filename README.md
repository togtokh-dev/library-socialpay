# SOCIAL_PAY

<!-- ![Alt text](https://uploads.togtokh.dev/uploads/test/image/png/65ebcfb20ed6870daf906fb9.png) -->

## Example

```bash
    import SOCIAL_PAY from "@togtokh.dev/SOCIAL_PAY";

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
      })
      .catch((e) => {
        console.log(e);
      });


```
