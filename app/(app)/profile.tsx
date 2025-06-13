import BirthdayPicker from "@/src/components/BirthdayPicker";
import Button from "@/src/components/Button";
import Form from "@/src/components/Form";
import { COLORS, FONTS, GENDERS } from "@/src/constants";
import { useMeStore } from "@/src/store/meStore";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { getZodiacSign } from "@/src/utils/zodiac";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DropdownSelect from "react-native-input-select";

type TState = {
  gender: "male" | "female";
  nickname: string;
  error: string;
  dob: Date;
};
const Page = () => {
  const [state, setState] = React.useState<TState>({
    nickname: "",
    error: "",
    dob: new Date(1999, 9, 5),
    gender: "male",
  });
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { save, me } = useMeStore();

  React.useEffect(() => {
    if (!!me) {
      setState((s) => ({
        ...s,
        nickname: me.nickname || "",
        dob: me.dob || new Date(1999, 9, 5),
        gender: me.gender || "male",
      }));
    }
  }, [me]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.main }}>
        <View
          style={{
            flex: 0.4,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="information-circle" size={40} color={COLORS.black} />
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.black,
              textAlign: "center",
            }}
          >
            Basic Information
          </Text>
        </View>
        <View
          style={{ flex: 1, width: "100%", maxWidth: 400, alignSelf: "center" }}
        >
          <Form
            showButtons={false}
            question="What can we call you?"
            onNext={() => {}}
          >
            <View style={{ marginVertical: 0 }}>
              <TextInput
                placeholder="Nickname"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.tertiary,
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                  fontSize: 16,
                }}
                placeholderTextColor={COLORS.gray200}
                value={state.nickname}
                onChangeText={(text) => {
                  setState((s) => ({ ...s, nickname: text }));
                }}
              />
            </View>
          </Form>
          <Form
            showButtons={false}
            question="When were you born?"
            onNext={() => {}}
          >
            <View style={{ marginVertical: 5 }}>
              <BirthdayPicker
                onChange={(date) => {
                  setState((s) => ({ ...s, dob: date }));
                }}
              />
            </View>
          </Form>

          <Form
            question="What is your gender?"
            onNext={() => {}}
            showButtons={false}
          >
            <View style={{ marginVertical: 5 }}>
              <DropdownSelect
                placeholder="Select Gender"
                options={GENDERS}
                optionValue={"value"}
                selectedValue={state.gender}
                isMultiple={false}
                dropdownIconStyle={{ top: 15, right: 15 }}
                modalControls={{
                  modalOptionsContainerStyle: {
                    backgroundColor: COLORS.black,
                  },
                }}
                dropdownStyle={{
                  borderWidth: 0,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  minHeight: 40,
                  backgroundColor: COLORS.gray100,
                  flexDirection: "column-reverse",
                }}
                placeholderStyle={{
                  color: COLORS.black,
                  fontSize: 18,
                  fontFamily: FONTS.regular,
                }}
                onValueChange={async (value: any) => {
                  if (settings.haptics) await onImpact();
                  setState((state) => ({ ...state, gender: value }));
                }}
                primaryColor={COLORS.secondary}
                dropdownHelperTextStyle={{
                  display: "none",
                }}
                selectedItemStyle={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontFamily: FONTS.regular,
                  paddingBottom: 5,
                }}
                listComponentStyles={{
                  itemSeparatorStyle: { borderColor: COLORS.gray100 },
                }}
                checkboxControls={{
                  checkboxLabelStyle: {
                    fontFamily: FONTS.bold,
                    paddingBottom: 5,
                    color: COLORS.black,
                    fontSize: 14,
                  },
                  checkboxStyle: {
                    borderRadius: 999,
                    borderColor: COLORS.transparent,
                  },
                }}
              />

              <View style={{ flexDirection: "row", gap: 20 }}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    } else {
                      router.replace({ pathname: "/(app)" });
                    }
                  }}
                  style={{
                    flex: 1,
                    width: "auto",
                  }}
                  color={COLORS.primary}
                />
                <Button
                  title="Save"
                  onPress={() => {
                    if (state.nickname.trim().length < 3) {
                      return setState((s) => ({
                        ...s,
                        error: "Nickname must contain at least 3 characters.",
                      }));
                    }
                    if (!!!state.gender) {
                      return setState((s) => ({
                        ...s,
                        error: "Please select your gender.",
                      }));
                    }

                    if (!!!state.dob) {
                      return setState((s) => ({
                        ...s,
                        error: "Please select the correct date of birth.",
                      }));
                    }
                    const sign = getZodiacSign(String(state.dob).split("T")[0]);
                    save({
                      completed: true,
                      dob: state.dob,
                      gender: state.gender,
                      nickname: state.nickname,
                      zodiac: sign,
                    });
                    if (router.canGoBack()) {
                      router.back();
                    } else {
                      router.replace({ pathname: "/(app)" });
                    }
                  }}
                  style={{ flex: 1, width: "auto" }}
                />
              </View>
            </View>
          </Form>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Page;
