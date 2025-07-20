import type { sendNotificationProps } from "../types/services/notification";

const sendNotification = ({ title, message, icon }: sendNotificationProps) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: icon || "/favicon.ico",
    });
  }
};

export default sendNotification;
