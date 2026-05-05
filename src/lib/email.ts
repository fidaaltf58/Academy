// Email notification placeholder
// To use real email, install nodemailer and configure SMTP credentials

export async function sendBookingConfirmation(email: string, name: string, date: string, time: string, service: string) {
  console.log(`📧 [EMAIL PLACEHOLDER] Booking confirmation sent to ${email}`);
  console.log(`   Name: ${name}`);
  console.log(`   Service: ${service}`);
  console.log(`   Date: ${date} at ${time}`);
  // TODO: Replace with real email service (nodemailer, SendGrid, etc.)
}

export async function sendBookingStatusUpdate(email: string, name: string, status: string) {
  console.log(`📧 [EMAIL PLACEHOLDER] Booking status update sent to ${email}`);
  console.log(`   Name: ${name}`);
  console.log(`   Status: ${status}`);
}
