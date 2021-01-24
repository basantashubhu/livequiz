import mailjet from 'node-mailjet'

class Mailjet {
    private mailjet
    private _subject = ""

    constructor() {
        this.mailjet = mailjet.connect('57281faeb8da33de0fef14df9765b77d', '20da7cbe1c3c8e090fd82802f3c367c2')
    }

    subject(subject: string) {
        this._subject = subject
    }

    send(to: { Name: string, Email: string }, html: string) {
        return this.mailjet.post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "livequiznepal@gmail.com",
                            "Name": "Live Quiz Team"
                        },
                        "To": [to],
                        "Subject": this._subject,
                        "CustomID": "AppGettingStartedTest",
                        "HTMLPart": html
                    }
                ]
            })
    }
}

export default new Mailjet


/* 
    const transporter = Transporter.create()

    transporter.sendMail({
        to: user.email,
        from: Transporter.from(),
        subject: 'Please confirm your email address',
        html: `<p><strong>Thanks for signing up to Live Quiz, We are happy to have you.</strong></p>
                <p>Please take a second to make sure we have your correct email address. <br/></p>
                <p><a href="${this.BASE_URL}/email/confirm/${user.id}?email=${user.email}"><strong>Confirm your email address</strong></a><br/></p>
                <p>Or try this code,</p>
                <p>Code : ${code} <br/><br/></p>
                <p>If you did not sign up for Live Quiz Account, you can safely ignore this email.</p>
                <p>Yours truly, <br/>
                Live Quiz Team <br/>
                <a href="${this.BASE_URL}">${this.BASE_URL}</a> <br/>
                The Drive to Develop</p>`

    }).then(function (info: SentMessageInfo) {

        const resetEmail = new ResetEmail({
            messageId: info.messageId,
            messageUrl: nodemailer.getTestMessageUrl(info)
        })
        resetEmail.save()
        response.send(user)

    }, function (err: any) {
        response.status(500).send({ message: err.message })
    }) 
*/
