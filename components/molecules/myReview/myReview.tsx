import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import BinSVG from "../../atoms/binSVG/bin";
import IconButton from "../../atoms/iconButton/iconButton";
import PintSVG from "../../atoms/pintSVG/pintSVG";
import { firebase } from "../../../firebase";
import { Review } from "../../screens/restaurantScreen/types";
import { useEffect, useState } from "react";
import { styles } from "../readReview/styles";
import Divider from "../../atoms/divider/divider";
import { Pub } from "../../templates/mapView/types";

export default function myReview({
  review,
  navigation,
}: {
  review: Review;
  navigation: any;
}) {
  const pubRef = firebase.firestore().collection("pubs");
  const [loading, setLoading] = useState<boolean>(true);
  const [pub, setPub] = useState<Pub>({} as Pub);
  const arr = Array.from({ length: 10 }, (_, index) => index + 1);

  useEffect(() => {
    pubRef
      .where(firebase.firestore.FieldPath.documentId(), "==", review.pubId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { name, location } = doc.data();
          // @ts-ignore
          setPub({ name, location });
        });
        setLoading(false);
      });
  }, []);

  const deleteReview = () => {
    firebase.firestore().collection("reviews").doc(review.id).delete();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Restaurant", {
          name: pub.name,
          id: review.pubId,
          location: pub.location,
        })
      }
    >
      {loading ? (
        <ActivityIndicator color={"gold"} size={"large"} animating={loading} />
      ) : (
        <>
          <View style={styles.account}>
            <Text style={styles.name}>{pub.name}</Text>
            <IconButton
              navigate={() => deleteReview()}
              icon={<BinSVG height={20} width={20} color={"gold"} />}
            />
          </View>
          <Divider />
          <View style={styles.pints}>
            {arr.map((i, index) => {
              return (
                <PintSVG
                  key={index}
                  height={20}
                  width={20}
                  color={review.rating >= i ? "gold" : "white"}
                />
              );
            })}
          </View>
          <Text style={styles.title}>{review.title}</Text>
          <Text style={styles.description}>{review.description}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
