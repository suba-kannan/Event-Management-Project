import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

export const sendBookingConfirmation = async (userEmail: string, eventName: string, participants: number, totalPrice: number) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Booking Confirmation',
    text: `Your booking for the event "${eventName}" has been confirmed. \n\nParticipants👤: ${participants} \nTotal Price💵: ₹${totalPrice}.`, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendBookingCancellation = async (userEmail: string, eventName: string, participants: number) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Booking Cancellation',
    text: `Your booking for the event "${eventName}" has been successfully canceled. \n\nParticipants👤: ${participants}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking cancellation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
