import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { Image } from 'expo-image';
import { FontAwesome, Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');


const FavouriteCard = ({ name, age, image, onPress, breed, id, gender, viewType, location }) => {
  console.log("View", viewType);

  const cardStyle = viewType === "grid" ? styles.gridCardContainer : styles.listCardContainer;
  const imageWrapperStyle = viewType === "grid" ? styles.gridImageWrapper : styles.listImageWrapper;
  const heartIconStyle = viewType === "grid" ? styles.gridHeartIcon : styles.listHeartIcon;
  const imageStyle = viewType === "grid" ? styles.gridImage : styles.listImage;
  const nameStyle = viewType === "grid" ? styles.gridName : styles.listName;
  const infoTextStyle = viewType === "grid" ? styles.gridInfoText : styles.listInfoText;




  return (
    <View style={cardStyle}>
        <TouchableOpacity style={imageWrapperStyle} onPress={onPress}>
          <Image source={image} style={imageStyle} />
          <FontAwesome name="heart" size={13} color="#FF3366" style={heartIconStyle} />
        <View style={infoTextStyle}>
          <Text style={nameStyle}>{name}</Text>
          <View style={styles.listTop}>
            <Text style={styles.middleInfo}>{age}/</Text>
            <Text style={styles.middleInfo}>{gender}</Text>
          </View>
          <Text style={styles.middleInfo}>{breed}</Text>
          <Text style={styles.middleInfo}>{id}</Text>
          <View style={styles.shelterInfo}>
            <Entypo name="location" size={14} color="#ff9800" style={styles.locationIcon}/>
            <Text style={styles.shelterText}>{location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listCardContainer: {
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  listImageWrapper: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
    padding: 6,
    borderColor: "#E8E8E8",
    borderWidth: 2,
  },
  gridCardContainer: {
    marginVertical: 2,
    width: width * 0.42
  },
  gridImageWrapper: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    borderColor: "#E8E8E8",
    borderWidth: 2,
    marginBottom: height * 0.01,
    justifyContent: "center",
  },
  listImage: {
    height: height * 0.15,
    width: width * 0.325,
    borderRadius: 12,
  },
  gridImage: {
    width: "100%",
    height: height * 0.225
  },
  listHeartIcon: {
    position: "absolute",
    top: 6,
    right: 10,
    padding: 5,
    backgroundColor: "#e8e8e8",
    borderRadius: 999,
  },
  gridHeartIcon: {
    position: "absolute",
    top: height * 0.195,
    right: 6,
    padding: 5,
    backgroundColor: "#e8e8e8",
    borderRadius: 999,
  },
  listTop: {
    flexDirection: "row",
  },
  listName: {
    fontWeight: "600",
    color: "#0c7dd6",
    fontSize: 16,
    marginRight: width * 0.01,
  },
  gridName: {
    fontWeight: "600",
    color: "#0c7dd6",
    fontSize: 16,
    marginRight: width * 0.01,
    marginTop: width * 0.03,
  },
  age: {
    fontSize: 16,
    color: "#8e8e8e",
  },
  middleInfo: {
    color: "#333333",
    marginTop: width * 0.005,
    color: "black",
    fontWeight: 500,
    fontSize: 13
  },
  savedText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  nameText: {
    color: "grey"
  },
  listInfoText: {
    marginLeft: width * 0.035,
  },
  gridInfoText: {
    marginLeft: width * 0.045,
  },
  locationIcon: {
    height: height * 0.017,
    width: width * 0.035,
    color: "#d7a100"
  },
  shelterInfo: {
    flexDirection: "row",
    marginTop: height * 0.04,
  },
  shelterText: {
    fontSize: 11,
    color: "#666",
    marginLeft: width * 0.01,
    fontWeight: 500
  },
});

export default FavouriteCard;
