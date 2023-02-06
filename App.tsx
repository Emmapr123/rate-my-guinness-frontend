import React from "react";
import ShowMapView from "./components/templates/mapView/mapView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantScreen from "./components/screens/restaurantScreen/restaurantScreen";
import WriteAReview from "./components/screens/writeAReview/writeAReview";

const Stack = createStackNavigator();

export default function App() {
  const navOptions = {
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  } as const;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Rate my Guinness"
          component={ShowMapView}
          options={{
            title: "Rate my Guinness",
            ...navOptions,
          }}
        />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={{
            ...navOptions,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Write a review"
          component={WriteAReview}
          options={{
            title: "Write a review",
            ...navOptions,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
