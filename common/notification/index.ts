import axios from "axios";
import { otherBackend } from "..";

export const sendNotificationToOtherBackend = async (notification: any) => {
  await axios.post(otherBackend, {
    roomId: notification.userId,
    title: notification.title,
    type: notification.type,
    message: notification.message,
    createdAt: notification.createdAt,
  });
};
