import { Text, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CardArticle from "../../../component/home/cardArticle/CardArticle";
import { styles } from "./collectionStyles";
import { iconsCard } from "../../../utils/iconOptions";
import DotsModal from "./dotsModal/DotsModal";

const CollectionScreen = ({ route }) => {
  const [visible, setVisible] = useState(false); // estado del DotsModal
  const data = route.params;
  const ids = data.posts.map((obj) => obj.postId);
  const [board, setBoard] = useState([]);
  const articles = useSelector((state) => state.articles);
  const savedArticles = articles.filter((obj) => ids.includes(obj._id));

  useEffect(() => {
    setBoard(savedArticles);
  }, [articles]);

  return (
    <View style={styles.colecctionContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text styles={styles.descri}>
            Artículos pendientes para revisar más tarde.
            {/* Límite de caracteres*/}
          </Text>
        </View>
        <Text onPress={() => setVisible(true)} style={styles.dots}>
          {iconsCard.account.dots}
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={board}
        renderItem={({ item }) => (
          <CardArticle
            item={item}
            toggleModal={() => console.log("hola")}
          ></CardArticle>
        )}
      />
      <DotsModal visible={visible} setVisible={setVisible} />
    </View>
  );
};

export default CollectionScreen;
