import { styles } from "./ModalLogin.styles.js";
import { View, Text, Button, Modal, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logToDb } from "../../redux/actions.js";
import {
  ALECTO,
  CHRONOS64,
  VITAE,
  ARIADNA,
  MEGA_BEATS,
  TENBU_HORIN,
  YEMONJA,
  NORVEGICUS,
  DIGITAL_DREAMER,
  NO_COUNTRY,
} from "react-native-dotenv";

export function ModalLogin({ modalVisibility, setModalVisibility }) {
  const dispatch = useDispatch();

  const logIn = (user) => {
    dispatch(logToDb(user));
    setModalVisibility(false);
  };

  return (
    <Modal visible={modalVisibility} animationType="fade" transparent>
      <View style={styles.modalBack}>
        <View style={styles.modalFront}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisibility(false)}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}>Debes ser un usuario registrado</Text>
          <Button title="ALECTO" onPress={() => logIn(ALECTO)} />
          <Button title="CHRONOS64" onPress={() => logIn(CHRONOS64)} />
          <Button title="VITAE" onPress={() => logIn(VITAE)} />
          <Button title="ARIADNA" onPress={() => logIn(ARIADNA)} />
          <Button title="MEGA_BEATS" onPress={() => logIn(MEGA_BEATS)} />
          <Button title="TENBU_HORIN" onPress={() => logIn(TENBU_HORIN)} />
          <Button title="YEMONJA" onPress={() => logIn(YEMONJA)} />
          <Button title="NORVEGICUS" onPress={() => logIn(NORVEGICUS)} />
          <Button title="DIGITAL_DREAMER" onPress={() => logIn(DIGITAL_DREAMER)} />
          <Button title="NO_COUNTRY" onPress={() => logIn(NO_COUNTRY)} />
        </View>
      </View>
    </Modal>
  );
}
