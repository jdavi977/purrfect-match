import { Text, View, Image } from "react-native";
import SwipeDeck from "../components/SwipingDeck";

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
        <SwipeDeck />
      </View>
      <View>
        <Text>Purrfect Match</Text>
      </View>

    </View>
  );
}
