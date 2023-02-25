import { View, Text, SafeAreaView } from "react-native";
import StyledButton from "../../atoms/button/button";
import Spacer from "../../atoms/spacer/spacer";
import { styles } from "./styles";

function LoginWithSocialsButtons({ navigation }: { navigation: any}) {
  return (
    <>
      <Text style={{ fontWeight: "bold", paddingVertical: 8 }}>
        Welcome to Lorcan's app!
      </Text>
      <Text>
        Find your nearest quality pint of guinness, and leave reviews for pubs
        that you have visited!
      </Text>
      <View style={{ flex: 1, paddingTop: 32, justifyContent: 'flex-end', alignContent: 'flex-end' }}>
        {/* <StyledButton
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
        <Spacer /> */}
        <StyledButton
          variant="secondary"
          fontVariant="small"
          title="Continue with Email"
          onPress={() => navigation.navigate("continueWithEmail")}
        />
      </View>
    </>
  );
}

export default function LoginScreen({ navigation }: { navigation: any}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, paddingVertical: 16 }}>
        Lorcan's app
        </Text>
        <LoginWithSocialsButtons {...{navigation}} />
      </View>
    </SafeAreaView>
  );
}
