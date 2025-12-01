import { useColorScheme } from '@/presentation/theme/hooks/use-color-scheme'
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'
import { useAuthStore } from '../store/useAuthStore'

export default function LogoutIconButton() {

    const primaryColor = useThemeColor({}, 'primary')
    const backgroundColor = useThemeColor({}, 'background')
    const colorScheme = useColorScheme()
    const { logout } = useAuthStore()

    const iconColor = colorScheme === 'dark' ? '#FFF' : primaryColor
    const borderColor = colorScheme === 'dark' ? '#FFF' : primaryColor

    return (
        <Pressable
            onPress={logout}
            style={({pressed}) => [
                styles.button,
                {
                    backgroundColor: pressed ? backgroundColor + '30' : backgroundColor + '10',
                    borderColor: borderColor
                }
            ]}
        >
            <Ionicons name='log-out-outline' size={24} color={iconColor} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        marginRight: 10
    }
})