import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemedText } from './ThemedText';

export function SocialLinks() {

    const handleX = () => {
        Linking.openURL('https://x.com/rubzdev').catch((err) => console.error('Error al abrir X:', err));
        };
    const handleKoFi = () => {
        Linking.openURL('https://ko-fi.com/rubzdev').catch((err) => console.error('Error al abrir Ko-fi:', err));
    };
    const handleGithub = () => {
        Linking.openURL('https://github.com/jrubio9/trip-companion').catch((err) => Toast.show({type: 'error', text1: 'Error opening Github...', text2: err.message }));
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
        <TouchableOpacity onPress={handleGithub} style={[styles.button]}>
            <Image source={require('../assets/images/logo-github-min.png')} style={styles.logo} />
            <ThemedText type='buttonText'>Public sourcecode</ThemedText>
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
