import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemedText } from './ThemedText';

export function SocialLinks() {
  const handleKoFi = () => {
    const koFiUrl = 'https://ko-fi.com/rubzdev';
    Linking.openURL(koFiUrl).catch((err) => console.error('Error al abrir Ko-fi:', err));
  };
  const handleX = () => {
    const koFiUrl = 'https://twitter.com/rubzdev';
    Linking.openURL(koFiUrl).catch((err) => console.error('Error al abrir X:', err));
  };

  const handleLinkPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.show({type: 'error', text1: 'Error opening ko-fi...', text2: "Can't open URL" })
    }
  };

  return (
    <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleX} style={[styles.button]}>
            <Image source={require('../assets/images/logo-x-min.png')} style={styles.logo} />
            <ThemedText type='buttonText'>Follow me on X</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleKoFi} style={[styles.button]}>
            <Image source={require('../assets/images/logo-kofi-min.png')} style={styles.logo} />
            <ThemedText type='buttonText'>Buy me a coffee</ThemedText>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    socialContainer: {
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        marginVertical: 16,
      },
      logo: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#A1CEDC',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }
});
