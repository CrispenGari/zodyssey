import Button from "@/src/components/Button";
import { APP_NAME, COLORS, FONTS, LANDING_MESSAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import TypeWriter from "react-native-typewriter";

const Page = () => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (index >= LANDING_MESSAGES.length - 1) {
        setIndex(0);
      } else {
        setIndex((state) => state + 1);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.main,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                textAlign: "center",
                fontFamily: FONTS.bold,
                fontSize: 25,
              }}
            >
              {APP_NAME}
            </Text>
            <Animated.Image
              source={require("../assets/images/adaptive-icon.png")}
              style={{ width: 200, height: 200 }}
              entering={ZoomIn.duration(1000).delay(100)}
            />
            <View
              style={{
                margin: 20,
                maxWidth: 400,
                borderRadius: 10,
                backgroundColor: COLORS.gray200,
                padding: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 120,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: COLORS.secondary,
                  top: -10,
                  width: 180,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 999,
                  shadowOpacity: 0.5,
                  elevation: 2,
                  shadowOffset: { width: 2, height: 2 },
                  shadowRadius: 5,
                  shadowColor: COLORS.primary,
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.bold,
                    fontSize: 18,
                  }}
                >
                  About {APP_NAME}
                </Text>
              </View>

              <TypeWriter
                style={{
                  textAlign: "center",
                  fontFamily: FONTS.bold,
                  fontSize: 16,
                  color: COLORS.white,
                }}
                typing={1}
                maxDelay={-50}
              >
                {LANDING_MESSAGES[index]}
              </TypeWriter>
            </View>

            <Button
              style={{ width: "100%" }}
              variant="filled"
              title="Continue"
              onPress={() => {
                router.replace("/(basic)/nickname");
              }}
            />
          </View>
          <SafeAreaView style={{ padding: 20 }}>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 18,
                textAlign: "center",
                fontFamily: FONTS.regular,
                color: COLORS.black,
              }}
            >
              By using {APP_NAME} you are automatically accepting{" "}
              <Text
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  router.push("/(common)/tnc");
                }}
                style={styles.clickable_text}
              >
                Terms and Conditions
              </Text>{" "}
              and{" "}
              <Text
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  router.push("/(common)/pp");
                }}
                style={styles.clickable_text}
              >
                Privacy Policy
              </Text>{" "}
              of this app.
            </Text>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  clickable_text: {
    color: COLORS.tertiary,
    fontFamily: FONTS.regular,
    textDecorationLine: "underline",
  },
});
