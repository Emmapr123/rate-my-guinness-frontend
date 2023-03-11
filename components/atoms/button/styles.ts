import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "gold",
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    display: "flex",
    alignSelf: "center",
    width: '100%',
    maxHeight: 56
  },
  primaryButtonTextMedium: {
    color: "black",
    fontSize: 25,
    fontWeight: "600"
  },
  primaryButtonTextSmall: {
    color: "black",
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: "black",
    flex: 1,
    height: 50,
    justifyContent: "center",
    borderRadius: 15,
    display: "flex",
    alignSelf: "center",
    borderColor: "gold",
    borderWidth: 5,
    alignItems: "center",
    width: '100%',
    maxHeight: 56
  },
  secondaryButtonTextMedium: {
    color: "gold",
    fontSize: 25,
    fontWeight: "600"
  },
  secondaryButtonTextSmall: {
    color: "gold",
    fontSize: 16,
  },
});
