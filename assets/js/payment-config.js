/*
  PAYMENT DETAILS shown on pay.html — fill in REAL values from the owner.
  These are public (they appear on the website), so use the business's own accounts.
  Leave a value as "" and that method is simply hidden; if all are empty the page
  tells riders to call (803) 549-8920 instead.

    zelle      the email address or U.S. phone number registered with Zelle
               e.g. "billing@example.com"
    cashApp    the business $cashtag
               e.g. "$YourBusinessName"
    squareLink a Square payment link (Square Dashboard > Payment Links)
               e.g. "https://square.link/u/xxxxxxxx"
*/
window.OCT_PAYMENT = {
  zelle: "",
  cashApp: "",
  squareLink: ""
};
