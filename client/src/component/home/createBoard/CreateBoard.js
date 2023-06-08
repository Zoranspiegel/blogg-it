import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./createBoardStyles";
import { iconsArticle } from "../../../utils/iconOptions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSaved } from "../../../redux/actions";
import { MY_IP } from "react-native-dotenv";

const CreateBoard = ({ showCreate, setShowCreate, data, setVisible }) => {
  const dispacth = useDispatch();
  const [title, setTitle] = useState("");
  const [descri, setDescri] = useState("");

  const handleChangeTitle = (text) => {
    setTitle(text);
  };

  const handleChangeDecri = (text) => {
    setDescri(text);
  };
  const handleSubmit = () => {
    if (title !== "") {
      if (descri.length > 50 || title.length > 30) {
        console.log("Este espacio no es para escribir un nuevo libro sagrado."); // modal de aviso o texto debajo del respectivo input
      } else {
        const bodyBoard = {
          postId: data.postId,
          title: title,
          images: data.images,
          description: descri
            ? descri
            : "Aquí puedes añadir una breve descripción",
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
              console.log(`la carpeta ${title} ha sido creada exitosamente`);
              dispacth(updateSaved(data.userId));
              setVisible(false);
              setShowCreate(false);
            } else {
              throw new Error("something went wrong");
            }
          })
          .catch((err) => console.error(err));
      }
    } else {
      console.log("Olvidaste poner el nombre de la carpeta");
    }
  };
  return (
    <Modal visible={showCreate} transparent animationType="fade">
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          {/* See Later Board */}
          <View style={styles.infoContainer}>
            <View style={styles.leftSide}>
              <TouchableOpacity onPress={() => setShowCreate(false)}>
                {iconsArticle.cross}
              </TouchableOpacity>
              <Text style={styles.text}>Nueva Colección</Text>
            </View>

            <Text
              onPress={handleSubmit}
              style={{ color: "#3B79BE", fontSize: 22 }}
            >
              Crear
            </Text>
          </View>

          <TextInput
            autoFocus
            style={title.length < 30 ? styles.input : styles.inputError}
            placeholder="Nombre de la coleccion"
            placeholderTextColor="white"
            onChangeText={handleChangeTitle}
          />
          <TextInput
            style={descri.length < 50 ? styles.input : styles.inputError}
            placeholder="Descripción (opcional)"
            placeholderTextColor="white"
            onChangeText={handleChangeDecri}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateBoard;
