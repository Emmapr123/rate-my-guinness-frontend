import React, { useState } from "react";
import ShowMapView from "./components/templates/mapView/mapView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantScreen from "./components/screens/restaurantScreen/restaurantScreen";
import WriteAReview from "./components/screens/writeAReview/writeAReview";
import LoginScreen from "./components/screens/login/login";
import { SignUpWithEmail } from "./components/screens/signUpWithEmail/signUpWithEmail";
import ContinueWithEmail from "./components/screens/continueWithEmail/continueWithEmail";

const Stack = createStackNavigator();

export default function App() {
  const navOptions = {
    headerStyle: {
      backgroundColor: "white",
    },
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTintColor: "black",
    headerBackTitleVisible: false,
  } as const;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="continueWithEmail"
          component={ContinueWithEmail}
          options={{
            title: "Log in",
            ...navOptions,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="signUpWithEmail"
          component={SignUpWithEmail}
          options={{
            title: "Sign up",
            ...navOptions,
          }}
        />
        <Stack.Screen
          name="Rate my Guinness"
          component={ShowMapView}
          options={{
            title: "Rate my Guinness",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={{
            ...navOptions,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Write a review"
          component={WriteAReview}
          options={{
            title: "Write a review",
            ...navOptions,
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
