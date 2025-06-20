import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Searchbar, Card, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { navigate } from 'expo-router/build/global-state/routing';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Localizando...');

  const categories = [
    { title: 'Corte', icon: 'content-cut' },
    { title: 'Barba', icon: 'mustache' },
    { title: 'Sobrancelha', icon: 'eyedropper-variant' },
    { title: 'Pacotes', icon: 'package-variant' },
    { title: 'Promoções', icon: 'sale' },
    { title: 'Agendamentos', icon: 'calendar' },
  ];

  // Buscar localização
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Permissão negada');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      let addr = await Location.reverseGeocodeAsync(loc.coords);
      if (addr.length > 0) {
        const { street, city, region } = addr[0];
        setAddress(`${street}, ${city} - ${region}`);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.locationText}>📍 {address}</Text>

        <Searchbar
          placeholder="Buscar serviços ou barbeiros..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        {/* Categorias */}
        <View style={styles.grid}>
          {categories.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <IconButton icon={item.icon} size={28} />
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Banner */}
        <Card style={styles.banner}>
          <Card.Cover source={{ uri: 'https://source.unsplash.com/600x300/?barber,haircut' }} />
          <Card.Title title="Agende seu horário" subtitle="Sem filas, direto pelo app" />
        </Card>

        {/* Espaço para rolagem */}
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 18, marginBottom: 16, color: '#13452C' }}>Serviços Populares</Text>
        <View style={styles.grid}>
          {categories.slice(0, 3).map((item, idx) => (
            <View key={idx} style={styles.card}>
              <IconButton icon={item.icon} size={28} />
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Navegação inferior */}
      <View style={styles.bottomNav}>
        <IconButton icon="home" iconColor='#FFFFFF' size={32} />
        <IconButton icon="camera" iconColor='#FFFFFF' size={32} 
          onPress={() => navigate('https://facecut-suggestion.vercel.app/')}
        />
        <IconButton icon="calendar" iconColor='#FFFFFF' size={32} />
        <IconButton icon="account" iconColor='#FFFFFF' size={32} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#FFEECC' 
  },
  container: { 
    padding: 16, 
    paddingBottom: 100 
  },
  locationText: { 
    fontSize: 16, 
    marginBottom: 12, 
    color: '#13452C' 
  },
  searchbar: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#13452C',
  },
  banner: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#13452C',
    height: 120,
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
