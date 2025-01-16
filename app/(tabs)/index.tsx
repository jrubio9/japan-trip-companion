import { Image, StyleSheet} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SocialLinks } from '@/components/SocialLinks';

export default function HomeScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sakura-fuji-min.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello traveler!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle">Why I've made this app?</ThemedText>
        <ThemedText style={styles.justified}>
          JapanTripCompanion is an app made for simplifying my trip to Japan and a way to learn React Native.
        </ThemedText>
      </ThemedView>
      <SocialLinks />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    width: "120%",
    bottom: -30,
    left: -15,
    position: 'absolute',
  }, 
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  contentContainer: {
    gap: 8,
    flex: 1,
    marginBottom: 16,
  },
  justified: {
    textAlign: 'justify',
  }
});
