import { Text, View, Image } from "react-native";
import SwipingDeck from "../components/SwipingDeck";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View> 
        <SwipingDeck />
      </View>
      <View>
        <Text>Purrfect Match</Text>
      </View>

    </View>
  );
}
