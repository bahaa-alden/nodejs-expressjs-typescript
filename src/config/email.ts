import { Recipient, EmailParams, MailerSend, Sender } from 'mailersend';
import { htmlToText } from 'html-to-text';
import { env_vars } from '../config';
import { IUser } from '../database/models/user.model';

export default class Email {
  private to: string;
  private firstName: string;
  private url: string;
  private from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url || '';
    this.from = `MAS`;
  }

  private async sendEmail(html: string, subject: string): Promise<void> {
    const mailersend = new MailerSend({
      apiKey: env_vars.email_key,
    });

    const recipients = [new Recipient(this.to, 'Recipient')];
    const sender = new Sender(env_vars.sender, 'Sender');

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(html)
      .setText(htmlToText(html));

    await mailersend.email.send(emailParams);
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
