import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useLoadFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
      'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
      'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  return fontsLoaded;
}
