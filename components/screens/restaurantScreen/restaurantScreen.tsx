import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Divider from "../../atoms/divider/divider";
import PrimaryButton from "../../atoms/button/button";
import ReadReview from "../../molecules/readReview/readReviewComponent";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";
import { firebase } from "../../../firebase";
import { Review } from "./types";

const getAverageRating = (reviews: Review[]): number => {
  let total = 0;
  reviews.forEach((r) => {
    total += r.rating;
  });
  return total / reviews.length;
};

export default function RestaurantScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { name, id } = route.params;

  const [review, setReview] = useState<Review[]>([]);
  const reviewRef = firebase.firestore().collection("reviews");

  useEffect(() => {
    reviewRef.where("pubId", "==", id).onSnapshot((querySnapshot) => {
      const newReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        const { title, rating, description, pubId, user } =
          doc.data() as Review;
        newReviews.push({
          id: doc.id,
          title,
          rating,
          description,
          pubId,
          user,
        });
      });
      setReview(newReviews);
    });
  }, []);

  const averageRating: number = getAverageRating(review);

  return (
    <Layout
      footer={
        <PrimaryButton
          title="Write a review"
          onPress={() => navigation.navigate("Write a review", { id, name })}
        />
      }
    >
      <Text style={styles.header}>{name}</Text>
      <View style={styles.restaurantInformation}>
        <View style={styles.ratingContainer}>
          {averageRating ? <Text style={{color: 'white'}}>Rating: {averageRating}/10</Text> : undefined}
        </View>
        <Text style={{color: 'white'}}>Reviews: {review.length}</Text>
      </View>
      <Divider />
      <Text style={styles.textBold}>Reviews</Text>
      <View>
        {review.length ? (
          review.map((r) => {
            return <ReadReview review={r} key={r.id} />;
          })
        ) : (
          <Text>Be the first to write a review</Text>
        )}
      </View>
    </Layout>
  );
}
