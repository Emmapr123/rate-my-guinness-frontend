import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import StyledButton from "../../atoms/button/button";
import Layout from "../../templates/layout/layout";
import { firebase } from "../../../firebase";
import { ActivityIndicator } from "react-native";

export default function AccountScreen() {
  // @ts-ignore
  const { signOut } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        signOut();
      })
      .catch((error) => {
        setLoading(false);
        // An error happened.
      });
  };
  return (
    <Layout footer={<StyledButton title="Log out" onPress={() => logOut()} />}>
      {loading && <ActivityIndicator size="large" color="gold" />}
    </Layout>
  );
}
