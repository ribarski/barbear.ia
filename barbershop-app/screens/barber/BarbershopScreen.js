import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserProvider';

const formatAddress = (address) => {
  if (!address) return 'Endereço não disponível';
  return `${address.street}, ${address.number} - ${address.district}, ${address.city}`;
};

export default function BarbershopScreen() {
  const router = useRouter();
  const { 
    user, 
    role, 
    loading, 
    error, 
    barbershops, 
    barbers, 
    fetchBarbershops,
    fetchBarbersByShop,
    fetchBarbers 
  } = useUser();

  useEffect(() => {
    fetchBarbershops();
    fetchBarbersByShop();
    fetchBarbers();
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
          <Text variant="titleLarge">{item.name}</Text>
          <Text variant="bodyMedium">{formatAddress(item.address)}</Text>
        </View>
        <Button 
          mode="contained" 
          onPress={() => router.push(`barbers/${item._id}`)}
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
        data={barbershops || []}
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