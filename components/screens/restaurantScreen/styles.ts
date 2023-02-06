import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    fontSize: 40,
  },
  restaurantInformation: {
    paddingTop: 10,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  textBold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
});
