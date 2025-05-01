import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const ICON_SIZE = 27;

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          height: 90,
          paddingBottom: 20,
          borderTopWidth: 0,
          elevation: 0, // Android shadow
          shadowOpacity: 0, // IOS shadow
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="paw" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bookmark" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
