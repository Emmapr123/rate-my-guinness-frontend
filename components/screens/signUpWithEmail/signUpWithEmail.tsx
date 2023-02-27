import { useState, useContext } from "react";
import { View, Text, TextInput } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import Layout from "../../templates/layout/layout";
import { validateForm } from "./validateForm";
import { firebase } from "../../../firebase";
import { User, ValidationErrorType } from "./types";
import { UserContext } from "../../../App";
import WarningModal from "../../molecules/modal/warningModal";

export function SignUpWithEmail({ navigation }: { navigation: any }) {
  // @ts-ignore
  const { signUp } = useContext(UserContext);

  const [user, setUser] = useState<User>({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalIsOpen, setModalOpen] = useState(false);
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    nameError: undefined,
    birthdayError: undefined,
    emailError: undefined,
    passwordError: undefined,
    confirmPasswordError: undefined,
  });

  const userRef = firebase.firestore().collection("users");

  const validateAndSave = () => {
    const validation = validateForm(
      user.username,
      user.birthday,
      user.email,
      user.password,
      confirmPassword
    );

    if (
      !validation?.nameError &&
      !validation?.birthdayError &&
      !validation?.emailError &&
      !validation?.passwordError &&
      !validation?.confirmPasswordError
    ) {
      setFormValidation(validation);

      firebase
        .auth()
        // @ts-ignore
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          userRef.doc(userCredential.user?.uid).set({
            username: user.username,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          signUp(userCredential.user?.uid);
        })
        .catch((error) => {
          console.log("emmalog error", error);
          setModalOpen(true);
        });
    } else {
      setFormValidation(validation);
    }
  };

  return (
    <Layout
      footer={<StyledButton title="Save" onPress={() => validateAndSave()} />}
    >
      <Text style={{ fontSize: 32, paddingVertical: 16, color: "gold" }}>
        Lorcan's app
      </Text>
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
          placeholder="John Doe"
        />
        <Spacer />
        <Text
          style={{ fontWeight: "bold", paddingVertical: 8, color: "white" }}
        >
          Birthday
        </Text>
        {formValidation.birthdayError && (
          <Text style={{ color: "red" }}>{formValidation.birthdayError}</Text>
        )}
        <TextInput
          onChangeText={(e) => setUser({ ...user, birthday: e })}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="gray"
          style={{ color: "white" }}
        />
        <Spacer />
        <Text
          style={{ fontWeight: "bold", paddingVertical: 8, color: "white" }}
        >
          Email
        </Text>
        {formValidation.emailError && (
          <Text style={{ color: "red" }}>{formValidation.emailError}</Text>
        )}
        <TextInput
          onChangeText={(e) => setUser({ ...user, email: e })}
          placeholder="example@email.com"
          placeholderTextColor="gray"
          style={{ color: "white" }}
        />
        <Spacer />
        <Text
          style={{ fontWeight: "bold", paddingVertical: 8, color: "white" }}
        >
          Password
        </Text>
        {formValidation.passwordError && (
          <Text style={{ color: "red" }}>{formValidation.passwordError}</Text>
        )}
        <TextInput
          secureTextEntry={true}
          onChangeText={(e) => setUser({ ...user, password: e })}
          placeholder="********"
          placeholderTextColor="gray"
          style={{ color: "white" }}
        />
        <Spacer />
        <Text
          style={{ fontWeight: "bold", paddingVertical: 8, color: "white" }}
        >
          Confirm Password
        </Text>
        {formValidation.confirmPasswordError && (
          <Text style={{ color: "red" }}>
            {formValidation.confirmPasswordError}
          </Text>
        )}
        <TextInput
          secureTextEntry={true}
          onChangeText={(e) => setConfirmPassword(e)}
          placeholder="*********"
          placeholderTextColor="gray"
          style={{ color: "white" }}
        />
        {modalIsOpen && (
          <WarningModal
            setModalOpen={setModalOpen}
            modalIsOpen={modalIsOpen}
          />
        )}
      </View>
    </Layout>
  );
}
