import nodemailer from "nodemailer"
import { getSettings } from "./settings"

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const settings = await getSettings()

    if (!settings.smtpHost || !settings.smtpUsername) {
      console.log("SMTP not configured, email not sent:", options.subject)
      return false
    }

    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: settings.smtpSecure,
      auth: {
        user: settings.smtpUsername,
        pass: settings.smtpPassword,
      },
    })

    await transporter.sendMail({
      from: `"${settings.emailFromName}" <${settings.emailFromAddress}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    return true
  } catch (error) {
    console.error("Email send error:", error)
    return false
  }
}

export function parseEmailTemplate(template: string, variables: Record<string, string>): string {
  let result = template
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value)
  })
  return result
}
