import { View, Text } from "react-native";
import { Review } from "../../screens/restaurantScreen/types";
import { styles } from "./styles";
import { firebase } from "../../../firebase";
import { User } from "../../screens/signUpWithEmail/types";
import { useEffect, useState } from "react";

export default function ReadReview({ review }: { review: Review }) {
  const userRef = firebase.firestore().collection("users");
  const [username, setUsername] = useState<string[]>([]);

  useEffect(() => {
    userRef.where("id", "==", review.user).onSnapshot((querySnapshot) => {
      const uname: string[] = [];
      querySnapshot.forEach((doc) => {
        const { username } = doc.data() as User;
        // @ts-ignore
        uname.push(username);
      });
      setUsername(uname);
      console.log(uname)
    });
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.description}>Rating: {review.rating}/10</Text>
      </View>
      <Text style={styles.title}>{review.title}</Text>
      <Text style={styles.description}>{review.description}</Text>
    </View>
  );
}
