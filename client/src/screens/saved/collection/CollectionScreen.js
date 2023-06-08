import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardArticle from "../../../component/home/cardArticle/CardArticle";
import { styles } from "./collectionStyles";
import { iconsCard, iconsComments } from "../../../utils/iconOptions";
import { MY_IP } from "react-native-dotenv";
import { updateSaved } from "../../../redux/actions";
import { LinearGradient } from "expo-linear-gradient";

const CollectionScreen = ({ route }) => {
  const [deteleVisibility, setDeteleVisibility] = useState(false);
  const data = route.params;
  const userId = useSelector((state) => state.loggedUser.userId);
  const ids = data.posts.map((obj) => obj.postId);
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) =>
    state.articles.filter((obj) => ids.includes(obj._id))
  );

  const [showDots, setShowDots] = useState(false); //Show edit and delete icons
  const [visible, setVisible] = useState(false);
  const handleDots = () => {
    setShowDots(!showDots);
  };
  //Input EDIT
  const ContainerEdit = () => {
    const [title, setTitle] = useState(data.title);
    const handleChange = (text) => {
      setTitle(text);
    };

    const handleSubmit = () => {
      const bodyEdit = {
        title: title,
      };
      fetch(`http://${MY_IP}:4000/api/users/updateSaved/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyEdit),
      })
        .then((res) => {
          if (res.ok) {
            dispatch(updateSaved(userId));
            console.log("Folder has been updated successfully");
          } else throw new Error("No response from server");
        })
        .catch((err) => console.log(err));
      setVisible(false);
    };

    if (data.title !== null) {
      return (
        <View style={styles.containerEdit}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "95%",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Estás renombrando la carpeta:
            </Text>

            <Text
              onPress={() => {
                Keyboard.dismiss();
                setVisible(false);
              }}
              style={{ fontSize: 28, color: "#f5f5f5" }}
            >
              x
            </Text>
          </View>

          <View
            style={{ height: 1, width: "120%", backgroundColor: "white" }}
          ></View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95%",
              marginVertical: 5,
            }}
          >
            <LinearGradient
              colors={["#34aba6", "#131af8", "#9344ca"]}
              start={[0, 0]}
              end={[1, 0]}
              locations={[0, 0.5, 1]}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                maxWidth: "80%",
              }}
            >
              <TextInput
                value={title}
                onChangeText={handleChange}
                style={styles.inputEdit}
                autoFocus
              />
            </LinearGradient>

            <TouchableOpacity onPress={handleSubmit}>
              <Image
                source={require("../../../../assets/send-active.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  //Edit FN
  const editBoard = () => {
    setVisible(true);
  };
  //Delete FN
  const deleteBoard = () => {
    fetch(`http://${MY_IP}:4000/api/users/delete-folder/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          dispatch(updateSaved(userId));
          console.log("Folder" + data.title + "has been deleted succesfully");
        } else throw new Error("No response from server");
      })
      .catch((err) => console.error(err));
    console.log("Has eliminado la carpeta: " + data.title);
    setDeteleVisibility(false);
  };
  //Show edit and delete options
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

  return (
    <View style={styles.colecctionContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.descri}>{data.description}</Text>
        </View>

        <TouchableOpacity onPress={handleDots} style={styles.dots}>
          {showDots ? <OptionsBoard /> : iconsCard.account.dots}
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={savedArticles}
        renderItem={({ item }) => (
          <CardArticle
            item={item}
            toggleModal={() => console.log("Esta fn no es necesaria")}
          ></CardArticle>
        )}
      />
      {visible && <ContainerEdit />}
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
    </View>
  );
};

export default CollectionScreen;
