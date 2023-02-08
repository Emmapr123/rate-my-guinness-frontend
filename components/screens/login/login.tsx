import { useState } from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import { styles } from "./styles";

function LoginWithSocialsButtons({ setScreen }: { setScreen: any }) {
  return (
    <>
      <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>
        Welcome to the guinness advisor!
      </Text>
      <Text>
        Find your nearest quality pint of guinness, and leave reviews for pubs
        that you have visited!
      </Text>
      <View style={{ flex: 1, paddingBottom: 40 }}>
        <View style={{ height: 32 }} />
        <StyledButton
          variant="secondary"
          fontVariant="small"
          title="Continue with Apple"
          onPress={() => console.log("emmalog ")}
        />
        <Spacer />
        <StyledButton
          variant="secondary"
          fontVariant="small"
          title="Continue with Google"
          onPress={() => console.log("emmalog ")}
        />
        <Spacer />
        <StyledButton
          variant="secondary"
          fontVariant="small"
          title="Continue with Meta"
          onPress={() => console.log("emmalog ")}
        />
        <Spacer />
        <StyledButton
          variant="secondary"
          fontVariant="small"
          title="Continue with Email"
          onPress={() => setScreen(true)}
        />
      </View>
    </>
  );
}

function SignUpWithEmail({ setLoggedIn }: { setLoggedIn: any }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>Name</Text>
      <TextInput placeholder="John Doe" />
      <Spacer />
      <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>Birthday</Text>
      <TextInput placeholder="02-02-1998" />
      <Spacer />
      <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>Email</Text>
      <TextInput placeholder="example@email.com" />
      <Spacer />
      <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>Password</Text>
      <TextInput placeholder="********" />
      <Spacer />
      <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>
        Confirm Password
      </Text>
      <TextInput placeholder="*********" />
      <View style={{ height: 56, marginTop: 40 }}>
        <StyledButton title="Save" onPress={() => setLoggedIn(true)} />
      </View>
    </View>
  );
}

export default function LoginScreen({ setLoggedIn }: { setLoggedIn: any }) {
  const [screen, setScreen] = useState("login");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, paddingVertical: 16 }}>
          The Guinness advisor
        </Text>
        {screen === "login" ? (
          <LoginWithSocialsButtons {...{ setScreen }} />
        ) : (
          <SignUpWithEmail {...{ setLoggedIn }} />
        )}
      </View>
    </SafeAreaView>
  );
}
