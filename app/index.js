import React, {useState, useEffect} from "react";
import { Text, View, Image } from "react-native";
import {Card} from "../components/Card";
import {petData as petDataArray} from "../utils/petData";


export default function Index() {
  const [petData, setPetData] = useState(petDataArray);

  // If there are no more pets it will loop back
  useEffect(() => {
    if (petData.length === 0) { 
      setPetData(petDataArray);
    }
  }, [petData.length])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
    </View>
  );
}
