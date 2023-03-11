import { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import StyledButton from "../../atoms/button/button";
import RatingIconArray from "../../molecules/ratingIconArray/ratingIconArray";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";
import { CreateReview, ValidationErrorType } from "./types";
import { validateForm } from "./validation";
import { firebase } from "../../../firebase";
import WarningModal from "../../molecules/modal/warningModal";

export default function WriteAReview({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { id, name, location } = route.params;
  const arr = Array.from({ length: 10 }, (_, index) => index + 1);
  const [review, setReview] = useState<CreateReview>({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | undefined>(undefined);
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    ratingError: undefined,
    titleError: undefined,
    descriptionError: undefined,
  });

  const reviewRef = firebase.firestore().collection("reviews");

  const validateAndSave = () => {
    const validation = validateForm(rating);

    if (!validation.ratingError) {
      setLoading(true);
      reviewRef
        .add({
          ...review,
          rating,
          user: firebase.auth().currentUser?.uid,
          pubId: id,
          createdAt: new Date().toDateString(),
        })
        .catch((error) => {
          console.log(error);
          setModalOpen(true);
        });
      navigation.navigate("Restaurant", { id, name, location });
      setLoading(false);
    } else {
      setFormValidation(validation);
    }
  };

  useEffect(() => {
    reviewRef
      .where("user", "==", firebase.auth().currentUser?.uid)
      .where("pubId", "==", id)
      .get()
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          const { createdAt } = doc.data();
          if (createdAt >= new Date().toDateString() === true) {
            setModalError("You can only review a pub once a day");
            setModalOpen(true);
          }
        })
      );
  }, []);

  return (
    <Layout
      footer={
        <>
          <StyledButton
            title="cancel"
            onPress={() =>
              navigation.navigate("Restaurant", { id, name, location })
            }
            variant={"secondary"}
          />
          <View style={{ width: 15 }} />
          <StyledButton
            title="save"
            onPress={() => validateAndSave()}
            variant={"primary"}
          />
        </>
      }
    >
      {loading ? (
        <ActivityIndicator color={"gold"} size="large" />
      ) : (
        <>
        <Text style={styles.textInputTitle}>Rating</Text>
          <RatingIconArray {...{ rating, setRating, arr }} />
          {formValidation.ratingError && (
            <Text style={{ color: "red" }}>{formValidation.ratingError}</Text>
          )}
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputTitle}>Title</Text>
            <TextInput
              style={styles.textInputTitle}
              placeholderTextColor="gray"
              onChangeText={(e) => setReview({ ...review, title: e })}
              placeholder="Give this bad boy a catchy title"
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputTitle}>Description</Text>
            <TextInput
              style={styles.largeTextInput}
              multiline={true}
              numberOfLines={8}
              placeholderTextColor="gray"
              onChangeText={(e) => setReview({ ...review, description: e })}
              placeholder="Tell us, how was your guinness? Spare no detail!"
            />
          </View>
          {modalIsOpen && (
            <WarningModal
              {...{ modalIsOpen, setModalOpen }}
              onPress={() =>
                navigation.navigate("Restaurant", { id, name, location })
              }
              title={modalError}
              description={modalError ? "" : undefined}
            />
          )}
        </>
      )}
    </Layout>
  );
}
