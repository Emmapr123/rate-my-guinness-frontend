import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { MAP_REGION } from "../../templates/mapView/types";
import { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { styles } from "../../templates/mapView/styles";

export default function Directions({ route }: { route: any }) {
  const mapRef = React.createRef();
  const { id, name, location } = route.params;
  const [currentLocation, setCurrentLocation] = useState({});
  const [destination, setDestination] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });

  const goToMyLocation = async () => {
    // @ts-ignore
    mapRef.current.animateCamera({
      center: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let currentLoc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5,
      });
      setCurrentLocation({
        longitude: currentLoc.coords.longitude,
        latitude: currentLoc.coords.latitude,
      });
    })();
  }, []);

  useEffect(() => {
    goToMyLocation();
  }, [currentLocation]);

  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      region={MAP_REGION}
      // @ts-ignore
      ref={mapRef}
      showsUserLocation={true}
    >
      <Marker
        title="My Location"
        // @ts-ignore
        coordinate={currentLocation}
      />
      <Marker title={name} coordinate={destination} />
      <MapViewDirections
        // @ts-ignore
        origin={currentLocation}
        destination={destination}
        strokeWidth={3}
        strokeColor={"black"}
      />
    </MapView>
  );
}
