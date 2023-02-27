import { Modal, TouchableOpacity, View, Text } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";

export default function WarningModal({
  modalIsOpen,
  setModalOpen,
  description = "Something went wrong. Please try again.",
  title = "Oh no!"
}: {
  modalIsOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description?: string;
  title?: string;
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
        style={{
          backgroundColor: "black",
          flex: 1,
          opacity: 0.5,
        }}
        onPress={() => setModalOpen(false)}
      />
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          top: "40%",
          position: "absolute",
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
        <Spacer />
        <Text>{description}</Text>
        <Spacer />
        <StyledButton title="Close" onPress={() => setModalOpen(false)} />
      </View>
    </Modal>
  );
}
