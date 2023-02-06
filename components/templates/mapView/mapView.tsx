import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./styles";

export default function ShowMapView({ navigation }: { navigation: any }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.50986,
    longitude: 0.118092,
    latitudeDelta: 1,
    longitudeDelta: 0.5,
  });

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={mapRegion}>
        <Marker
          title={"The Tap Inn"}
          coordinate={{ latitude: 51.494424, longitude: -0.100752 }}
          onPress={() => navigation.navigate("Restaurant")}
          style={{ backgroundColor: "black" }}
        />
      </MapView>
    </View>
  );
}
