import { Text, Pressable, StyleProp, ViewStyle } from "react-native";
import { styles } from "./styles";

export default function SecondaryButton({
  onPress,
  title,
  style,
}: {
  onPress: any;
  title: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable style={style || styles.button} {...{ onPress }}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
