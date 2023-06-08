import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  modalBack: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalFront: {
    width: "70%",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#3A3969',
    gap: 10,
    elevation: 5
  },
  loginText: {
    color: '#f5f5f5',
    fontSize: 25,
    textAlign: "center"
  },
  closeBtn: {
    alignSelf: "flex-end",
    borderRadius: 5,
    backgroundColor: "#f00",
    paddingHorizontal: 5,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  }});
