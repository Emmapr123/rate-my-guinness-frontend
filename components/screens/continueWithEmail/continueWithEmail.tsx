import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import Layout from "../../templates/layout/layout";
import { firebase } from "../../../firebase";
import { User } from "../signUpWithEmail/types";
import { validateForm } from "./validateForm";
import { ValidationErrorType } from "./types";

export default function ContinueWithEmail({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<User>({});
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    emailError: undefined,
    passwordError: undefined,
  });

  const login = () => {
    const validation = validateForm(user.email, user.password);

    if (!validation?.emailError && !validation?.passwordError) {
      firebase
        .auth()
        // @ts-ignore
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          navigation.navigate("Rate my Guinness");
          // ...
        })
        .catch((error) => {
          console.log("emmalog error", error);
        });
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
      <Text style={{ fontSize: 32, paddingVertical: 16 }}>
        The Guinness advisor
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>Email</Text>
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
          placeholder="example@email.com"
        />
        <Spacer />
        <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>Password</Text>
        {formValidation.passwordError && (
          <Text style={{ color: "red" }}>{formValidation.passwordError}</Text>
        )}
        <TextInput
          secureTextEntry={true}
          onChangeText={(e) => setUser({ ...user, password: e })}
          placeholder="********"
        />
        <Spacer />
      </View>
    </Layout>
  );
}
