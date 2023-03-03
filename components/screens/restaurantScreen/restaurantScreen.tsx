import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Divider from "../../atoms/divider/divider";
import ReadReview from "../../molecules/readReview/readReviewComponent";
import Layout from "../../templates/layout/layout";
import { styles } from "./styles";
import { firebase } from "../../../firebase";
import { Review } from "./types";
import StyledButton from "../../atoms/button/button";
import * as Location from "expo-location";
import { getAverageRating } from "./helpers";

export default function RestaurantScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { name, id, location } = route.params;
  const [review, setReview] = useState<Review[]>([]);
  const reviewRef = firebase.firestore().collection("reviews");
  const [address, setAddress] = useState<string>("");
  const averageRating: number = getAverageRating(review);

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
    getAddress();
  }, []);

  const getAddress = async () => {
    const address = await Location.reverseGeocodeAsync({
      longitude: location.longitude,
      latitude: location.latitude,
    });
    setAddress(address[0]?.name ? address[0].name : "");
  };

  review.sort(function (a, b) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <Layout
      footer={
        <StyledButton
          title="Write a review"
          onPress={() =>
            navigation.navigate("Write a review", { id, name, location })
          }
        />
      }
    >
      <>
        <Text style={styles.header}>{name}</Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `http://www.google.com/maps/place/${location.latitude},${location.longitude}`
            )
          }
        >
          <Text style={{ color: "gold" }}>{address}</Text>
        </TouchableOpacity>
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
            <Text style={{ color: "white" }}>
              Be the first person to write a review
            </Text>
          )}
        </View>
      </>
    </Layout>
  );
}
