import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.5,
  },
  modalBox: {
    width: "90%",
    alignSelf: 'center',
    backgroundColor: "white",
    top: "40%",
    position: "absolute",
    padding: 16,
    borderRadius: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  description: {
    fontSize: 18,
  }
});
