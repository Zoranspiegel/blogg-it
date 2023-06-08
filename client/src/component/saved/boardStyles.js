import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerBoard: {
    height: 195,
    backgroundColor: "#3a3969",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    width: 365,
  },
  containerHeader: { flexDirection: "row", justifyContent: "space-between" },
  dots: {
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    paddingRight: 60,
    color: "#222143",
    fontSize: 20,
    borderRadius: 5,
  },

  //prev articles
  boardTitle: {
    color: "#f5f5f5",
    fontWeight: "500",
    fontSize: 20,
  },
  prevContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  textEmpty: { marginTop: 50, fontSize: 22, textAlign: "center" },
  prevArticle: {
    height: 100,
    width: 170,
    backgroundColor: "#222143",
    borderRadius: 14,
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

export default styles;
