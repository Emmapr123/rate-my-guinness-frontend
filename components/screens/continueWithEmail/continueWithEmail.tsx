import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import Layout from "../../templates/layout/layout";
import { firebase } from "../../../firebase";
import { User } from "../signUpWithEmail/types";
import { validateForm } from "./validateForm";
import { ValidationErrorType } from "./types";
import { UserContext } from "../../../App";
import WarningModal from "../../molecules/modal/warningModal";

export default function ContinueWithEmail({ navigation }: { navigation: any }) {
  // @ts-ignore
  const { signIn } = React.useContext(UserContext);
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    emailError: undefined,
    passwordError: undefined,
  });

  let modalWarning =
    "No account found with that email and password combination. Please try again or create an account.";
  const login = () => {
    const validation = validateForm(user.email, user.password);

    if (!validation?.emailError && !validation?.passwordError) {
      setLoading(true);
      firebase
        .auth()
        // @ts-ignore
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          setLoading(false);
          signIn(userCredential);
          navigation.navigate("Rate my Guinness");
        })
        .catch((error) => {
          modalWarning =
            error.code === "auth/user-not-found"
              ? "No account found with that email address. Please try again or create an account."
              : "Something went wrong. Please try again.";
          setLoading(false);
          setFormValidation({ emailError: "", passwordError: "" });
          setModalOpen(true);
        });
      signIn(firebase.auth().currentUser?.uid);
      navigation.navigate("Rate my Guinness");
    } else {
      setFormValidation(validation);
    }
  };

  return (
    <Layout
      footer={
        <>
          <StyledButton
            title="Log in"
            fontVariant="small"
            onPress={() => login()}
          />
          <View style={{ width: 15 }} />
          <StyledButton
            title="Create account"
            variant="secondary"
            fontVariant="small"
            onPress={() => navigation.navigate("signUpWithEmail")}
          />
        </>
      }
    >
      <Text style={{ fontSize: 32, paddingVertical: 16, color: "gold" }}>
        Lorcan's app
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="gold" />
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontWeight: "bold", paddingVertical: 8, color: "white" }}
          >
            Email
          </Text>
          {formValidation.emailError && (
            <Text style={{ color: "red" }}>{formValidation.emailError}</Text>
          )}
          <TextInput
            onChangeText={(e) =>
              setUser({
                ...user,
                email: e,
              })
            }
            placeholderTextColor="gray"
            style={{ color: "white" }}
            placeholder="example@email.com"
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
            style={{ color: "white" }}
            placeholderTextColor="gray"
            onChangeText={(e) => setUser({ ...user, password: e })}
            placeholder="********"
          />
          <Spacer />
          {modalIsOpen && (
            <WarningModal
              modalIsOpen={modalIsOpen}
              setModalOpen={setModalOpen}
              description={modalWarning}
              title={"OOOPS!"}
            />
          )}
        </View>
      )}
    </Layout>
  );
}
