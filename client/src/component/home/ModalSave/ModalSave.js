import { Modal, View, Text } from "react-native";
import { styles } from "./ModalSaveStyles";
import { useState, useEffect } from "react";
import SelectBoard from "../selectBoard/SelectBoard.js";

const ModalSave = ({ alert, setAlert, data, deleteSaved }) => {
  const [visible, setVisible] = useState(false); // estado de SelectModal// Elegir tablero

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 2500);
  }, [alert]);

  const handleLink = () => {
    console.log(deleteSaved);
    deleteSaved(data.postId); //Se elimina de leer más tarde.
    setVisible(true);
  };

  return (
    <View>
      <Modal visible={alert} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.info}>Guardado en </Text>
              <Text style={styles.boardName}>Leer más tarde</Text>
            </View>
            <Text style={styles.link} onPress={handleLink}>
              Colecciones
            </Text>
          </View>
        </View>
      </Modal>
      <SelectBoard visible={visible} setVisible={setVisible} data={data} />
    </View>
  );
};

export default ModalSave;
