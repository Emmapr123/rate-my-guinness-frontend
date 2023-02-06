import { Text, Pressable } from "react-native";
import { styles } from "./styles";

export default function StyledButton({
  onPress,
  title,
  variant = "primary",
}: {
  onPress: any;
  title: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <Pressable
      style={
        variant === "primary" ? styles.primaryButton : styles.secondaryButton
      }
      {...{ onPress }}
    >
      <Text
        style={
          variant === "primary"
            ? styles.primaryButtonText
            : styles.secondaryButtonText
        }
      >
        {title}
      </Text>
    </Pressable>
  );
}
