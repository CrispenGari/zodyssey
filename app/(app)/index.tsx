import Zodiac from "@/src/components/Zodiac";
import { COLORS, FONTS } from "@/src/constants";
import { zodiacs } from "@/src/data/zodiac";
import { useMeStore } from "@/src/store/meStore";
import React from "react";
import { ScrollView, Text } from "react-native";

const Page = () => {
  const { me } = useMeStore();
  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.main,
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 50,
        padding: 20,
        gap: 5,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Zodiac isMine zodiac={me?.zodiac!} />

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          fontFamily: FONTS.bold,
        }}
      >
        Other Signs
      </Text>

      {zodiacs
        .filter((s) => s.zodiac !== me?.zodiac?.zodiac)
        .map((zodiac) => (
          <Zodiac key={zodiac.zodiac} zodiac={zodiac} />
        ))}
    </ScrollView>
  );
};

export default Page;
