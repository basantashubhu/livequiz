import nodemailer, {TestAccount} from 'nodemailer'

class Transporter {
    host : string = "smtp.ethereal.email"
    port : number = 587
    secure : boolean = false
    auth : {
        user : string, pass : string
    } = {
        user : "bxvaat4b5ojdj4kc@ethereal.email",
        pass : "FMxPKqZ6H9CZTfQaRw"
    }

    from(fromName : string|null = null, fromAddress : string|null = null) {
        if (!fromName && process.env.MAIL_FROM_NAME) {
            fromName = process.env.MAIL_FROM_NAME
        }
        if(!fromAddress && process.env.MAIL_FROM_ADDRESS) {
            fromAddress = process.env.MAIL_FROM_ADDRESS
        }

        return `"${ fromName }" <${ fromAddress }>`
    }

    create() {
        return nodemailer.createTransport({
            host : this.host,
            port : this.port,
            secure : this.secure,
            auth : this.auth
        })
    }
}

export default new Transporter()