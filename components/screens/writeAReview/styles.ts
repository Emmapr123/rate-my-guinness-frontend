import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    fontSize: 40,
  },
  textInputContainer: {
    paddingTop: 16,
  },
  largeTextInput: {
    fontSize: 16,
    height: 100,
  },
  textInputTitle: {
    fontSize: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#f4511e",
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    display: "flex",
    alignSelf: "center",
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
  },
});
