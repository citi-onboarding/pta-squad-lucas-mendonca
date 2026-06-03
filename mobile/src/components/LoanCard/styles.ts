import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bookImage: {
    width: 92,
    height: 128,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#18181B",
  },
  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusReturned: {
    backgroundColor: "#D1FAE5",
    borderColor: "#6EE7B7",
  },
  statusReturnedText: {
    color: "#047857",
  },
  statusActive: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
  },
  statusActiveText: {
    color: "#92400E",
  },
  statusLate: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
  },
  statusLateText: {
    color: "#B91C1C",
  },
  infoContainer: {
    gap: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#747489",
  },
});

export default styles;