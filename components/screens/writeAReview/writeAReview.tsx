import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import StyledButton from "../../atoms/button/button";
import RatingIconArray from "../../molecules/ratingIconArray/ratingIconArray";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";
import { CreateReview, ValidationErrorType } from "./types";
import { validateForm } from "./validation";
import { firebase } from "../../../firebase";

export default function WriteAReview({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { id, name } = route.params;
  const arr = Array.from({ length: 10 }, (_, index) => index + 1);
  const [review, setReview] = useState<CreateReview>({});
  const [rating, setRating] = useState(0);
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    ratingError: undefined,
    titleError: undefined,
    descriptionError: undefined,
  });

  const reviewRef = firebase.firestore().collection("reviews");

  const validateAndSave = () => {
    const validation = validateForm(
      rating,
      review.title,
      review.description
    );

    if (
      !validation.ratingError &&
      !validation.titleError &&
      !validation.descriptionError
    ) {
      reviewRef.add({
        ...review,
        rating,
        user: firebase.auth().currentUser?.uid,
        pubId: id,
      });
      navigation.navigate("Restaurant", { id, name });
    } else {
      setFormValidation(validation);
    }
  };

  return (
    <Layout
      footer={
        <>
          <StyledButton
            title="cancel"
            onPress={() => navigation.navigate("Restaurant", { id, name })}
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
      <RatingIconArray {...{ rating, setRating, arr }} />
      {formValidation.ratingError && (
        <Text style={{ color: "red" }}>{formValidation.ratingError}</Text>
      )}
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        {formValidation.titleError && (
          <Text style={{ color: "red" }}>{formValidation.titleError}</Text>
        )}
        <TextInput
          style={styles.textInputTitle}
          placeholderTextColor="gray"
          onChangeText={(e) => setReview({ ...review, title: e })}
          placeholder="Give this bad boy a catchy title"
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputTitle}>Description</Text>
        {formValidation.descriptionError && (
          <Text style={{ color: "red" }}>
            {formValidation.descriptionError}
          </Text>
        )}
        <TextInput
          style={styles.largeTextInput}
          multiline={true}
          numberOfLines={8}
          placeholderTextColor="gray"
          onChangeText={(e) => setReview({ ...review, description: e })}
          placeholder="Tell us, how was the guinness? Spare no detail!"
        />
      </View>
    </Layout>
  );
}
