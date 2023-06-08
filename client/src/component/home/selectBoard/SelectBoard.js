import {
  Modal,
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { styles } from "./selectBoardStyles";
import { iconsCard, iconsArticle } from "../../../utils/iconOptions";
import { useState, useEffect } from "react";
import CreateBoard from "../createBoard/CreateBoard";
import { useDispatch, useSelector } from "react-redux";
import { MY_IP } from "react-native-dotenv";
import { updateSaved } from "../../../redux/actions";

const ModalSave = ({ visible, setVisible, data }) => {
  const [showCreate, setShowCreate] = useState(false); // Estado de CreateBoard
  const [saved, setSaved] = useState(true);
  const [boards, setBoards] = useState([]);
  const savedB = useSelector((state) => state.loggedUser.saved); //Acceder a las carpetas

  const dispacth = useDispatch();

  //funcion guardado
  const savedFn = (title) => {
    const bodyBoard = {
      postId: data.postId,
      title: title,
      images: data.images,
    };
    fetch(`http://${MY_IP}:4000/api/users/saved/${data.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyBoard),
    })
      .then((res) => {
        if (res.ok) {
          console.log(`se ha guardado exitosament en ${title}`);
          dispacth(updateSaved(data.userId));
          setVisible(false);
        } else {
          throw new Error("something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (savedB && savedB.length > 0) {
      const filteredBoards = savedB.filter(
        (obj) => obj.title !== "Leer más tarde"
      );
      setBoards(filteredBoards);
    }
  }, [savedB]);

  const renderBoards = (boards) => {
    return boards.length > 0 ? (
      <FlatList
        data={boards}
        renderItem={({ item }) => (
          <BoardItem item={item} savedFn={savedFn} data={data} />
        )}
      />
    ) : (
      <CreateItem setShowCreate={setShowCreate} setVisible={setVisible} />
    );
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            {/* See Later Board */}
            <TouchableOpacity
              onPress={() => savedFn("Leer más tarde")}
              style={styles.defaultContainer}
            >
              <View style={styles.leftSide}>
                <View style={styles.miniPrev}>
                  <ImageBackground
                    source={{ uri: data.images }}
                    imageStyle={{ width: 80, height: 80 }}
                  >
                    <Text>.</Text>
                  </ImageBackground>
                </View>
                <Text style={styles.text}>Leer más tarde</Text>
              </View>
              <View style={styles.rigthSide}>
                {saved ? iconsCard.saved.filled : iconsArticle.plus}
              </View>
            </TouchableOpacity>
            {/* Info */}
            <View style={styles.infoContainer}>
              <Text onPress={() => setVisible(false)} style={styles.text}>
                Colecciones
              </Text>
              <Text
                onPress={() => {
                  setShowCreate(true);
                  setVisible(false);
                }}
                style={{ color: "#37B4A1" }}
              >
                Nueva Coleccion
              </Text>
            </View>

            {renderBoards(boards)}
          </View>
        </View>
      </Modal>
      <CreateBoard
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        data={data}
        setVisible={setVisible}
      />
    </>
  );
};

const CreateItem = ({ setShowCreate, setVisible }) => {
  return (
    <View style={styles.boardContainer}>
      <View style={styles.leftSide}>
        <View style={styles.miniPrev}>
          <ImageBackground
            source={require("../../../../assets/cross.jpg")}
            imageStyle={{ width: 80, height: 80 }}
          >
            <Text>.</Text>
          </ImageBackground>
        </View>
        <Text
          onPress={() => {
            setShowCreate(true);
            setVisible(false);
          }}
          style={styles.text}
        >
          Crear Colección
        </Text>
      </View>
      <View
        onPress={() => {
          setShowCreate(true);
        }}
        style={styles.rigthSide}
      >
        {iconsArticle.plus}
      </View>
    </View>
  );
};
//Aspectos de los tableros que se muestran en el flatList excluyendo Leer más tarde
const BoardItem = ({ item, savedFn }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => savedFn(item.title)}
        style={styles.boardContainer}
      >
        <View style={styles.leftSide}>
          <View style={styles.miniPrev}>
            {item.posts[0] ? (
              <ImageBackground
                source={{ uri: item.posts[0].images }}
                imageStyle={{ width: 80, height: 80 }}
              >
                <Text>.</Text>
              </ImageBackground>
            ) : (
              <ImageBackground
                source={require("../../../../assets/cross.jpg")} // en caso de que la carpeta este vacía.
                imageStyle={{ width: 80, height: 80 }}
              >
                <Text>.</Text>
              </ImageBackground>
            )}
          </View>
          <Text style={styles.text}>{item.title}</Text>
        </View>
        <View style={styles.rigthSide}>{iconsArticle.plus}</View>
      </TouchableOpacity>
    </>
  );
};

export default ModalSave;
