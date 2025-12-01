import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/presentation/theme/hooks/use-color-scheme';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor({}, 'background')

	// Carga de fuentes personalizada
	const [fontsLoaded] = useFonts({
		'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
		'Kanit-Bold': require('../assets/fonts/Kanit-Bold.ttf'),
		'Kanit-Thin': require('../assets/fonts/Kanit-Thin.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ backgroundColor, flex: 1 }}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack
					screenOptions={{
						headerShown: false
					}}
				>
					{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
					{/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
