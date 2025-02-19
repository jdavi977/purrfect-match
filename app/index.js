import { Text, View, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>PURRFECT MATCH</Text>
      <Image source = {require("../assets/images/icon.png")} />
    </View>
  );
}
