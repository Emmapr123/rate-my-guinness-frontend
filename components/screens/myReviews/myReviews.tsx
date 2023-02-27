import { Text, View } from "react-native";
import Layout from "../../templates/layout/layout";
import { firebase } from "../../../firebase";
import { useState, useEffect } from "react";
import { Review } from "../restaurantScreen/types";
import ReadReview from "../../molecules/readReview/readReviewComponent";
import { Pub } from "../../templates/mapView/types";
import MyReview from "../../molecules/myReview/myReview";

export default function MyReviewsScreen({ navigation }: { navigation: any }) {
  const [review, setReview] = useState<Review[]>([]);
  const reviewRef = firebase.firestore().collection("reviews");

  useEffect(() => {
    reviewRef
      .where("user", "==", firebase.auth().currentUser?.uid)
      .onSnapshot((querySnapshot) => {
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

  return (
    <Layout>
      {review.length > 0 ? (
        review.map((r) => {
          return (
            <View key={r.id}>
              <MyReview review={r} {...{ navigation }} />
            </View>
          );
        })
      ) : (
        <Text style={{ color: "white" }}>
          Nothing to see here, get out there and start reviewing!
        </Text>
      )}
    </Layout>
  );
}
