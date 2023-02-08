import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { styles } from "./styles";

const emptyIcon = require("../../../assets/empty-pint.png");
const fullIcon = require("../../../assets/full-pint.png");

export default function RatingIconArray({
  arr,
  setRating,
  rating,
}: {
  arr: number[];
  setRating: React.Dispatch<React.SetStateAction<number>>;
  rating: number;
}) {
  return (
    <View style={styles.iconContainer}>
      {arr.map((i, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setRating(i)}
            style={{ width: "9%", paddingBottom: 16 }}
          >
            <Image source={rating >= i ? fullIcon : emptyIcon} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
