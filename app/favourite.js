import { View, Text } from "react-native";
import React, {useEffect} from "react";
import { useNavigation } from "expo-router";


export default function Favourite() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
           title: "Favourite List",
           headerTitleAlign: "center"
            });
      }, [navigation]);
  return (
    <View>
      <Text>This is the Favourite page!</Text>
    </View>
  );
}
