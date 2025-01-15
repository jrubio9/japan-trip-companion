import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

import { Collapsible } from '@/components/Collapsible';

export default function CommonPhrases() {
  const phrases = {
    Saludos: { icon: '👋', phrases: [
      { spanish: 'Hola', japanese: 'こんにちは', romaji: 'Konnichiwa' },
      { spanish: 'Adiós', japanese: 'さようなら', romaji: 'Sayōnara' },
      { spanish: 'Buenos días', japanese: 'おはようございます', romaji: 'Ohayō gozaimasu' },
      { spanish: 'Buenas noches', japanese: 'こんばんは', romaji: 'Konbanwa' },
      { spanish: 'Gracias', japanese: 'ありがとうございます', romaji: 'Arigatō gozaimasu' },
      { spanish: 'Por favor', japanese: '下さい', romaji: 'Kudasai' },
      { spanish: 'Por favor', japanese: 'お願いします', romaji: 'Onegaishimasu' },
    ]},
    Comida: { icon: '🍣', phrases: [
      { spanish: 'Quiero esto', japanese: 'これをください', romaji: 'Kore o kudasai' },
      { spanish: '¿Cuánto cuesta?', japanese: 'いくらですか？', romaji: 'Ikura desu ka?' },
      { spanish: 'Delicioso', japanese: '美味しい', romaji: 'Oishii' },
      { spanish: 'Agua, por favor', japanese: '水をください', romaji: 'Mizu, kudasai' },
      { spanish: 'La cuenta, por favor', japanese: 'お会計お願いします', romaji: 'Okaikei onegaishimasu' },
    ]},
    Transporte: { icon: '🛵', phrases: [
      { spanish: '¿Dónde está la estación?', japanese: '駅はどこですか？', romaji: 'Eki wa doko desu ka?' },
      { spanish: '¿Este tren va a...?', japanese: 'この電車は...に行きますか？', romaji: 'Kono densha wa ... ni ikimasu ka?' },
      { spanish: 'Un billete, por favor', japanese: '切符を一枚ください', romaji: 'Kippu o ichimai kudasai' },
      { spanish: '¿Cuánto cuesta el taxi?', japanese: 'タクシーはいくらですか？', romaji: 'Takushī wa ikura desu ka?' },
      { spanish: '¿Cuánto tarda en llegar?', japanese: 'どのくらいかかりますか？', romaji: 'Dono kurai kakarimasu ka?' },
    ]},
    Emergencias: { icon: '🧟‍♂️', phrases: [
      { spanish: 'Ayuda', japanese: '助けて', romaji: 'Tasukete' },
      { spanish: 'Llamar a la policía', japanese: '警察を呼んでください', romaji: 'Keisatsu o yonde kudasai' },
      { spanish: 'Estoy perdido', japanese: '道に迷いました', romaji: 'Michi ni mayoimashita' },
      { spanish: 'Necesito un médico', japanese: '医者が必要です', romaji: 'Isha ga hitsuyō desu' },
      { spanish: 'Alérgico a...', japanese: 'にアレルギーがあります', romaji: '... ni arerugī ga arimasu' },
      { spanish: 'Perdí mi pasaporte', japanese: 'パスポートをなくしました', romaji: 'Pasupōto o nakushimashita' },
    ]},
    Compras: { icon: '🎁', phrases: [
      { spanish: '¿Esto está en oferta?', japanese: 'これはセールですか？', romaji: 'Kore wa sēru desu ka?' },
      { spanish: '¿Puedo probar esto?', japanese: '試着してもいいですか？', romaji: 'Shichaku shite mo ii desu ka?' },
      { spanish: '¿Aceptan tarjetas de crédito?', japanese: 'クレジットカードは使えますか？', romaji: 'Kurejitto kādo wa tsukaemasu ka?' },
      { spanish: 'Busco...', japanese: 'を探しています', romaji: '... o sagashiteimasu' },
      { spanish: 'Demasiado caro', japanese: '高すぎます', romaji: 'Takasugimasu' },
      { spanish: '¿Hay otro color/tamaño?', japanese: '他の色やサイズはありますか？', romaji: 'Hoka no iro ya saizu wa arimasu ka?' },
    ]},
    Turismo: { icon: '🎎', phrases: [
      { spanish: '¿Dónde está el templo...?', japanese: 'の寺はどこですか？', romaji: '... no tera wa doko desu ka?' },
      { spanish: '¿A qué hora abre/cierra?', japanese: '何時に開きます/閉まりますか？', romaji: 'Nanji ni akimasu/shimarimasu ka?' },
      { spanish: '¿Puedo tomar fotos aquí?', japanese: 'ここで写真を撮ってもいいですか？', romaji: 'Koko de shashin o totte mo ii desu ka?' },
      { spanish: '¿Hay visitas guiadas?', japanese: 'ガイドツアーはありますか？', romaji: 'Gaido tsuā wa arimasu ka?' },
      { spanish: 'Necesito un mapa', japanese: '地図が必要です', romaji: 'Chizu ga hitsuyō desu' },
    ]},
    Hotel: { icon: '💤', phrases: [
      { spanish: 'Tengo una reserva', japanese: '予約があります', romaji: 'Yoyaku ga arimasu' },
      { spanish: '¿Puedo hacer el check-in?', japanese: 'チェックインできますか？', romaji: 'Chekkuin dekimasu ka?' },
      { spanish: '¿Dónde está mi habitación?', japanese: '部屋はどこですか？', romaji: 'Heya wa doko desu ka?' },
      { spanish: '¿Hay WiFi aquí?', japanese: 'WiFiはありますか？', romaji: 'WiFi wa arimasu ka?' },
      { spanish: 'Necesito más toallas', japanese: 'タオルをもっとください', romaji: 'Tauru o motto kudasai' },
      { spanish: '¿Puedo dejar mi equipaje aquí?', japanese: '荷物をここに置いてもいいですか？', romaji: 'Nimotsu o koko ni oite mo ii desu ka?' },
    ]},
    Clima: { icon: '🌞', phrases: [
      { spanish: '¿Va a llover hoy?', japanese: '今日は雨が降りますか？', romaji: 'Kyō wa ame ga furimasu ka?' },
      { spanish: 'Hace frío', japanese: '寒いです', romaji: 'Samui desu' },
      { spanish: 'Hace calor', japanese: '暑いです', romaji: 'Atsui desu' },
      { spanish: '¿Cuál es la temperatura?', japanese: '気温は何度ですか？', romaji: 'Kion wa nando desu ka?' },
      { spanish: '¿Habrá nieve mañana?', japanese: '明日は雪が降りますか？', romaji: 'Ashita wa yuki ga furimasu ka?' },
    ]},
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Common Phrases</Text>
      <Text style={styles.subtitle}>
        Useful phrases categorized to help you in different situations.
      </Text>

      {/* Tarjetas de frases */}
      {Object.entries(phrases).map(([category, { icon, phrases }]) => (
        <View key={category} style={styles.card}>
        <Collapsible title={`${icon} ${category}`}>
          {phrases.map((phrase, index) => (
            <View key={index} style={styles.phraseContainer}>
              <Text style={styles.spanish}>{phrase.spanish}</Text>
              <Text style={styles.romaji}>{phrase.romaji}</Text>
              <Text style={styles.japanese}>{phrase.japanese}</Text>
            </View>
          ))}
        </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    padding: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15, // Espacio entre tarjetas
  },
  phraseContainer: {  
    borderLeftColor: '#007BFF',
    borderLeftWidth: 3,
    paddingLeft: 12,  
    marginVertical: 8,
  },
  spanish: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  japanese: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 4,
  },
  romaji: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 2,
  },
});