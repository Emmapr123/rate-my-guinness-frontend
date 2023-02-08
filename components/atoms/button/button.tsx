import { Text, Pressable } from "react-native";
import { styles } from "./styles";

export default function StyledButton({
  onPress,
  title,
  variant = "primary",
  fontVariant = "medium",
}: {
  onPress: any;
  title: string;
  variant?: "primary" | "secondary";
  fontVariant?: string;
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
            ? fontVariant === "medium"
              ? styles.primaryButtonTextMedium
              : styles.primaryButtonTextSmall
            : fontVariant === "medium"
            ? styles.secondaryButtonTextMedium
            : styles.secondaryButtonTextSmall
        }
      >
        {title}
      </Text>
    </Pressable>
  );
}
