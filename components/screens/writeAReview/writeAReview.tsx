import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import StyledButton from "../../atoms/button/button";
import RatingIconArray from "../../molecules/ratingIconArray/ratingIconArray";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";

interface ValidationErrorType {
  ratingError?: string | undefined;
  titleError?: string | undefined;
  descriptionError?: string | undefined;
}

const validateForm = (
  rating: number,
  title: string,
  description: string
): ValidationErrorType => {
  let ratingError;
  let titleError;
  let descriptionError;

  if (rating < 1) {
    ratingError = "Your Rating must be at least a 1, it can`t be THAT bad";
  } else if (rating === 10) {
    ratingError =
      "Are you sure about that? Not a single pint can beat this one";
  }

  if (!title) {
    titleError = "Don't forget to add a title!";
  }

  if (!description) {
    descriptionError = "Don't forget to add a description!";
  }

  return {
    ratingError,
    titleError,
    descriptionError,
  };
};

export default function WriteAReview({ navigation }: { navigation: any }) {
  const arr = Array.from({ length: 10 }, (_, index) => index + 1);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formValidation, setFormValidation] = useState<ValidationErrorType>({
    ratingError: undefined,
    titleError: undefined,
    descriptionError: undefined,
  });

  const validateAndSave = () => {
    setFormValidation(validateForm(rating, title, description));

    if (
      !formValidation.ratingError &&
      !formValidation.titleError &&
      !formValidation.descriptionError
    )
      navigation.navigate("Restaurant");
  };

  return (
    <Layout
      footer={
        <>
          <StyledButton
            title="cancel"
            onPress={() => navigation.navigate("Restaurant")}
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
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        <TextInput
          style={styles.textInputTitle}
          onChangeText={(e) => setTitle(e)}
          placeholder="Give this bad boy a catchy title"
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputTitle}>Review</Text>
        <TextInput
          style={styles.largeTextInput}
          multiline={true}
          numberOfLines={8}
          onChangeText={setDescription}
          placeholder="Tell us, how was the guinness? Spare no detail!"
        />
      </View>
    </Layout>
  );
}
