import { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import Layout from "../../templates/layout/layout";
import { User, ValidationErrorType } from "../signUpWithEmail/types";
import { firebase } from "../../../firebase";
import { UserContext } from "../../../App";
import WarningModal from "../../molecules/modal/warningModal";
import { styles } from "./styles";

export default function EditAccount({ navigation }: { navigation: any }) {
  // @ts-ignore
  const { signOut } = useContext(UserContext);
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    nameError: undefined,
    birthdayError: undefined,
    emailError: undefined,
    passwordError: undefined,
    confirmPasswordError: undefined,
  });

  const userRef = firebase.firestore().collection("users");
  const reviewRef = firebase.firestore().collection("reviews");

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

  const confirmDelete = () => {
    setDeleteModal(true);
  };

  const deleteUser = () => {
    setLoading(true);
    reviewRef
      .where("userId", "==", firebase.auth().currentUser?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          reviewRef.doc(doc.id).delete();
        });
      });
    userRef.doc(firebase.auth().currentUser?.uid).delete();
    firebase.auth().currentUser?.delete();
    signOut();
  };

  return (
    <Layout
      footer={
        <>
          <StyledButton
            title="Delete"
            variant="secondary"
            onPress={() => confirmDelete()}
          />
          <Spacer direction="horizontal" />
          <StyledButton title="Save" onPress={() => validateAndSave()} />
        </>
      }
    >
      {loading ? (
        <ActivityIndicator size="large" color="gold" />
      ) : (
        <View style={styles.container}>
          <Text style={styles.inputTitle}>Username</Text>
          {formValidation.nameError && (
            <Text style={styles.errorText}>{formValidation.nameError}</Text>
          )}
          <TextInput
            onChangeText={(e) =>
              setUser({
                ...user,
                username: e,
              })
            }
            placeholderTextColor="gray"
            style={styles.textInput}
            value={user.username}
          />
          <Spacer />
          {modalIsOpen && (
            <WarningModal
              modalIsOpen={modalIsOpen}
              setModalOpen={setModalOpen}
            />
          )}
          {deleteModal && (
            <WarningModal
              modalIsOpen={deleteModal}
              setModalOpen={setDeleteModal}
              title="Are you sure you want to delete your account?"
              description="This action cannot be undone."
              buttonText="Delete"
              onPress={() => deleteUser()}
            />
          )}
        </View>
      )}
    </Layout>
  );
}
