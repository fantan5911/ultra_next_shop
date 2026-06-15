import nodemailer, { Transporter } from "nodemailer";
import { ENV } from "../env";

class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "ruby.heaney@ethereal.email",
        pass: "KEEcuWQBpyt6qXmgmn",
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: "fletcher.bogan@ethereal.email",
      to,
      subject: `Активация активация аккаунта на ${ENV.API_URL}`,
      text: "",
      html: `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
  }
}

export default new MailService();
