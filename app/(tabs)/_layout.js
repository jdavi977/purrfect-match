import { Tabs } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Dimensions } from 'react-native';

const ICON_SIZE = 27;
const { width, height } = Dimensions.get("screen");

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          height: height * 0.09,
          paddingTop: height * 0.01
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require("../../assets/images/bPaw.png") : require("../../assets/images/gPaw.png")}
              style={styles.settingIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favourites",
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require("../../assets/images/bFavourite-1.png") : require("../../assets/images/gFavourite.png")}
              style={styles.settingIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? require("../../assets/images/bUser.png") : require("../../assets/images/gUser.png")}
              style={styles.settingIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  settingIcon: {
    height: width * 0.06,
    width: width * 0.06
  },
})
