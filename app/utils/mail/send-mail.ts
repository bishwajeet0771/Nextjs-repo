import axios from "axios";
// import Link from "next/link";

const baseUrl = "https://info.getrightproperty.com/send_email";
// const endpoint = ""; // API endpoint

export async function sendEmail(mailerData: any, selectedJob: any) {
//   const message = `
//     <html>
//         <body>
//             <p><strong>${mailerData.get(
//               "fullName"
//             )}</strong> is applying with the email address <Link prefetch={false} rel="noopener noreferrer" href="mailto:${mailerData.get(
//     "email"
//   )}">${mailerData.get("email")}</Link> and phone number ${mailerData.get(
//     "phone"
//   )}.</p>
//             <p>They have ${mailerData.get(
//               "experience"
//             )} years of experience.</p>
//             <p><strong>Cover Letter:</strong> ${mailerData.get(
//               "coverLetter"
//             )}</p>
//             <p><strong>Resume Link:</strong> <a href="${mailerData.get(
//               "resumeUrl"
//             )}">${mailerData.get("resumeUrl")}</a></p>
//         </body>
//     </html>
// `;

  // Attach the HTML message

  try {
    // Email data to be sent
    console.log(mailerData, selectedJob);

    const message = `
         <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exciting New Job Application</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #f0f4f8; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">
                        New Talent Alert for ${selectedJob.department}
                    </h1>
                </td>
            </tr>
        </table>

        <!-- Content -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 30px;">
            <tr>
                <td>
                    <h2 style="color: #4a5568; font-size: 24px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">
                        Application for ${selectedJob.title}
                    </h2>

                    <p style="margin-bottom: 25px; font-size: 16px; color: #4a5568;">
                        <span style="display: inline-block; background-color: #ebf4ff; color: #4299e1; padding: 5px 10px; border-radius: 20px; font-weight: 600;">${mailerData.get(
                          "fullName"
                        )}</span> 
                        has submitted an application.
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                        <tr>
                            <td width="30%" style="padding: 10px; background-color: #f7fafc; font-weight: 600; color: #4a5568;">Email:</td>
                            <td style="padding: 10px;"><a href="mailto:${mailerData.get(
                              "email"
                            )}" style="color: #4299e1; text-decoration: none;">${mailerData.get(
      "email"
    )}</a></td>
                        </tr>
                        <tr>
                            <td width="30%" style="padding: 10px; background-color: #f7fafc; font-weight: 600; color: #4a5568;">Phone:</td>
                            <td style="padding: 10px;">${mailerData.get(
                              "phone"
                            )}</td>
                        </tr>
                        <tr>
                            <td width="30%" style="padding: 10px; background-color: #f7fafc; font-weight: 600; color: #4a5568;">Experience:</td>
                            <td style="padding: 10px;">${mailerData.get(
                              "experience"
                            )} years</td>
                        </tr>
                    </table>
                    
                    <h3 style="color: #4a5568; font-size: 20px; margin-top: 30px; margin-bottom: 15px; font-weight: 600;">Cover Letter</h3>
                    <div style="background-color: #f7fafc; border-left: 4px solid #4299e1; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                        <p style="margin: 0; font-size: 16px; color: #4a5568; line-height: 1.8;">${mailerData.get(
                          "coverLetter"
                        )}</p>
                    </div>
                     <p style="margin: 0; font-size: 16px; color: #4a5568; line-height: 1.8;">${mailerData.get(
                       "resumeUrl"
                     )}</p>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td align="center">
                                <a href="${mailerData.get(
                                  "resumeUrl"
                                )}" style="display: inline-block; background-color: #4299e1; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: 600; font-size: 16px; transition: background-color 0.3s ease;">View Resume</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <!-- Footer -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="background-color: #2d3748; padding: 30px; text-align: center;">
                    <p style="margin: 0; color: #a0aec0; font-size: 14px;">This is an automated notification. Please do not reply to this email.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>

        `;

    // Prepare the email data
    const emailData = {
      from: "info@getrightproperty.com",
      to_address: "rahulrpclan@gmail.com",
      subject: selectedJob.title,
      message: message,
      src: "Proper Sending",
    };

    const dataResult = await axios.post(baseUrl, emailData, {
      headers: {
        "Content-Type": "application/json", // Make sure it's application/json
      },
    });

    console.log("Email sent successfully:", dataResult.data);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
