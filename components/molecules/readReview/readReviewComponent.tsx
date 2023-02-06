import { View, Text } from "react-native";
import { styles } from "./styles";

export default function ReadReview() {
  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <Text style={styles.name}>Emma Priester</Text>
        <Text>Rating: 5/10</Text>
      </View>
      <Text>Not the best guinness I've ever had but also not the worst</Text>
    </View>
  );
}
