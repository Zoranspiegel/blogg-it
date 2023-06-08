import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  modalBg: {
    justifyContent: "flex-end",
    marginBottom: 0,
    alignItems: "center",
    flex: 1,
  },
  modalContainer: {
    height: "45%",
    width: "95%",
    borderRadius: 15,
    backgroundColor: "#555",
    gap: 10,
    elevation: 5,
  },
  // Focus Board

  leftSide: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },

  //Info
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#aaa",
  },

  input: {
    fontSize: 18,
    color: "white",
    borderBottomColor: "white",
    borderColor: "#555",
    borderWidth: 2,
    width: "90%",
    alignSelf: "center",
    padding: 4,
    marginVertical: 10,
  },
  inputError: {
    fontSize: 18,
    color: "red",
    borderBottomColor: "red",
    borderColor: "#555",
    borderWidth: 2,
    width: "90%",
    alignSelf: "center",
    padding: 4,
    marginVertical: 10,
  },
});
