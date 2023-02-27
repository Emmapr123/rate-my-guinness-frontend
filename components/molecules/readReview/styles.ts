import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    padding: 16,
    marginVertical: 10,
    borderRadius: 10,
    minHeight: 75,
    borderColor: "white",
    justifyContent: 'center'
  },
  account: {
    justifyContent: "space-between",
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'white'
  },
  title: {
    fontWeight: "bold",
    color: "white",
    padding: 4
  },
  description: {
    color: "white",
    padding: 4
  },
  pints: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 4,
  }
});
