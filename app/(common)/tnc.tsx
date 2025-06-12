import Card from "@/src/components/Card";
import { APP_NAME, COLORS, FONTS } from "@/src/constants";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomInDown,
} from "react-native-reanimated";

const TermsAndConditions = () => {
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
          {APP_NAME} ⚖️
        </Text>
      </Card>

      {[
        {
          title: "1. Acceptance of Terms 📜",
          body: `By using ${APP_NAME}, you agree to these terms and conditions. If you disagree with any part, please do not use the app.`,
        },
        {
          title: "2. Use of the App 📱",
          body: `${APP_NAME} is designed for personal, non-commercial use. You agree not to misuse the app or its content.`,
        },
        {
          title: "3. Intellectual Property 🧠",
          body: `All content in ${APP_NAME} — including text, images, and features — is owned by us or our licensors. Unauthorized copying or redistribution is prohibited.`,
        },
        {
          title: "4. User Conduct 🤝",
          body: `You agree to use ${APP_NAME} in a lawful manner. Do not attempt to harm, hack, or interfere with the app's operation.`,
        },
        {
          title: "5. No Warranty 🚫",
          body: `${APP_NAME} is provided "as is" without any warranties. We do not guarantee that the app will be error-free or uninterrupted.`,
        },
        {
          title: "6. Limitation of Liability ⚠️",
          body: `We are not liable for any indirect or consequential damages resulting from your use of ${APP_NAME}. Use at your own risk.`,
        },
        {
          title: "7. Modifications 🔄",
          body: `We may update or change these terms at any time. Continued use of ${APP_NAME} means you accept the updated terms.`,
        },
        {
          title: "8. Termination ❌",
          body: `We reserve the right to suspend or terminate your access to ${APP_NAME} at our discretion, without prior notice.`,
        },
        {
          title: "9. Governing Law ⚖️",
          body: `These terms are governed by the laws of your local jurisdiction. You agree to comply with all applicable laws while using the app.`,
        },
        {
          title: "10. Contact ✉️",
          body: `If you have any questions or concerns about these terms, contact us at crispengari@gmail.com.`,
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

export default TermsAndConditions;

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
