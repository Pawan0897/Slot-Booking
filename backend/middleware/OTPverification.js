const otp = require("./OTP");
const nodemailer = require("nodemailer");
const { SLOTADMIN } = require("../modal/admin.modal");

const OTP = otp();
console.log(OTP, "kpkpkpkp");

const OTPverification = async (email, res) => {
    try {
        const tranporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "pawankumarwebdev@gmail.com",
                pass: "fkqh ljbi pvuc qjpj",
            },
        });
        const mailOptions = {
            from: "pawankumarwebdev@gmail.com",
            to: email,
            subject: "Verify OTP ",
            html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">🔐 Verify Your OTP</h2>
    
      <p style="font-size: 16px; color: #555; text-align: center;">
        Please use the following OTP to complete your action:
      </p>
      <div style="font-size: 28px; font-weight: bold; color: #fff; background: #4CAF50; padding: 10px 20px; text-align: center; border-radius: 6px; display: inline-block; margin: 20px auto;">
        ${OTP}
      </div>
      
    </div>
  `
        };

        tranporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                return res.send({
                    message: `${error},Something is wrong!!`,
                    statucode: 500,
                });
            } else {
                await SLOTADMIN.updateOne({ Email: email }, { $set: { OTP: OTP } });
                return res.send({
                    statuscode: 200,
                    message: "OTP Send !!!",
                    text: `OTP send successfully !!!`,
                });
            }
        });
    } catch (error) {
        return res.send({
            statucode: 500,
            message: `Something is wrong !!! ${error}`,
        });
    }
};

module.exports = OTPverification;
