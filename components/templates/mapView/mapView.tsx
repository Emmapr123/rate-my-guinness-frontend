import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./styles";
import { firebase } from "../../../firebase";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
export interface Pub {
  id: string;
  name: string | undefined;
  location: GeolocationCoordinates;
}

export default function ShowMapView({ navigation }: { navigation: any }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.50986,
    longitude: 0.118092,
    latitudeDelta: 1,
    longitudeDelta: 0.5,
  });

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
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={mapRegion}>
        {pubs.map((pub) => {
          return (
            <Marker
              key={pub.name}
              title={pub.name}
              coordinate={{
                latitude: pub.location.latitude,
                longitude: pub.location.longitude,
              }}
              onPress={() =>
                navigation.navigate("Restaurant", {
                  name: pub.name,
                  id: pub.id,
                })
              }
              style={{ backgroundColor: "black" }}
            />
          );
        })}
      </MapView>
    </View>
  );
}
