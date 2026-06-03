import { Search } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoanCard } from "../../components/LoanCard";
import { findAllLoans } from "../../service/loans";
import { Loan } from "../../types/loanTypes";
import styles from "./styles";

function normalize(text: string) {
  return text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function LoansScreen() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function loadLoans() {
    const data = await findAllLoans();
    setLoans(data);
  }

  function handleSearch() {
    Keyboard.dismiss();
    setSearchedName(inputValue);
  }

  async function handleInitialLoad() {
    try {
      setIsLoading(true);
      await loadLoans();
    }catch(error){
        console.error("Erro ao atualizar o empréstimo", error)
    }
    finally {
      setIsLoading(false);
    }
  }

  async function handleRefresh() {
    try {
      setIsRefreshing(true);
      await loadLoans();
    }
    catch(error){
        console.error("Erro ao atualizar o empréstimo", error)
    }
     finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    handleInitialLoad();
  }, []);

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) =>
      normalize(loan.customerName).includes(normalize(searchedName))
    );
  }, [loans, searchedName]);

  function renderContent() {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#2C4A73" />;
    }

    if (!searchedName) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Por favor, digite o nome do cliente no campo acima para buscar seus
            empréstimos.
          </Text>
        </View>
      );
    }

    if (searchedName && filteredLoans.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Nenhum empréstimo encontrado para este cliente.
          </Text>
        </View>
      );
    }

    return (
      <>
        <Text style={styles.countText}>
          {filteredLoans.length} empréstimo(s) encontrado(s)
        </Text>

        {filteredLoans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logoCiti_semfundo-azul.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.headerTitle}>Meus Empréstimos</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.searchInputContainer}>
          <Search size={28} color="#747489" />

          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Digite o nome de um cliente..."
            placeholderTextColor="#9A9AA8"
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSearch}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>

        {renderContent()}
      </ScrollView>
    </View>
  );
}