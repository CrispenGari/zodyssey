import { COLORS, FONTS } from "@/src/constants";
import { useMeStore } from "@/src/store/meStore";
import { useSettingsStore } from "@/src/store/settingsStore";
import { calculateAge, getGreetingMessage, onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TypeWriter from "react-native-typewriter";

interface Props {
  title: string;
}
const ProfileCard = ({ title }: Props) => {
  const { me } = useMeStore();
  const { settings } = useSettingsStore();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        paddingTop: 50,
        backgroundColor: COLORS.tertiary,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBlockColor: COLORS.tertiary,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 25,
            color: COLORS.white,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            borderRadius: 45,
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            router.navigate({
              pathname: "/(app)/settings",
            });
          }}
        >
          <Ionicons name="settings" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.navigate({
            pathname: "/(app)/profile",
          });
        }}
        style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
      >
        <View style={{ flex: 1 }}>
          <TypeWriter
            style={{
              fontFamily: FONTS.bold,
              fontSize: 20,
              color: COLORS.white,
            }}
            typing={1}
            maxDelay={-50}
          >
            {getGreetingMessage()}, {me?.nickname}.
          </TypeWriter>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.white,
              fontSize: 16,
              marginTop: 10,
            }}
          >
            {me?.zodiac?.unicode_symbol} {me?.zodiac?.zodiac} •{" "}
            {me?.gender?.charAt(0).toUpperCase().concat(me.gender.slice(1))} •{" "}
            {calculateAge(me?.dob!)} years.
          </Text>
        </View>
        <TouchableOpacity hitSlop={20} style={{ marginRight: 5 }}>
          <Ionicons name="chevron-forward" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileCard;
