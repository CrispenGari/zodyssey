import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import { useSettingsStore } from "../store/settingsStore";
import { TZodiac } from "../types";
import { onImpact } from "../utils";
import Card from "./Card";

const Zodiac = ({ zodiac, isMine }: { zodiac: TZodiac; isMine?: boolean }) => {
  const { settings } = useSettingsStore();
  return (
    <Card
      style={{
        padding: 20,
        width: "100%",
        maxWidth: 400,
        alignSelf: "center",
      }}
    >
      {isMine ? (
        <View
          style={{
            position: "absolute",
            backgroundColor: COLORS.gray100,
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
            padding: 4,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontFamily: FONTS.bold,
              fontSize: 14,
            }}
          >
            Yours
          </Text>
        </View>
      ) : null}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
            }}
          >
            {zodiac?.unicode_symbol} {zodiac?.zodiac}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 16,
            }}
          >
            {zodiac?.approximate_start_date} — {zodiac?.approximate_end_date}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {zodiac?.keywords.map((keyword) => (
              <View
                key={keyword}
                style={{
                  backgroundColor: COLORS.gray200,
                  padding: 3,
                  paddingHorizontal: 10,
                  borderRadius: 3,
                }}
              >
                <Text style={{ fontFamily: FONTS.bold }}>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ alignItems: "center", maxWidth: "30%" }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              backgroundColor: COLORS.secondary,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
                textAlign: "center",
                color: COLORS.white,
              }}
            >
              {zodiac?.element}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {zodiac?.gloss}
          </Text>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            width: "100%",
            gap: 10,
          }}
        >
          <View style={{ flex: 0.5 }}>
            <Text style={{ fontFamily: FONTS.bold }}>Ruling Body Classic</Text>
            <View
              style={{
                backgroundColor: COLORS.red,
                padding: 20,
                paddingHorizontal: 10,
                borderRadius: 3,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.bold,
                  fontSize: 16,
                }}
              >
                {zodiac?.ruling_body_classic}
              </Text>
            </View>
          </View>

          <View style={{ flex: 0.5 }}>
            <Text style={{ fontFamily: FONTS.bold }}>Ruling Body Classic</Text>
            <View
              style={{
                backgroundColor: COLORS.primary,
                padding: 20,
                paddingHorizontal: 10,
                borderRadius: 3,
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: FONTS.bold }}>
                {zodiac?.ruling_body_modern}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await Linking.openURL(zodiac.svg_symbol);
            }}
            style={styles.clickable_text}
          >
            Learn More
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default Zodiac;
const styles = StyleSheet.create({
  clickable_text: {
    color: COLORS.tertiary,
    fontFamily: FONTS.bold,
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
