import Card from "@/src/components/Card";
import SettingItem from "@/src/components/SettingItem";
import { APP_NAME, COLORS, FONTS } from "@/src/constants";
import { useMeStore } from "@/src/store/meStore";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onFetchUpdateAsync, onImpact, rateApp } from "@/src/utils";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
} from "react-native";

const Page = () => {
  const { settings, update, restore } = useSettingsStore();
  const { destroy } = useMeStore();
  const router = useRouter();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.main }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.headerText, { marginTop: 20 }]}>Misc</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update({ ...settings, notifications: !settings.notifications });
          }}
          title="Notifications"
          Icon={
            <Ionicons
              name={
                settings.notifications
                  ? "notifications-outline"
                  : "notifications-off-outline"
              }
              size={20}
              color={COLORS.black}
            />
          }
        />

        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update({ ...settings, haptics: !settings.haptics });
          }}
          title="Haptics"
          Icon={
            <MaterialCommunityIcons
              name={settings.haptics ? "vibrate" : "vibrate-off"}
              size={20}
              color={COLORS.black}
            />
          }
        />

        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await onFetchUpdateAsync();
          }}
          title="Check for Updates"
          Icon={<MaterialIcons name="update" size={20} color={COLORS.black} />}
        />

        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            Alert.alert(
              APP_NAME,
              "Are you sure you want to reset Zodyssey?",
              [
                {
                  text: "YES",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    restore();
                    destroy();
                  },
                },
                {
                  text: "NO",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          labelStyle={{
            color: COLORS.red,
          }}
          title="Restore Settings"
          Icon={<MaterialIcons name="reset-tv" size={20} color={COLORS.red} />}
        />
      </Card>
      <Text style={styles.headerText}>Support</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await Share.share(
              {
                url: "https://github.com/CrispenGari/zodyssey",
                message:
                  "An awesome app for zodiadic signs: Download at https://github.com/CrispenGari/zodyssey",
                title: "Share  Zodyssey with a Friend",
              },
              { dialogTitle: "Share Zodyssey", tintColor: COLORS.tertiary }
            );
          }}
          title="Tell a friend"
          Icon={
            <Ionicons name="heart-outline" size={20} color={COLORS.black} />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await rateApp();
          }}
          title="Rate Zodyssey"
          Icon={<Ionicons name="star-outline" size={20} color={COLORS.black} />}
        />

        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            const res = await Linking.canOpenURL(
              "https://github.com/CrispenGari/zodyssey/issues"
            );
            if (res) {
              Linking.openURL("https://github.com/CrispenGari/zodyssey/issues");
            }
          }}
          title="Report an Issue"
          Icon={<Ionicons name="logo-github" size={20} color={COLORS.black} />}
        />
      </Card>
      <Text style={styles.headerText}>Legal</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            router.navigate("/(common)/tnc");
          }}
          title="Terms of Service"
          Icon={
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.black}
            />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            router.navigate("/(common)/pp");
          }}
          title="Privacy Policy"
          Icon={
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.black}
            />
          }
        />
      </Card>
      <Text
        style={{
          fontFamily: FONTS.bold,
          color: COLORS.gray200,
          padding: 10,
          textAlign: "center",
          marginTop: 30,
          fontSize: 18,
        }}
      >
        {Constants.default.expoConfig?.name}
        {" version: "}
        {Constants.default.expoConfig?.version}
      </Text>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 20,
    color: COLORS.black,
    marginBottom: 5,
  },
});
