import { COLORS, FONTS, Fonts } from "@/src/constants";
import { useMeStore } from "@/src/store/meStore";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { loadAsync } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, Platform, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: false,
  }),
});

const Layout = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);
  React.useEffect(() => {
    async function prepare() {
      try {
        await loadAsync(Fonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <RootLayout />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default Layout;
const RootLayout = () => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { me } = useMeStore();

  // React.useEffect(() => {
  //   registerForPushNotificationsAsync().then(async (token) => {
  //     if (!!token && settings.notifications && !!me) {
  //       const today = new Date().toISOString().split("T")[0];
  //       const scheduledDate = await AsyncStorage.getItem(
  //         STORAGE_NAME.NOTIFICATION_FLAG_KEY
  //       );
  //       if (scheduledDate !== today) {
  //         await scheduleDailyNotification({
  //           body: `👋 Good morning, ${me.nickname}. Track your daily GPA.`,
  //           subtitle: ''
  //         });
  //         await AsyncStorage.setItem(STORAGE_NAME.NOTIFICATION_FLAG_KEY, today);
  //       }
  //     }
  //   });
  // }, [me, settings]);

  React.useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (_notification) => {}
    );
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((_response) => {
        router.navigate({
          pathname: "/(app)",
        });
      });
    return () => {
      responseListener.remove();
      notificationListener.remove();
    };
  }, []);

  React.useEffect(() => {
    if (!!me && me.completed) {
      router.replace("/(app)");
    }
  }, []);

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(basic)/nickname" options={{ headerShown: false }} />
      <Stack.Screen name="(basic)/dob" options={{ headerShown: false }} />
      <Stack.Screen name="(basic)/gender" options={{ headerShown: false }} />
      <Stack.Screen name="(common)/profile" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />

      <Stack.Screen
        options={{
          presentation: Platform.select({
            ios: "modal",
            android: "fullScreenModal",
          }),
          headerTitle: "Term and Conditions",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.black,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPressIn={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/");
                }
              }}
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
          ),
        }}
        name="(common)/tnc"
      />

      <Stack.Screen
        options={{
          presentation: Platform.select({
            ios: "modal",
            android: "fullScreenModal",
          }),
          headerTitle: "Privacy Policy",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.black,
          },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPressIn={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace("/");
                }
              }}
              hitSlop={20}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
          ),
        }}
        name="(common)/pp"
      />
    </Stack>
  );
};
