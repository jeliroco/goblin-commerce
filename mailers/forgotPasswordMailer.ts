/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import { SendEmailRequest } from "aws-sdk/clients/ses"
import ses from "integrations/amazonSES"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/auth/reset-password?token=${token}`

  const msg: SendEmailRequest = {
    Source: "admin@goblincore.biz",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: "Your Password Reset Instructions",
      },
      Body: {
        Html: {
          Data: `
          <h1>Reset Your Password</h1>
          <h3>NOTE: You must set up a production email integration in mailers/forgotPasswordMailer.ts</h3>
    
          <a href="${resetUrl}">
            Click here to set a new password
          </a>
        `,
        },
      },
    },
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        await ses.sendEmail(msg, (err, data) => {
          if (err) {
            throw new Error(
              "Problem with SES integration in mailers/forgotPasswordMailer: " + err.stack
            )
          }
          if (data) {
            console.log("Email sent! Message ID: ", data.MessageId)
          }
        })
      } else {
        // Preview email in the browser
        // const previewEmail = (await import("preview-email")).default
        // await previewEmail(msg)
      }
    },
  }
}
