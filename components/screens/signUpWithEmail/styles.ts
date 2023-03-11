import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: { fontSize: 32, paddingVertical: 16, color: "gold" },
  container: { flex: 1 },
  inputLabel: { fontWeight: "bold", paddingVertical: 8, color: "white" },
  error: { color: "red" },
  textInput: { color: "white" },
  datePicker: { width: "100%" },
  dateIcon: {
    position: "absolute",
    right: -5,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    borderColor: "white",
    alignItems: "flex-start",
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  placeholderText: {
    fontSize: 17,
    color: "gray",
  },
  dateText: {
    fontSize: 17,
    color: "white",
  },
  btnText: {
    color: "black",
  },
});
