// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//     </ThemeProvider>
//   );
// }


import React from 'react';
import { Stack } from 'expo-router';
import { PhotoProvider } from '@/context/PhotoContext';

export default function RootLayout() {
  return (
    <PhotoProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PreviewScreen" 
          options={{ 
            title: 'Preview',
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: 'white',
          }} 
        />
        <Stack.Screen 
          name="MessageScreen" 
          options={{ 
            title: 'Add Message',
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: 'white',
          }} 
        />
        <Stack.Screen 
          name="PdfScreen" 
          options={{ 
            title: 'Your Memory',
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: 'white',
            headerBackVisible: false,
          }} 
        />
      </Stack>
    </PhotoProvider>
  );
}