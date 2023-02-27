import { View, Text, ActivityIndicator } from "react-native";
import { Review } from "../../screens/restaurantScreen/types";
import { styles } from "./styles";
import { firebase } from "../../../firebase";
import { User } from "../../screens/signUpWithEmail/types";
import { useEffect, useState } from "react";
import PintSVG from "../../atoms/pintSVG/pintSVG";
import BinSVG from "../../atoms/binSVG/bin";
import IconButton from "../../atoms/iconButton/iconButton";
import Divider from "../../atoms/divider/divider";
import WarningModal from "../modal/warningModal";

export default function ReadReview({ review }: { review: Review }) {
  const userRef = firebase.firestore().collection("users");
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string[]>([]);
  const arr = Array.from({ length: 10 }, (_, index) => index + 1);
  const [self, setSelf] = useState<boolean>(false);
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    userRef
      .where(firebase.firestore.FieldPath.documentId(), "==", review.user)
      .onSnapshot((querySnapshot) => {
        const uname: string[] = [];
        querySnapshot.forEach((doc) => {
          const { username } = doc.data() as User;
          // @ts-ignore
          uname.push(username);
          doc.id === firebase.auth().currentUser?.uid && setSelf(true);
        });
        setUsername(uname);
        setLoading(false);
      });
  }, []);

  const deleteReview = () => {
    setModalOpen(false);
    firebase.firestore().collection("reviews").doc(review.id).delete();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={"gold"} size={"large"} animating={loading} />
      ) : (
        <>
          <View style={styles.account}>
            <Text style={styles.name}>{username}</Text>
            {self && (
              <IconButton
                navigate={() => setModalOpen(true)}
                icon={<BinSVG />}
              />
            )}
          </View>
          <Divider />
          <View style={styles.pints}>
            {arr.map((i, index) => {
              return (
                <PintSVG
                  key={index}
                  color={review.rating >= i ? "gold" : "white"}
                />
              );
            })}
          </View>
          <Text style={styles.title}>{review.title}</Text>
          <Text style={styles.description}>{review.description}</Text>
          {modalIsOpen && (
            <WarningModal
              modalIsOpen={modalIsOpen}
              setModalOpen={setModalOpen}
              title={"Are you sure you want to delete this review?"}
              description={"This action cannot be undone."}
              buttonText={"Delete"}
              onPress={() => deleteReview()}
            />
          )}
        </>
      )}
    </View>
  );
}
