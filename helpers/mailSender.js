import nodemailer from 'nodemailer'

export const mailSender = (email, token) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        });
        let details = {
            from: 'mirzeyevalican1@gmail.com',
            to: `${email}`,
            subject: "Password Recovery",
            html: `
            <a href="http://localhost:6060/account/recover/${token}">Token</a>`,
        }
        mailTransporter.sendMail(details, (err) => {
            if (err) {
                return res.status(404).send(err.message)
            } else {
                return res.status(200).send('Message send')
            }
        })
    } catch (error) {
        return res.status(400).send('Nodemailer: Error')
    }
}