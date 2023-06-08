import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020123',
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 17,
  },
  header: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 18
  },
  profilePh: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
  },
  logo: {
    fontSize: 26,
    marginLeft: "33%",
    color: '#f5f5f5',
  },
});
