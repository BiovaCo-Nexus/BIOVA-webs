const BREVO_API_KEY = "xsmtpsib-5670cde0d1a9f4ae5c0a06dcceb5b2bb364341873e47fea70df78352ec552cce-sDpjsMM4fBvsxEky";
const emailData = {
  sender: { name: "BiovaCo", email: "no-reply@biovaco.in" },
  to: [{ email: "nakulmundhada23@gmail.com", name: "Nakul" }],
  subject: "Test Email",
  htmlContent: "<p>This is a test</p>"
};

fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: {
    accept: "application/json",
    "api-key": BREVO_API_KEY,
    "content-type": "application/json"
  },
  body: JSON.stringify(emailData)
}).then(res => res.text()).then(console.log).catch(console.error);
