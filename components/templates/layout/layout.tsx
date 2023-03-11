import React, { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import { styles } from "./styles";

export default function Layout({
  children,
  footer,
}: PropsWithChildren<{ footer?: React.ReactNode }>) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={"padding"}
      keyboardVerticalOffset={110}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView>{children}</ScrollView>
        <View style={styles.buttonContainer}>{footer}</View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
