import React from "react";
import { View, Text } from "react-native";
import Divider from "../../atoms/divider/divider";
import PrimaryButton from "../../atoms/button/button";
import ReadReview from "../../molecules/readReview/readReviewComponent";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";

export default function RestaurantScreen({ navigation }: { navigation: any }) {
  return (
    <Layout
      footer={
        <PrimaryButton
          title="Write a review"
          onPress={() => navigation.navigate("Write a review")}
        />
      }
    >
      <Text style={styles.header}>The Tap Inn</Text>
      <View style={styles.restaurantInformation}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>Rating: 5/10</Text>
        </View>
        <Text>Reviews: 1</Text>
      </View>
      <Divider />
      <Text style={styles.textBold}>Reviews</Text>
      <ReadReview />
    </Layout>
  );
}
