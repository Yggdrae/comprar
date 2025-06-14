import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 64,
    backgroundColor: "#D0D2D8",
  },
  image: {
    height: 34,
    width: 134,
  },
  form: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 42,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 24,
    padding: 24,
    paddingTop: 32,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E6EC",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto"
  },
  clearText: {
    fontSize: 12,
    color: "#828282",
    fontWeight: "600"
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#eef0f5",
    marginVertical: 16
  },
  contentList: {
    paddingTop: 24,
    paddingBottom: 62
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    padding: 32,
    opacity: 0.5
  },
  emptyListText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#828282",
  }
});
