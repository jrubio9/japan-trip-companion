import { useSettings } from '@/components/SettingsContext';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';

export default function Settings() {
  const { settings, updateSettings } = useSettings(); // Usa el contexto para acceder y actualizar configuraciones
  const [tempRate, setTempRate] = useState(settings.rate.toString());

  const saveSettings = async () => {
    // Validaciones
    const newRate = parseFloat(tempRate);
    if (isNaN(newRate)) { 
      Toast.show({type: 'error', text1: 'Error', text2: 'Enter a valid number' });
      return;
     }
    Keyboard.dismiss(); // Cierra el teclado
    try {
      await updateSettings({ rate: newRate });
      Toast.show({type: 'success', text1: 'Saved!', text2: "Settings updated successfully."});
    } catch {
      console.error('Error', 'No se pudo guardar la configuración.');
      Toast.show({type: 'error', text1: 'Error...', text2: 'Settings could not be saved.' });
    }
    
  };

  useEffect(() => {
    setTempRate(settings.rate.toString());
  }, [settings]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Language picker soon...</Text>
      <View style={styles.settingsContainer}>
          <Text style={styles.label}>Ratio de conversión (Yen - Eur):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Yen -> Euro"
            value={tempRate}
            onChangeText={setTempRate}
          />
      </View>
      <Button title="Guardar"  onPress={saveSettings}/>
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
  settingsContainer: { flex: 1, paddingHorizontal: 8, marginTop: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderBottomWidth: 1, fontSize: 16, marginBottom: 16 },
  saveButton: { marginTop: 16 },
});
