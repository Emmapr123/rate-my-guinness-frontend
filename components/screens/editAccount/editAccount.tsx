import { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import Layout from "../../templates/layout/layout";
import { User, ValidationErrorType } from "../signUpWithEmail/types";
import { firebase } from "../../../firebase";
import { UserContext } from "../../../App";
import WarningModal from "../../molecules/modal/warningModal";

export default function EditAccount({ navigation }: { navigation: any }) {
  // @ts-ignore
  const { signOut } = useContext(UserContext);
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    nameError: undefined,
    birthdayError: undefined,
    emailError: undefined,
    passwordError: undefined,
    confirmPasswordError: undefined,
  });

  const userRef = firebase.firestore().collection("users");

  useEffect(() => {
    userRef
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        firebase.auth().currentUser?.uid
      )
      .onSnapshot(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { username } = doc.data();
            setUser({ username });
          });
        },
        (error) => {
          console.log("emmalog error", error);
          setModalOpen(true);
        }
      );
  }, []);

  const validateAndSave = () => {
    if (user.username === undefined) {
      setFormValidation({ nameError: "Name is required" });
    } else {
      setLoading(true);
      userRef
        .doc(firebase.auth().currentUser?.uid)
        .update({
          id: firebase.auth().currentUser?.uid,
          username: user.username,
        })
        .catch((error) => {
          console.log("emmalog error", error);
          setModalOpen(true);
        });
      navigation.navigate("Account");
    }
  };

  const deleteUser = () => {
    setLoading(true);
    userRef.doc(firebase.auth().currentUser?.uid).delete();
    firebase.auth().currentUser?.delete();
    signOut();
  };

  return (
    <Layout
      footer={
        <>
          <StyledButton title="Save" onPress={() => validateAndSave()} />
          <View style={{ width: 15 }} />
          <StyledButton
            title="Delete account"
            variant="secondary"
            fontVariant="small"
            onPress={() => deleteUser()}
          />
        </>
      }
    >
      {loading ? (
        <ActivityIndicator size="large" color="gold" />
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontWeight: "bold", paddingVertical: 8, color: "white" }}
          >
            Name
          </Text>
          {formValidation.nameError && (
            <Text style={{ color: "red" }}>{formValidation.nameError}</Text>
          )}
          <TextInput
            onChangeText={(e) =>
              setUser({
                ...user,
                username: e,
              })
            }
            placeholderTextColor="gray"
            style={{ color: "white" }}
            value={user.username}
          />
          <Spacer />
          {modalIsOpen && (
            <WarningModal
              modalIsOpen={modalIsOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </View>
      )}
    </Layout>
  );
}
