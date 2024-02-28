import sgmail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgmail.setApiKey(process.env.SEND_GRID_API_KEY);

const msg = {
  to: "ejazahamed1998@gmail.com",
  from: "ejazahamed.shaik@outlook.com",
  subject: "This is my first email using sendgrid package",
  text: "Mailing using sendgrid is super easy",
  html: "<strong>Mailing using sendgrid is super easy</strong>",
};

sgmail
  .send(msg)
  .then(() => console.log("mail sent successfully"))
  .catch((e) => console.log(e));
