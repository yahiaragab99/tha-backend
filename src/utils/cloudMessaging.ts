// import { getMessaging } from "firebase/messaging";
import admin from "firebase-admin";
export const sendPushNotification = async (
  title: string,
  body: string,
  deviceTokens: any
): Promise<any> => {
  try {
    const message = {
      tokens: deviceTokens,
      notification: {
        title: title,
        body: body,
      },
      apns: {
        payload: {
          aps: {
            alert: {
              title: title,
              body: body,
            },
            badge: 1,
            sound: "default",
          },
        },
      },
    };

    return admin
      .messaging()
      .sendEachForMulticast(message)
      .then((res) => {
        return { success: true, res: res };
      })
      .catch((error) => {
        return { success: false, error: error };
      });
  } catch (error) {
    console.error("Error sending push notification", error);
    throw error;
  }
};
