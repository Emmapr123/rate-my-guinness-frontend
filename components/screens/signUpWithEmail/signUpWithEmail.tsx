import React, { useState, useContext } from "react";
import { View, Text, TextInput } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import Layout from "../../templates/layout/layout";
import { subtractYears, validateForm } from "./validateForm";
import { firebase } from "../../../firebase";
import { User, ValidationErrorType } from "./types";
import { UserContext } from "../../../App";
import WarningModal from "../../molecules/modal/warningModal";
import DatePicker from "react-native-datepicker";
import { styles } from "./styles";

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
      <Text style={styles.title}>Lorcan's app</Text>
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Name</Text>
        {formValidation.nameError && (
          <Text style={styles.error}>{formValidation.nameError}</Text>
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
          placeholder="John Doe"
        />
        <Spacer />
        <Text style={styles.inputLabel}>Birthday</Text>
        {formValidation.birthdayError && (
          <Text style={styles.error}>{formValidation.birthdayError}</Text>
        )}
        <DatePicker
          style={{ width: "100%" }}
          date={user.birthday}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate={subtractYears(new Date(), 100)}
          maxDate={subtractYears(new Date(), 18)}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: styles.dateIcon,
            dateInput: styles.dateInput,
            placeholderText: styles.placeholderText,
            dateText: styles.dateText,
            btnTextConfirm: styles.btnText,
            btnTextCancel: styles.btnText,
          }}
          onDateChange={(date) => {
            setUser({ ...user, birthday: date });
          }}
        />
        <Spacer />
        <Text style={styles.inputLabel}>Email</Text>
        {formValidation.emailError && (
          <Text style={styles.error}>{formValidation.emailError}</Text>
        )}
        <TextInput
          onChangeText={(e) => setUser({ ...user, email: e })}
          placeholder="example@email.com"
          placeholderTextColor="gray"
          style={styles.textInput}
        />
        <Spacer />
        <Text style={styles.inputLabel}>Password</Text>
        {formValidation.passwordError && (
          <Text style={styles.error}>{formValidation.passwordError}</Text>
        )}
        <TextInput
          secureTextEntry={true}
          onChangeText={(e) => setUser({ ...user, password: e })}
          placeholder="********"
          placeholderTextColor="gray"
          style={styles.textInput}
        />
        <Spacer />
        <Text style={styles.inputLabel}>Confirm Password</Text>
        {formValidation.confirmPasswordError && (
          <Text style={styles.error}>
            {formValidation.confirmPasswordError}
          </Text>
        )}
        <TextInput
          secureTextEntry={true}
          onChangeText={(e) => setConfirmPassword(e)}
          placeholder="*********"
          placeholderTextColor="gray"
          style={styles.textInput}
        />
        <Spacer />
        {modalIsOpen && (
          <WarningModal setModalOpen={setModalOpen} modalIsOpen={modalIsOpen} />
        )}
      </View>
    </Layout>
  );
}
