import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Função para formatar o objeto de endereço em uma string legível
const formatAddress = (address) => {
  if (!address) return 'Endereço não disponível';
  return `${address.street}, ${address.number} - ${address.district}, ${address.city}`;
};

export default function BarbershopScreen() {
  const router = useRouter();
  const [barbershops, setBarbershops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarbershops = async () => {
      try {
        const response = await fetch('http://SEU_IP_LOCAL:PORTA/api/barbershops');
        const data = await response.json();
        if (response.ok) {
          setBarbershops(data);
        } else {
          throw new Error(data.message || 'Erro ao buscar barbearias');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBarbershops();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>Erro: {error}</Text>;
  }

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.infoContainer}>
          <Title>{item.name}</Title>
          <Paragraph>{formatAddress(item.address)}</Paragraph>
        </View>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/user/barbershop/${item._id}`)}
          style={styles.button}
        >
          Barbeiros
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={barbershops}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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