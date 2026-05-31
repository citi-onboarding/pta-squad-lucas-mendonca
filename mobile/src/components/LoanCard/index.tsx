import { Calendar } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { Loan } from "../../types/loanTypes";
import styles from "./styles";

type LoanCardProps = {
  loan: Loan;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getDynamicStatus(loan: Loan) {
  if (loan.status === "DEVOLVIDO") return "DEVOLVIDO";

  const today = new Date();
  const dueDate = new Date(loan.dueDate);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (today > dueDate) return "ATRASADO";

  return "EM_ANDAMENTO";
}

function getStatusLabel(status: Loan["status"]) {
  if (status === "DEVOLVIDO") return "Devolvido";
  if (status === "ATRASADO") return "Atrasado";
  return "Em andamento";
}

function getStatusStyle(status: Loan["status"]) {
  if (status === "DEVOLVIDO") return styles.statusReturned;
  if (status === "ATRASADO") return styles.statusLate;
  return styles.statusActive;
}

function getStatusTextStyle(status: Loan["status"]) {
  if (status === "DEVOLVIDO") return styles.statusReturnedText;
  if (status === "ATRASADO") return styles.statusLateText;
  return styles.statusActiveText;
}

function getCategoryImage(category?: string) {
  switch (category) {
    case "ROMANCE":
      return require("../../assets/romance.png");
    case "CIENCIAS":
      return require("../../assets/ciencias.png");
    case "HISTORIA":
      return require("../../assets/historia.png");
    case "TECNOLOGIA":
      return require("../../assets/tecnologia.png");
    case "INFANTIL":
      return require("../../assets/infantil.png");
    default:
      return require("../../assets/romance.png");
  }
}

export function LoanCard({ loan }: LoanCardProps) {
  const dynamicStatus = getDynamicStatus(loan);

  return (
    <View style={styles.card}>
      <Image
        source={getCategoryImage(loan.book?.category)}
        style={styles.bookImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {loan.book?.title ?? "Livro não informado"}
        </Text>

        <View style={[styles.statusBadge, getStatusStyle(dynamicStatus)]}>
          <Text style={[styles.statusText, getStatusTextStyle(dynamicStatus)]}>
            {getStatusLabel(dynamicStatus)}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Calendar size={18} color="#747489" />
            <Text style={styles.infoText}>
              Locação: {formatDate(loan.loanDate)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Calendar size={18} color="#747489" />
            <Text style={styles.infoText}>
              Devolução: {formatDate(loan.dueDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}