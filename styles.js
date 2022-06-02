import { StyleSheet } from "react-native";
import { Colors } from "./constants";
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#3B3B3F",
  },
  container: {
    flex: 1,
    backgroundColor: "#3B3B3F",
    alignItems: "center",
    paddingTop: 50,
    color: "white",
  },
  summaryTop: {
    alignContent: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    marginTop: 80,
  },
  summaryRemaining: {
    color: Colors.red,
    fontWeight: "bold",
  },
  summaryDaily: {
    color: "white",
    fontWeight: "bold",
    paddingRight: 4,
  },
  summaryTotal: {
    color: Colors.green,
    fontSize: 80,
  },
  inputs: {
    width: 300,
    marginTop: 50,
  },
  inputsTabContainer: {
    flexDirection: "row",
    alignContent: "stretch",
    justifyContent: "space-between",
  },
  inputsTab: {
    padding: 20,
    width: 140,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    borderRadius: 8,
  },
  inputsTabActive: {
    padding: 20,
    width: 140,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  inputsTabText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  inputsDescription: {
    backgroundColor: Colors.inputBackground,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 8,
    padding: 20,
    color: "white",
  },
  inputsAmount: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 8,
    paddingLeft: 20,
    color: "white",
    flex: 1 / 2,
  },
  inputsSubmit: {
    padding: 13,
    flex: 1 / 2,
    width: 140,
    height: 50,
    backgroundColor: Colors.blue,
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 16,
  },
  listContainer: {
    marginTop: 120,
    alignContent: "center",
    width: "100%",
  },
  listItem: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark,
    alignItems: "center",
    padding: 12,
  },
  listItemTop: {
    alignContent: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemTopAmount: {
    color: Colors.green,
    fontWeight: "bold",
  },
  listItemDate: {
    color: "white",
  },
  widthWrapper: {
    width: 320,
  },
  settingsButton: {
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
