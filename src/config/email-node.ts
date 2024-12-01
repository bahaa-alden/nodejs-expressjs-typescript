import * as nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import { env_vars } from '../config';
import { IUser } from '../database/models/user.model';

export default class Email {
  private to: string;
  private firstName: string;
  private url: string;
  private from: string;
  private transporter: nodemailer.Transporter;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url || '';
    this.from = `Your Company <${env_vars.sender}>`;

    this.transporter = nodemailer.createTransport({
      host: env_vars.smtp.host,
      port: env_vars.smtp.port,
      secure: env_vars.smtp.secure, // true for 465, false for other ports
      auth: {
        user: env_vars.smtp.user,
        pass: env_vars.smtp.pass,
      },
    });
  }

  private async sendEmail(html: string, subject: string): Promise<void> {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    await this.transporter.sendMail(mailOptions);
  }

  public async sendWelcome(): Promise<void> {
    const html = `<html>
        <body>
          <h1>Welcome to the NameProject Family!</h1>
          <p>Hi ${this.firstName},</p>
          <p>We're excited to have you on board. Click the link below to get started:</p>
          <a href="${this.url}">Get Started</a>
          <p>Best regards,<br>Your Company Team</p>
        </body>
      </html>`;
    await this.sendEmail(html, 'Welcome to the NameProject Family!');
  }

  public async sendPasswordReset(resetCode: string): Promise<void> {
    const html = `<html>
        <body>
          <h1>Password Reset Request</h1>
          <p>Hi ${this.firstName},</p>
          <p>You requested to reset your password. Use the following code to reset it:</p>
          <h2>${resetCode}</h2>
          <p>This code is valid for only 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>Your Company Team</p>
        </body>
      </html>`;
    await this.sendEmail(
      html,
      'Your password reset token (valid for only 10 minutes)',
    );
  }
}
