import nodemailer from 'nodemailer'

// Create transporter (for development, use ethereal.email)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'test@ethereal.email',
    pass: process.env.EMAIL_PASS || 'test-password',
  },
})

export async function sendVerificationEmail(email: string, code: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Fixed Float" <noreply@fixedfloat.com>',
    to: email,
    subject: 'Verify Your Email - Fixed Float',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Fixed Float</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Instant Cryptocurrency Exchange</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Verify Your Email Address</h2>
        
        <p style="color: #4b5563; margin-bottom: 20px;">
          Thank you for signing up! Please use the following verification code to complete your registration:
        </p>
        
        <div style="background-color: #f3f4f6; padding: 25px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 10px; margin: 30px 0; border-radius: 8px; color: #1f2937;">
          ${code}
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
          This code will expire in 24 hours.
        </p>
        
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          If you didn't request this verification, please ignore this email.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Fixed Float Team<br>
            <a href="https://fixedfloat.com" style="color: #2563eb;">https://fixedfloat.com</a>
          </p>
        </div>
      </div>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Verification email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending verification email:', error)
    return false
  }
}

export async function sendOrderConfirmation(email: string, orderId: string, details: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Fixed Float" <noreply@fixedfloat.com>',
    to: email,
    subject: `Order Confirmation - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Fixed Float</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Instant Cryptocurrency Exchange</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Order Confirmation</h2>
        
        <p style="color: #4b5563; margin-bottom: 20px;">
          Your exchange order has been created successfully. Here are your order details:
        </p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Order ID:</strong></td>
              <td style="padding: 8px 0; color: #1f2937;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>You Send:</strong></td>
              <td style="padding: 8px 0; color: #1f2937;">${details.fromAmount} ${details.fromCurrency}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>You Receive:</strong></td>
              <td style="padding: 8px 0; color: #1f2937;">${details.toAmount} ${details.toCurrency}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Exchange Rate:</strong></td>
              <td style="padding: 8px 0; color: #1f2937;">1 ${details.fromCurrency} = ${details.rate} ${details.toCurrency}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Status:</strong></td>
              <td style="padding: 8px 0; color: #10b981; font-weight: bold;">${details.status}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Commission:</strong></td>
              <td style="padding: 8px 0; color: #1f2937;">${details.commission} ${details.fromCurrency} (2%)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Network Fee:</strong></td>
              <td style="padding: 8px 0; color: #1f2937;">${details.networkFee} ${details.toCurrency}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #4b5563; margin-bottom: 20px;">
          You can track your order status using your Order ID on our website.
        </p>
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="color: #1e40af; margin: 0; font-size: 14px;">
            <strong>Important:</strong> Please complete your payment within 30 minutes to avoid order cancellation.
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Need help? Contact our support team at <a href="mailto:support@fixedfloat.com" style="color: #2563eb;">support@fixedfloat.com</a><br>
            Fixed Float Team • <a href="https://fixedfloat.com" style="color: #2563eb;">https://fixedfloat.com</a>
          </p>
        </div>
      </div>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Order confirmation email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending order confirmation:', error)
    return false
  }
}

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Fixed Float" <noreply@fixedfloat.com>',
    to: email,
    subject: 'Reset Your Password - Fixed Float',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Fixed Float</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Instant Cryptocurrency Exchange</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Reset Your Password</h2>
        
        <p style="color: #4b5563; margin-bottom: 20px;">
          You requested to reset your password. Click the button below to create a new password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
          Or copy and paste this link in your browser:
        </p>
        
        <p style="color: #2563eb; font-size: 14px; word-break: break-all; margin: 0;">
          ${resetLink}
        </p>
        
        <div style="background-color: #fef3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="color: #92400e; margin: 0; font-size: 14px;">
            <strong>Note:</strong> This link will expire in 1 hour for security reasons.
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            If you didn't request this reset, please ignore this email.<br>
            Fixed Float Team • <a href="https://fixedfloat.com" style="color: #2563eb;">https://fixedfloat.com</a>
          </p>
        </div>
      </div>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Password reset email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return false
  }
}