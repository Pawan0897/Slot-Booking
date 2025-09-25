const nodemailer = require("nodemailer");
const SendMail = async (body, res) => {
    try {
        const { data, mail, time, date } = body;
        const tranporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "pawankumarwebdev@gmail.com",
                pass: "fkqh ljbi pvuc qjpj",
            },
        });
        // ************* send mail
        const EmailOptions = {
            from: "hr@5waydigitsolution.com",
            to: mail,
            subject: `Your Appointment is Confirmed – [${date} & ${time}]`,
            html: `
  
  <div style="border: 2px solid grey; width: 50%; margin: auto; padding: 20px; font-family: Arial, sans-serif;">
    
    <h1 style="text-align: center; font-size: 22px; margin: 0 0 20px 0;">
      Thank you for booking with us! 🎉
    </h1>

    <p style="font-weight: 700; font-size: 16px; margin: 20px 0; text-align: center;">
      Your slot has been successfully booked on 
      <strong style="color: #ff8904; font-size: 16px;">${date}</strong> 
      at <strong style="color: #ff8904; font-size: 16px;">${time}</strong>.
    </p>

    <p style="font-weight: 600; margin: 20px 0; font-size: 16px; text-align: center;">
      We look forward to seeing you then. If you have any questions or need 
      to reschedule, please feel free to reply to this email.
    </p>

    <p style="margin: 4px 0 0 10px; font-size: 16px;">
      <strong>Best Regards</strong>
    </p>
    <p style="margin: 4px 0 0 10px; font-size: 16px;">
      <strong>Pawan Kumar</strong>
    </p>
    <p style="margin: 4px 0 0 10px; font-size: 16px;">
      <strong>hr@5waydigitsolution.com</strong>
    </p>
    <p style="margin: 4px 0 0 10px; font-size: 16px; color: #ff8904;">
      <strong>5WayDigit Solution</strong>
    </p>

  </div>


            `,
        };
        /**************************** */
        tranporter.sendMail(EmailOptions, async function (error, info) {
            if (error) {
                return res.send({
                    statuscode: 500,
                    message: `${error} Something was wrong !!!`,
                });
            } else {
                /******************** save the data in mail  */
                const savedata = await data.save();
                return res.send({
                    statuscode: 200,
                    message: "Thank You! Your Slot is Booked",
                    text: "Thank you for booking with us! 🎉",
                    data: savedata,
                });
            }
        });
    } catch (err) {
        return res.send({
            statucode: 500,
            message: `${err} Something is wrong!!!`,
        });
    }
};
module.exports = SendMail;
