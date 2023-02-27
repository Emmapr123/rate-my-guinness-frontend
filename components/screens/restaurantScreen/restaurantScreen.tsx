import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Divider from "../../atoms/divider/divider";
import ReadReview from "../../molecules/readReview/readReviewComponent";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";
import { firebase } from "../../../firebase";
import { Review } from "./types";
import StyledButton from "../../atoms/button/button";

const getAverageRating = (reviews: Review[]): number => {
  let total = 0;
  reviews.forEach((r) => {
    total += r.rating;
  });
  return Math.round(total / reviews.length);
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
          createdAt: doc.data().createdAt,
        });
      });
      setReview(newReviews);
    });
  }, []);

  const averageRating: number = getAverageRating(review);
  review.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <Layout
      footer={
        <StyledButton
          title="Write a review"
          onPress={() => navigation.navigate("Write a review", { id, name })}
        />
      }
    >
      <Text style={styles.header}>{name}</Text>
      <View style={styles.restaurantInformation}>
        <View style={styles.ratingContainer}>
          {averageRating ? (
            <Text style={{ color: "white" }}>Rating: {averageRating}/10</Text>
          ) : undefined}
        </View>
        <Text style={{ color: "white" }}>Reviews: {review.length}</Text>
      </View>
      <Divider />
      <Text style={styles.textBold}>Reviews</Text>
      <View>
        {review.length > 0 ? (
          review.map((r) => {
            return <ReadReview review={r} key={r.id} />;
          })
        ) : (
          <Text style={{ color: "white" }}>Be the first person to write a review</Text>
        )}
      </View>
    </Layout>
  );
}
