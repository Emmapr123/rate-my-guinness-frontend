import React from "react";
import ShowMapView from "./components/templates/mapView/mapView";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantScreen from "./components/screens/restaurantScreen/restaurantScreen";
import WriteAReview from "./components/screens/writeAReview/writeAReview";
import LoginScreen from "./components/screens/login/login";
import { SignUpWithEmail } from "./components/screens/signUpWithEmail/signUpWithEmail";
import ContinueWithEmail from "./components/screens/continueWithEmail/continueWithEmail";
import AccountScreen from "./components/screens/accountScreen/accountScreen";
import EditAccount from "./components/screens/editAccount/editAccount";
import MyReviewsScreen from "./components/screens/myReviews/myReviews";
import { firebase } from "./firebase";

const Stack = createStackNavigator();
// @ts-ignore
export const UserContext = React.createContext();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: { type: any; token: any }) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

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

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: string) => {
        dispatch({ type: "SIGN_IN", token: data });
      },
      signOut: () => dispatch({ type: "SIGN_OUT", token: null }),
      signUp: async (data: string) => {
        dispatch({ type: "SIGN_IN", token: data });
      },
    }),
    []
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await firebase.auth().currentUser?.uid;
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  console.log("emma log userToken", state.userToken);

  return (
    <UserContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
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
            </>
          ) : (
            <>
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
                  headerTitle: "",
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
              <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                  title: "Account",
                  ...navOptions,
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="Edit account"
                component={EditAccount}
                options={{
                  title: "Edit account",
                  ...navOptions,
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="My reviews"
                component={MyReviewsScreen}
                options={{
                  title: "My reviews",
                  ...navOptions,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
