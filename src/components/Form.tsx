import { COLORS, FONTS } from "@/src/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import TypeWriter from "react-native-typewriter";
import Button from "./Button";

interface Props {
  onNext: () => void;
  onPrevious?: () => void;
  question: string;
  children: React.ReactNode;
  showButtons?: boolean;
}
const Form = ({
  question,
  onNext,
  onPrevious,
  children,
  showButtons = true,
}: Props) => {
  return (
    <Animated.View
      style={{
        padding: 10,
      }}
    >
      <TypeWriter
        style={[
          {
            fontFamily: FONTS.bold,
            fontSize: showButtons ? 25 : 16,
            color: COLORS.black,
          },
        ]}
        typing={1}
        maxDelay={-50}
      >
        {question}
      </TypeWriter>
      {children}
      {showButtons ? (
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Button
            title="Previous"
            disabled={typeof onPrevious === "undefined"}
            onPress={() => {
              if (typeof onPrevious === "undefined") return;
              onPrevious();
            }}
            style={{
              flex: 1,
              width: "auto",
            }}
            color={COLORS.primary}
          />
          <Button
            title="Next"
            onPress={onNext}
            style={{ flex: 1, width: "auto" }}
          />
        </View>
      ) : null}
    </Animated.View>
  );
};

export default Form;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  btn_text: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
});
