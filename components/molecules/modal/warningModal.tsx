import { Modal, TouchableOpacity, View, Text } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import { styles } from "./styles";

export default function WarningModal({
  modalIsOpen,
  setModalOpen,
  description = "Something went wrong. Please try again.",
  title = "Oh no!",
  buttonText = "Close",
  onPress,
}: {
  modalIsOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description?: string;
  title?: string;
  buttonText?: string;
  onPress?: any;
}) {
  return (
    <Modal
      transparent={true}
      visible={modalIsOpen}
      onRequestClose={() => {
        setModalOpen(!modalIsOpen);
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalOpen(false)}
      />
      <View style={styles.modalBox}>
        <Text style={styles.title}>{title}</Text>
        <Spacer />
        <Text>{description}</Text>
        <Spacer />
        <StyledButton
          title={buttonText}
          onPress={onPress ? onPress : () => setModalOpen(false) }
        />
      </View>
    </Modal>
  );
}
