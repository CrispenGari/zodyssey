import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import { useSettingsStore } from "../store/settingsStore";
import { onImpact } from "../utils";

interface Props {
  title: string;
  variant?: "ghost" | "filled" | "outline";
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  color?: string;
  indicatorColor?: string;
}
const Button = ({
  onPress,
  title,
  variant = "filled",
  style,
  loading,
  titleStyle,
  color = COLORS.secondary,
  indicatorColor = COLORS.white,
}: Props) => {
  const { settings } = useSettingsStore();
  return (
    <TouchableOpacity
      onPress={async () => {
        if (settings.haptics) {
          await onImpact();
        }
        if (typeof onPress !== "undefined") {
          onPress();
        }
      }}
      disabled={loading}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "100%",
          maxWidth: 300,
          backgroundColor:
            variant === "filled"
              ? color
              : variant === "outline"
              ? COLORS.transparent
              : COLORS.tertiary,
          height: 55,
          marginTop: 100,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: color,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} size={"small"} />
      ) : (
        <Text
          style={[
            {
              fontFamily: FONTS.bold,
              color: COLORS.white,
              fontSize: 18,
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
