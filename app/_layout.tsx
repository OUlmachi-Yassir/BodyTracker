import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="camera" options={{ title: 'Camera' }} />
      <Stack.Screen name="Profile" options={{ title: 'Profile' }} /> */}
    </Stack>
  );
}
