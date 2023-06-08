import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  colecctionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020123",
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    margin: 12,
    paddingHorizontal: 20,
  },
  textContainer: {
    textAlign: "left",
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: "white",
    paddingRight: 60,
    color: "#222143",
    fontSize: 20,
    borderRadius: 5,
  },

  title: {
    color: "#f5f5f5",
    fontSize: 26,
    fontWeight: "500",
  },
  descri: {
    color: "#f5f5f5",
    fontSize: 14,
  },
  dots: {
    alignSelf: "center",
  },
  //inputEdit
  containerEdit: {
    width: "100%",
    padding: 5,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#3A3969",
    gap: 10,
    elevation: 5,
    display: "flex",
  },
  inputEdit: {
    width: "99%",
    backgroundColor: "#090841",
    color: "#f5f5f5",
    fontSize: 20,
    borderRadius: 10,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  //modalDelete
  modalDeleteBack: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  modalDeleteFront: {
    backgroundColor: "#3A3969",
    position: "relative",
    top: 300,
    width: "50%",
    justifyContent: "flex-end",
    borderRadius: 15,
    overflow: "hidden",
    paddingTop: 20,
  },
  modalDeleteBtn: {
    height: 31,
    backgroundColor: "#3A3969",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#302962",
  },
  modalDeleteText1: {
    textAlign: "center",
    color: "#f5f5f5",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalDeleteText2: {
    textAlign: "center",
    color: "#f5f5f5",
  },
});
