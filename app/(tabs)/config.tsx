import { useSettings } from '@/components/SettingsContext';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Settings() {
  const { settings, updateSettings } = useSettings(); // Usa el contexto para acceder y actualizar configuraciones
  const [tempRate, setTempRate] = useState(settings.rate.toString());

  const saveRate = () => {
    const newRate = parseFloat(tempRate);
    if (!isNaN(newRate)) {
      updateSettings({ rate: newRate }); // Actualiza el ratio en el contexto
    }
  };

  useEffect(() => {
    setTempRate(settings.rate.toString());
  }, [settings]);

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.label}>Configurar ratio de conversión (Yen - Eur):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Yen -> Euro"
          value={tempRate}
          onChangeText={setTempRate}
        />
      </View>

      <Button title="Guardar" onPress={saveRate}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  settingsContainer: { flex: 1, paddingHorizontal: 12 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderBottomWidth: 1, fontSize: 16, marginBottom: 16 },
  saveButton: { marginTop: 16 },
});
