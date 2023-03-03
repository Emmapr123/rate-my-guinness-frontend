import { Pub } from "../../templates/mapView/types";
import { Marker } from "react-native-maps";

export default function PubMarker({
  pub,
  navigation,
}: {
  pub: Pub;
  navigation: any;
}) {
  return (
    <Marker
      pinColor="black"
      title={pub.name}
      coordinate={{
        latitude: pub.location.latitude,
        longitude: pub.location.longitude,
      }}
      onPress={() =>
        navigation.navigate("Restaurant", {
          name: pub.name,
          id: pub.id,
          location: pub.location,
        })
      }
    />
  );
}
