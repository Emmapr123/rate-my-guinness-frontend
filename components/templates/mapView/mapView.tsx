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
import * as Location from "expo-location";
import LocationSVG from "../../atoms/locationSVG/locationSVG";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function ShowMapView({
  navigation,
  route,
}: {
  navigation: any;
  route?: any;
}) {
  const { zoomIntoLocation } = route?.params || {};
  const [pubs, setPubs] = useState<Pub[]>([]);
  const pubRef = firebase.firestore().collection("pubs");
  const [location, setLocation] = useState(MAP_REGION);
  const mapRef = React.createRef();

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

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let currentLoc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5,
      });
      setLocation({
        longitude: currentLoc.coords.longitude,
        latitude: currentLoc.coords.latitude,
        latitudeDelta: 1,
        longitudeDelta: 0.5,
      });
    })();
  }, []);

  useEffect(() => {
    if (zoomIntoLocation) {
      // @ts-ignore
      mapRef.current.animateCamera({
        center: {
          latitude: parseFloat(zoomIntoLocation.latitude),
          longitude: parseFloat(zoomIntoLocation.longitude),
        },
      });
    }
  }, [zoomIntoLocation]);

  const goToMyLocation = async () => {
    // @ts-ignore
    mapRef.current.animateCamera({
      center: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={MAP_REGION}
        // @ts-ignore
        ref={mapRef}
        showsUserLocation={true}
      >
        {pubs.map((pub) => {
          return (
            <PubMarker
              key={pub.id}
              pub={pub}
              navigation={navigation}
              {...{ setLocation }}
            />
          );
        })}
      </MapView>
      <IconButton
        styles={styles.account}
        navigate={() => navigation.navigate("Account")}
        icon={<AccountSVG />}
      />
      <IconButton
        styles={styles.centre}
        navigate={() => goToMyLocation()}
        icon={<LocationSVG />}
      />
    </View>
  );
}
