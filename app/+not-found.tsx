import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const Page = () => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.main,
        }}
      >
        <Animated.View entering={ZoomIn.duration(200).delay(200)}>
          <Feather name="tool" size={50} color={COLORS.white} />
        </Animated.View>
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
            textAlign: "center",
            maxWidth: 300,
            marginVertical: 30,
          }}
        >
          You are lost, the screen maybe under construction.
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
            textDecorationLine: "underline",
          }}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            router.replace({
              pathname: "/",
            });
          }}
        >
          Start Again
        </Text>
      </View>
    </>
  );
};

export default Page;
