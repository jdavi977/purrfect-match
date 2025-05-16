import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const Card = ({ name, age, breed, image, location, onPress, gender, id, pictures, size }) => {

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
            <Image source={image} style={styles.image} />
            <LinearGradient
            colors={["transparent", "rgba(0,0,0,.9)"]}
            style={styles.gradient}>
            <View style={styles.userContainer}>
                <Text style={styles.descriptionText}>
                {size} {breed} ︳ {age}/{gender} ︳ {id}
                </Text>
                <Text style={styles.topText}><Text style={styles.nameText}>{name},</Text> {age}</Text>
                <View style={styles.locationText}>
                    <Entypo name="location" size={12} color="#007AFF" />
                    <Text style={{marginLeft: 8, color: "white", fontWeight: 500, fontSize: 14}}>{location}</Text>
                </View>
            </View>
            </LinearGradient>
        </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: height * -0.035,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  outlineLeft: {
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 25,
  },

  outlineRight: {
    borderColor: "green",
    borderWidth: 5,
    borderRadius: 25,
  },

  outlineReset: {
    borderColor: "white",
    borderWidth: 0,
    borderRadius: 10,
  },

  userContainer: {
    position: "absolute",
    bottom: height *0.1,
    left: 15,
  },
  image: {
    width: width * 0.9,
    height: height * 0.75,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  topText: {
    fontSize: 30,
    color: "white",
  },
  nameText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  preferenceText: {
    marginLeft: 3,
    marginTop: 3,
    fontSize: 13,
    color: "white",
  },
  locationText: {
    marginTop: 4,
    fontSize: 13,
    color: "white",
    flexDirection: "row",
    alignItems: "center"
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 500,
    color: "white",
  },
  preferenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
