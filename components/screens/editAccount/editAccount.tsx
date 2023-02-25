import { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import Layout from "../../templates/layout/layout";
import { User, ValidationErrorType } from "../signUpWithEmail/types";
import { firebase } from "../../../firebase";

export default function EditAccount({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(false);
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    nameError: undefined,
    birthdayError: undefined,
    emailError: undefined,
    passwordError: undefined,
    confirmPasswordError: undefined,
  });

  const userRef = firebase.firestore().collection("users");

  useEffect(() => {
    userRef.where("id", "==", firebase.auth().currentUser?.uid).onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { username } = doc.data();
          setUser({ username, id: doc.id });
        });
      },
      (error) => {
        console.log("emmalog error", error);
      }
    );
  }, []);

  const validateAndSave = () => {
    if (user.username === undefined) {
      setFormValidation({ nameError: "Name is required" });
    } else {
      setLoading(true);
      userRef.doc(user.id).update({
        id: firebase.auth().currentUser?.uid,
        username: user.username,
      });
      navigation.navigate("Account");
    }
  };

  return (
    <Layout
      footer={<StyledButton title="Save" onPress={() => validateAndSave()} />}
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
        </View>
      )}
    </Layout>
  );
}
