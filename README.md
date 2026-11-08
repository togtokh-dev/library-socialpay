# SocialPay

A Node.js and TypeScript client for the Golomt Bank **SocialPay** payment gateway — authenticate, create invoices, check payment status, charge saved card tokens, pull settlement details and refund transactions.

## Install

```bash
npm i @togtokh.dev/socialpay
```

## Features

- **Authentication** — exchange your merchant token and key for an access session (`auth.TOKEN`).
- **Invoice create** — generate a payment invoice with a QR/social deeplink (`invoice.CREATE`).
- **Status check** — poll an invoice transaction's payment status (`invoice.CHECKER`).
- **Card pay** — charge a saved card token directly (`invoice.CARD_PAY`) and check its status (`invoice.CHECKER_CARD_PAY`).
- **Social deeplink** — optionally return a SocialPay app deeplink when creating an invoice.
- **Settlement details** — fetch paginated settlement records for a merchant (`invoice.getSettlementDetails`).
- **Refund** — refund a completed transaction (`invoice.REFUND`).

## Quick start

```ts
import SOCIAL_PAY from "@togtokh.dev/socialpay";

async function main() {
  // Authenticate with your merchant credentials
  const authed = await SOCIAL_PAY.auth.TOKEN(
    "YOUR_SOCIALPAY_TOKEN",
    "YOUR_SOCIALPAY_KEY"
  );
  if (!authed.success) throw new Error(authed.message);

  // Create an invoice
  const created = await SOCIAL_PAY.invoice.CREATE({
    amount: 1000,
    callback: "https://example.com/callback",
    genToken: "Y",
    socialDeeplink: "Y",
  });
  if (!created.success) throw new Error(created.message);

  const transactionId = created.data!.transactionId;
  console.log("Invoice:", created.data!.invoice);
  console.log("Deeplink:", created.data!.socialDeeplink);

  // Check the invoice status
  const status = await SOCIAL_PAY.invoice.CHECKER(transactionId);
  console.log("Status:", status.message, status.data);
}

main().catch(console.error);
```

## API

The package default-exports a single object holding config values, an `auth` namespace and an `invoice` namespace. The `invoice` namespace is also available as a named export:

```ts
import SOCIAL_PAY, { invoice } from "@togtokh.dev/socialpay";
```

### Config

| Property | Type     | Description                       |
| -------- | -------- | --------------------------------- |
| `token`  | `string` | Access token set after `auth.TOKEN`. |
| `key`    | `string` | Merchant key set after `auth.TOKEN`.  |
| `host`   | `string` | Gateway base URL.                 |

### `auth`

#### `auth.TOKEN(token, key)`

```ts
TOKEN(token: string, key: string): Promise<{ success: boolean; message: string }>
```

Authenticates with your merchant `token` and `key` and prepares the client for subsequent calls.

### `invoice`

#### `invoice.CREATE(body)`

```ts
CREATE(body: {
  amount: string | number;
  callback: string;
  genToken: "Y" | "N";
  socialDeeplink: "Y" | "N";
}): Promise<{
  success: boolean;
  message: string;
  data?: {
    socialDeeplink?: string;
    checksum: string;
    invoice: string;
    transactionId: string;
    url: { en: string; mn: string };
  };
}>
```

Creates a payment invoice.

#### `invoice.CHECKER(transactionId)`

```ts
CHECKER(transactionId: string): Promise<{
  success: boolean;
  message: string;
  data?: any;
}>
```

Returns the current payment status for an invoice transaction.

#### `invoice.CARD_PAY(body)`

```ts
CARD_PAY(body: {
  amount: string | number;
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
}>
```

Charges a saved card `token` for the given `amount`.

#### `invoice.CHECKER_CARD_PAY(transactionId)`

```ts
CHECKER_CARD_PAY(transactionId: string): Promise<{
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
}>
```

Returns the status of a card payment transaction.

#### `invoice.getSettlementDetails(page, size, startDate, endDate, merchantId)`

```ts
getSettlementDetails(
  page: string,
  size: string,
  startDate: string,
  endDate: string,
  merchantId: string
): Promise<{
  success: boolean;
  message: string;
  data?: Array<{
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
  }>;
  pageable?: {
    first: boolean;
    last: boolean;
    totalPages: number;
    totalElements: number;
  };
}>
```

Returns paginated settlement records for a merchant within a date range.

#### `invoice.REFUND(transactionId)`

```ts
REFUND(transactionId: string): Promise<{
  success: boolean;
  message: string;
  data?: {
    statusCode: string;
    desc: string;
    txnId: string;
    merchantId: string;
  };
}>
```

Refunds a completed transaction.

## Response

Every method resolves to a promise of the same envelope:

```ts
Promise<{ success: boolean; message: string; data?: ... }>
```

Check `success` before using `data`; `message` carries the gateway's status text. The shape of `data` depends on the method, as shown above.

## License

ISC
