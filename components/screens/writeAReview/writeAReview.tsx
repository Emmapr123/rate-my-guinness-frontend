import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import StyledButton from "../../atoms/button/button";
import RatingIconArray from "../../molecules/ratingIconArray/ratingIconArray";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";
import { ValidationErrorType } from "./types";
import { validateForm } from "./validation";

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
    const validation = validateForm(rating, title, description);

    if (
      !validation.ratingError &&
      !validation.titleError &&
      !validation.descriptionError
    ) {
      navigation.navigate("Restaurant")
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
          onChangeText={(e) => setTitle(e)}
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
          onChangeText={setDescription}
          placeholder="Tell us, how was the guinness? Spare no detail!"
        />
      </View>
    </Layout>
  );
}
