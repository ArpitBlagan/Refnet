import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendNotificationTroughEmail = async (
  notification: any,
  to: string
) => {
  try {
    const res = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: notification.title,
      html: `<strong>${notification.message}</strong>`,
    });
    console.log("Email sent successfully:", res);
  } catch (err) {
    console.log(err);
  }
};
