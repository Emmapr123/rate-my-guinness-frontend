import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { View } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./styles";
import { firebase } from "../../../firebase";
import { decode, encode } from "base-64";
import AccountSVG from "../../atoms/accountSVG/accountSVG";
import PubMarker from "../../atoms/pubMarker/pubMarker";
import { MAP_REGION, Pub } from "./types";
import IconButton from "../../atoms/iconButton/iconButton";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function ShowMapView({ navigation }: { navigation: any }) {
  const [pubs, setPubs] = useState<Pub[]>([]);
  const pubRef = firebase.firestore().collection("pubs");

  useEffect(() => {
    pubRef.onSnapshot((querySnapshot) => {
      const newPubs: Pub[] = [];
      querySnapshot.forEach((doc) => {
        const { name, location } = doc.data() as Pub;
        newPubs.push({
          id: doc.id,
          name,
          location,
        });
      });
      setPubs(newPubs);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={MAP_REGION}
      >
        {pubs.map((pub) => {
          return <PubMarker key={pub.id} pub={pub} navigation={navigation} />;
        })}
      </MapView>
      <IconButton
        styles={styles.button}
        navigate={() => navigation.navigate("Account")}
        icon={<AccountSVG height={50} width={50} color={"black"} />}
      />
    </View>
  );
}
