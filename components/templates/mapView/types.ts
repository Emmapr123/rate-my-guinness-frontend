export interface Pub {
  id: string;
  name: string | undefined;
  location: GeolocationCoordinates;
}

export const MAP_REGION = {
  latitude: 51.50986,
  longitude: 0.118092,
  latitudeDelta: 1,
  longitudeDelta: 0.5,
}
