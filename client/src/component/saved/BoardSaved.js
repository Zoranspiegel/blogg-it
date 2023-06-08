import { Text, View, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RenderPrevArticle } from "./prevArticles";
import { iconsCard, iconsComments } from "../../utils/iconOptions";
import styles from "./boardStyles";
import { MY_IP } from "react-native-dotenv";
import { useState, useEffect } from "react";
import { updateSaved } from "../../redux/actions";

const BoardSaved = ({ item, setData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [deteleVisibility, setDeteleVisibility] = useState(false);
  const userId = useSelector((state) => state.loggedUser.userId);
  const ids = item.posts.map((obj) => obj.postId);
  const lastArticles = ids.length < 2 ? ids.slice(-1) : ids.slice(-2);
  const articles = useSelector((state) =>
    state.articles.filter((obj) => lastArticles.includes(obj._id))
  );
  const [visible, setVisible] = useState(false); //Edit and delete visibility

  const handleDots = () => {
    setVisible(!visible);
  };
  const deleteBoard = () => {
    fetch(`http://${MY_IP}:4000/api/users/delete-folder/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          dispatch(updateSaved(userId));
          console.log("Folder" + item.title + "has been deleted succesfully");
        } else throw new Error("No response from server");
      })
      .catch((err) => console.error(err));
    console.log("Has eliminado la carpeta: " + item.title);
  };

  const editBoard = () => {
    setData({ title: item.title, folderId: item._id });
  };

  const OptionsBoard = () => {
    return (
      <View style={{ flexDirection: "row", gap: 40 }}>
        <Text
          onPress={() => setDeteleVisibility(true)}
          style={{ color: "white" }}
        >
          {iconsComments.trash}
        </Text>
        <Text onPress={editBoard} style={{ color: "white" }}>
          {iconsComments.edit}
        </Text>
      </View>
    );
  };

  const handleNavigate = () => {
    navigation.navigate("Collection", item);
  };

  return (
    <>
      <View style={styles.containerBoard}>
        <View style={styles.containerHeader}>
          <TouchableOpacity onPress={() => handleNavigate()}>
            <Text style={styles.boardTitle}>{item.title}</Text>

            <Text style={{ color: "#f5f5f5" }}>
              {item.posts.length} artículo(s)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDots} style={styles.dots}>
            {visible ? <OptionsBoard /> : iconsCard.account.dots}
          </TouchableOpacity>
        </View>
        <RenderPrevArticle articles={articles} />
      </View>
      {/*MODAL DELETE*/}
      <Modal visible={deteleVisibility} transparent>
        <View style={styles.modalDeleteBack}>
          <View style={styles.modalDeleteFront}>
            <Text style={styles.modalDeleteText1}>¿Deseas eliminar</Text>
            <Text style={styles.modalDeleteText1}>esta carpeta?{"\n"}</Text>

            <View style={{ alignItems: "stretch", backgroundColor: "#37b4a1" }}>
              <TouchableOpacity
                onPress={deleteBoard}
                activeOpacity={0.5}
                style={styles.modalDeleteBtn}
              >
                <Text style={styles.modalDeleteText1}>Si</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeteleVisibility(false)}
                activeOpacity={0.5}
                style={styles.modalDeleteBtn}
              >
                <Text style={styles.modalDeleteText1}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BoardSaved;
