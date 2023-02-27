import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import StyledButton from "../../atoms/button/button";
import Layout from "../../templates/layout/layout";
import { firebase } from "../../../firebase";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";
import WarningModal from "../../molecules/modal/warningModal";
import { styles } from "./styles";

export default function AccountScreen({ navigation }: { navigation: any }) {
  // @ts-ignore
  const { signOut } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);

  const logOut = () => {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        signOut();
      })
      .catch((error) => {
        setLoading(false);
        setModalOpen(true);
        // An error happened.
      });
  };
  return (
    <Layout footer={<StyledButton title="Log out" onPress={() => logOut()} />}>
      {loading ? (
        <ActivityIndicator size="large" color="gold" />
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("Edit account")}>
            <Text style={styles.linkText}>Edit account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("My reviews")}>
            <Text style={styles.linkText}>My reviews</Text>
          </TouchableOpacity>
          {modalIsOpen && (
            <WarningModal
              modalIsOpen={modalIsOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </>
      )}
    </Layout>
  );
}
