import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingBottom: 16,
    paddingTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  logo: {
    width: 82.5,
    height: 27.8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#18181B",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  searchInputContainer: {
    marginBottom: 20,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
    fontSize: 18,
    color: "#18181B",
  },
  searchButton: {
  marginBottom: 32,
  height: 64,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  backgroundColor: "#2C4A73",
  },
  searchButtonText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#FFFFFF",
  },
  countText: {
    marginBottom: 24,
    fontSize: 24,
    color: "#747489",
  },
  emptyStateContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    color: "#747489",
  },
});

export default styles