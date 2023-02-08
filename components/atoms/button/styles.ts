import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#f4511e",
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    display: "flex",
    alignSelf: "center",
    width: '100%'
    // paddingVertical: 8,
    // paddingHorizontal: 32,
  },
  primaryButtonTextMedium: {
    color: "white",
    fontSize: 25,
  },
  primaryButtonTextSmall: {
    color: "white",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "white",
    flex: 1,
    height: 50,
    justifyContent: "center",
    borderRadius: 15,
    display: "flex",
    alignSelf: "center",
    borderColor: "#f4511e",
    borderWidth: 0.5,
    alignItems: "center",
    width: '100%'
    // paddingVertical: 8,
    // paddingHorizontal: 32,
  },
  secondaryButtonTextMedium: {
    color: "#f4511e",
    fontSize: 25,
  },
  secondaryButtonTextSmall: {
    color: "#f4511e",
    fontSize: 16,
  },
});
