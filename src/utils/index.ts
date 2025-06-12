import * as Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import * as StoreReview from "expo-store-review";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

export const rateApp = async () => {
  const available = await StoreReview.isAvailableAsync();
  if (available) {
    const hasAction = await StoreReview.hasAction();
    if (hasAction) {
      await StoreReview.requestReview();
    }
  }
};
export const onFetchUpdateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    Alert.alert(
      Constants.default.name,
      error as any,
      [{ text: "OK", style: "destructive" }],
      { cancelable: false }
    );
  }
};

export const onImpact = async () =>
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export const calculateAge = (birthDateInput?: Date | string | number) => {
  const birthDate = new Date(birthDateInput ?? "");
  if (isNaN(birthDate.getTime())) {
    return 0;
  }
  const today = new Date();
  let age = today.getFullYear() - birthDate?.getFullYear();
  const m = today.getMonth() - birthDate?.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate?.getDate())) age--;
  return age;
};

export const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning 🌞";
  } else if (hour < 18) {
    return "Good afternoon 🌤️";
  } else {
    return "Good evening 🌙";
  }
};
