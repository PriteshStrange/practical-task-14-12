const path = require("path");
const ejs = require("ejs");
const sendEmail = require("./emailSender");

const remainderEmail = async (options) => {
    const { email, title, description, userName } = options;

    const templatePath = path.join(__dirname, "../lib/template/remainder.ejs")
    const data = await ejs.renderFile(templatePath, { email, userName, title, description });

    await sendEmail({
        email,
        subject: 'Remainder',
        message: data
    })
}

module.exports = {
    remainderEmail,
}