import { View } from 'react-native';

import { Fonts } from '@/constants/theme';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

export default function HomeScreen() {

    const primary = useThemeColor({}, 'primary')

    return (
        <View
            style={{
                padding: 20,
            }}
        >
            <ThemedText style={{ fontFamily: Fonts.custom.thin}}>HomeScreen</ThemedText>
            <ThemedText style={{ fontFamily: Fonts.custom.regular}}>HomeScreen</ThemedText>
            <ThemedText style={{ fontFamily: Fonts.custom.bold, color: primary}}>HomeScreen</ThemedText>
        </View>
    )
}