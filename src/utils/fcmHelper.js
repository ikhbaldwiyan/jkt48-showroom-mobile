import messaging from '@react-native-firebase/messaging';
import useAuthStore from "../store/authStore";
import { updateDetailUser } from "../services/auth";

const userProfile = useAuthStore.getState().userProfile;
const setUserProfile = useAuthStore.getState().setUserProfile;

export async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken;
  } else {
    console.log('Failed to get FCM token');
    return null;
  }
}

export async function updateFcmToken(userId, fcmToken) {
  try {
    await updateDetailUser(userId, {
      fcm_token: fcmToken,
    });
    console.log('FCM token updated successfully');
  } catch (error) {
    console.error('Error updating FCM token:', error);
  } finally {
    setUserProfile({
      ...userProfile,
      fcm_token: fcmToken,
    })
  }
}

export async function handleFcmTokenUpdate() {
  if (!userProfile || !userProfile.user_id) {
    console.log('No user session found');
    return;
  }

  const currentFcmToken = await getFcmToken();
  if (!currentFcmToken) {
    console.log('Failed to retrieve current FCM token.');
    return;
  }

  // Check if the FCM token is missing or has changed
  if (!userProfile?.fcm_token || userProfile?.fcm_token !== "" || currentFcmToken !== userProfile?.fcm_token) {
    console.log('Updating FCM token...');
    await updateFcmToken(userProfile.user_id, currentFcmToken);
  } else {
    // console.log('FCM token is up-to-date.');
  }
} 