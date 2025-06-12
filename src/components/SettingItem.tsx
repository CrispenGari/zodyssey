import { COLORS, FONTS } from "@/src/constants";
import React from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity } from "react-native";

interface SettingItemProps {
  Icon: React.ReactNode;
  title: string;
  onPress: () => void;
  labelStyle?: StyleProp<TextStyle>;
}
const SettingItem = ({
  labelStyle,
  Icon,
  title,
  onPress,
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 2,
      }}
    >
      {Icon}
      <Text
        style={[
          {
            color: COLORS.black,
            fontFamily: FONTS.bold,
            fontSize: 16,
            flex: 1,
          },
          labelStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingItem;
