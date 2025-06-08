import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { BarberContext } from '../../navigation/AppNavigator/BarberProvider';

export default function BarberScreen() {
  const { id: barbershopId } = useLocalSearchParams();
  // Pega os dados e funções do Context
  const { barbers, loading, error, fetchBarbersByShop } = useContext(BarberContext);

  // O useEffect agora chama a função do provider com o ID da barbearia
  useEffect(() => {
    if (barbershopId) {
      fetchBarbersByShop(barbershopId);
    }
  }, [barbershopId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>Erro: {error}</Text>;
  }

  const renderItem = ({ item }) => (
    // O BOTÃO AGENDAR DEVE ROTEAR PARA A TELA DE AGENDAMENTOS QUANDO ESTIVER PRONTA
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.infoContainer}>
          <Text variant="titleLarge">{item.name}</Text>
          <Text variant="bodyMedium">Avaliação: {item.rating.toFixed(1)} ★</Text>
        </View>
        <Button 
          mode="contained" 
          style={styles.button}
        >
          Agendar
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={barbers}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.centered}>Nenhum barbeiro encontrado.</Text>}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#FFEECC' },
    card: { marginBottom: 16 },
    cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    infoContainer: { flex: 1, marginRight: 8 },
    button: { backgroundColor: '#13452C' }
});