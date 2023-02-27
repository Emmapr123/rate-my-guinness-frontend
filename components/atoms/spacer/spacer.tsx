import { View } from "react-native";

export default function Spacer({
  direction = "vertical",
}: {
  direction?: "horizontal" | "vertical";
}) {
  return (
    <View
      style={{
        height: direction === "vertical" ? 16 : 0,
        width: direction === "horizontal" ? 16 : 0,
      }}
    />
  );
}
