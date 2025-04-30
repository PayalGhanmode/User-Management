import { createTransport } from "nodemailer" 
const transporter = createTransport({
    service: "gmail",
    auth: {
        user: 'payalghanmode1@gmail.com',
        pass: 'nxdnxfswtncshvqz'
    }
})

const sendMailToNewUSer = async (to, subject, text) => {
    const mailOptions = {
        from: "payalghanmode1@gmail.com",
        to: to,
        subject: subject,
        text: text
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        return { status: true }
    } catch (error) {
        return { status: false }
    }
}




export default sendMailToNewUSer;