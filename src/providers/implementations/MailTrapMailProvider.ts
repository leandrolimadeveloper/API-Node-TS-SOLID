import { IMailProvider, IMessage } from "../IMailProvider";
import nodeMailer from 'nodemailer'

export class MailTrapMailProvider implements IMailProvider {
    private transporter
    
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '9b2fa9c4ecbd72',
                pass: '165fc51a8b5d22'
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}