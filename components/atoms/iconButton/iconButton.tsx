import { TouchableOpacity } from "react-native";

export default function IconButton({
  icon,
  styles,
  navigate,
}: {
  icon: React.ReactNode;
  styles?: any;
  navigate: any;
}) {
  return (
    <TouchableOpacity style={styles} onPress={navigate}>
      {icon}
    </TouchableOpacity>
  );
}
