import { useSettings } from '@/components/SettingsContext';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Keyboard } from 'react-native';

export default function CurrencyConverter() {
  const { settings } = useSettings();
  const [eurAmount, setEurAmount] = useState('');
  const [yenAmount, setYenAmount] = useState('');

  const [activeFocus, setActiveFocus] = useState(""); // "EUR" o "YEN"

  const clearValues = () => {
    setEurAmount('');
    setYenAmount('');
    Keyboard.dismiss(); // Cierra el teclado
  };

  const convertEurToYen = () => {
    if (activeFocus === 'YEN') return;
    const value = parseFloat(eurAmount);
    
    if (isNaN(value)) {
      setYenAmount('');
      return;
    } 
    const converted = value * settings.rate;
    setYenAmount(converted.toFixed(2));
  };

  const convertYenToEur = () => {
    if (activeFocus === 'EUR') return;
    const value = parseFloat(yenAmount);
    if (isNaN(value)) {
      setEurAmount('');
      return;
    } 
    const converted = value / settings.rate;
    setEurAmount(converted.toFixed(2));
  };

  // Ejecuta convertEurToYen cuando eurAmount cambie
  useEffect(() => {
    convertEurToYen();
  }, [eurAmount]); // eurAmount como dependencia

  // Ejecuta convertYenToEur cuando yenAmount cambie
  useEffect(() => {
    convertYenToEur();
  }, [yenAmount]); // yenAmount como dependencia


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <Text style={styles.subtitle}>
        Easy convert para evitar timaditas.
      </Text>

      {/* Conversion Box */}
      <View style={styles.card}>
        {/* Amount Input */}
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://flagcdn.com/w320/eu.png' }}
            style={styles.flag}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            value={eurAmount}
            onChangeText={setEurAmount}
            onFocus={() => setActiveFocus('EUR')}
          />
          <Text style={styles.exchangeRate}>€</Text>
        </View>

        {/* Swap Icon */}
        <View style={styles.row2}>
          <Text style={[styles.swapText, (activeFocus === 'EUR' && eurAmount) && styles.swapDirectionEnabled]}>&#x2193;</Text>
          <Text style={[styles.swapText, (activeFocus === 'YEN' && yenAmount) && styles.swapDirectionEnabled]}>&#x2191;</Text>
        </View>
        {/* Converted Amount */}
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://flagcdn.com/w320/jp.png' }}
            style={styles.flag}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            value={yenAmount}
            onChangeText={setYenAmount}
            onFocus={() => setActiveFocus('YEN')}
          />
          <Text style={styles.exchangeRate}>¥</Text>
        </View>
        {/* Clear Button */}
        <TouchableOpacity
          style={[
            styles.clearButton,
            !(eurAmount || yenAmount) && styles.disabledButton, // Estilo deshabilitado
          ]}
          onPress={clearValues}
          disabled={!(eurAmount || yenAmount)} // Deshabilita si no hay valores
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Indicative Exchange Rate */}
      <Text style={styles.exchangeRate}>
        Indicative Exchange Rate:
      </Text>
      <Text style={styles.exchangeRate}>
      1 EUR = {settings.rate} YEN
      </Text>
      <Text style={styles.exchangeRate}>
      5 EUR = {settings.rate * 5} YEN
      </Text>
      <Text style={styles.exchangeRate}>
      10 EUR = {settings.rate * 10} YEN
      </Text>
      <Text style={styles.exchangeRate}>
      20 EUR = {settings.rate * 20} YEN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  flag: {
    width: 40,
    height: 30,
    marginRight: 16,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 26,
    padding: 10,
  },
  swapText: {
    color: '#ccc',
    fontSize: 36,
  },
  exchangeRate: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#aaa', // Color deshabilitado
  },
  swapDirectionEnabled: {
    color: '#007BFF',
  },
  clearButton: {
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
