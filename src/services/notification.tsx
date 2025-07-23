import type { sendNotificationProps } from "../types/services/notification";
import visionCareIcon from "../assets/images/vision-care.png";

const sendNotification = ({ title, message, icon }: sendNotificationProps) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: icon || visionCareIcon,
    });
  }
};

export default sendNotification;
