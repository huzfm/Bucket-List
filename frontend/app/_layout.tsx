import { Stack } from "expo-router";
import "./../global.css";

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

import React from "react";
import { View, Text, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Link } from "expo-router";

SplashScreen.preventAutoHideAsync(); // Prevents splash screen from hiding immediately

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    heading: require("../assets/fonts/SpaceMono-Regular.ttf"),
    headingBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
    placeholder: require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  // If fonts are still loading, keep the splash screen visible
  if (!fontsLoaded) {
    return null; // This will keep the splash screen visible
  }

  // Hide the splash screen once fonts are loaded
  SplashScreen.hideAsync();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
