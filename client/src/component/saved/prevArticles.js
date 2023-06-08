import { View, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./boardStyles";

export const RenderPrevArticle = ({ articles }) => {
  const num = articles.length;
  if (num === 1) {
    return (
      <View style={styles.prevContainer}>
        <PrevArticleFill articles={articles} />
        <View style={styles.prevArticle}></View>
      </View>
    );
  } else if (num >= 2) {
    return (
      <View style={styles.prevContainer}>
        <PrevArticleFill articles={articles} />
        <PrevArticleFill articles={articles} n={1} />
      </View>
    );
  } else if (num === 0) {
    return (
      <View style={styles.prevContainer}>
        <View style={styles.prevArticle}></View>
        <View style={styles.prevArticle}></View>
      </View>
    );
  }
};

export const PrevArticleFill = ({ n = 0, articles }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("article", articles[n]._id)}
    >
      <ImageBackground
        style={styles.prevArticle}
        source={{ uri: articles[n].images }}
        imageStyle={{ borderRadius: 14 }}
      ></ImageBackground>
    </TouchableOpacity>
  );
};
