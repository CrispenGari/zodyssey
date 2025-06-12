import Card from "@/src/components/Card";
import { APP_NAME, COLORS, FONTS } from "@/src/constants";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomInDown,
} from "react-native-reanimated";

const PrivacyPolicy = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      <Card style={[styles.card, { backgroundColor: COLORS.main }]}>
        <Animated.Image
          entering={ZoomInDown.delay(200).duration(200)}
          source={require("../../assets/images/adaptive-icon.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 20,
            alignSelf: "center",
            color: COLORS.black,
          }}
        >
          {APP_NAME} 🔮
        </Text>
      </Card>

      {[
        {
          title: "1. Zodiac Profile Privacy 🪐",
          body:
            "Your zodiac data (like birthdate, time, and location) is stored only on your device 📱. " +
            "Zodyssey does not upload or share astrological profiles with any third party 🌌.",
        },
        {
          title: "2. Personalized Insights Engine 🌠",
          body:
            "Your birth chart and daily readings are processed on-device or anonymously in the cloud. " +
            "No personal identifiers are used in this process 🔍✨.",
        },
        {
          title: "3. Personal Information 🔒",
          body:
            "We only collect minimal personal info (like nickname and birth data) to tailor your zodiac experience. " +
            "Everything is stored locally and never shared 🌿🛡️.",
        },
        {
          title: "4. Third-Party Services 🚫",
          body: "Zodyssey does not use any external analytics or advertising services. Your celestial journey is completely private 🌙.",
        },
        {
          title: "5. No Ads, No Data Selling ❌",
          body: "We don’t show ads or sell your data. Your zodiac readings remain focused and uninterrupted 💫🙅.",
        },
        {
          title: "6. Data Control 🔭",
          body: "You control your astral data 🔐. Delete or export your charts anytime from the app settings — the stars are in your hands 🌌.",
        },
        {
          title: "7. Account Deletion 🌑",
          body: "Zodyssey does not require cloud accounts. You can erase all your data by deleting the app or clearing it from settings 🧹🗑️.",
        },
        {
          title: "8. Age Requirements 🚸",
          body: "Zodyssey is designed for all users no age restriction. We don’t knowingly collect info from any users 🌱.",
        },
        {
          title: "9. Optional Usage Analytics 📊",
          body: "To improve Zodyssey, we may collect anonymous app usage stats (like feature taps or session times) — never your zodiac or personal data 🔍📈.",
        },
        {
          title: "10. Policy Updates 🔁",
          body: "We may update this privacy policy. Any major changes will be shared through the app 🛎️ or on our website 🌐.",
        },
        {
          title: "11. Contact Us ✉️",
          body: "Got questions about your data privacy? Reach out anytime at crispengari@gmail.com 💌.",
        },
      ].map((section, index) => {
        const enteringAnim =
          index % 2 === 0
            ? SlideInLeft.duration(100).delay(100)
            : SlideInRight.duration(100).delay(100);
        return (
          <Animated.View key={section.title} entering={enteringAnim}>
            <Card style={styles.card}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <Text style={styles.bulletPoint}>{section.body}</Text>
            </Card>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.main,
  },
  card: {
    padding: 10,
    maxWidth: 500,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: "100%",
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: COLORS.gray100,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 8,
    color: COLORS.black,
  },
  bulletPoint: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
});
