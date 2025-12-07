import { Ionicons } from '@expo/vector-icons'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'
import { useThemeColor } from '../hooks/use-theme-color'

interface Props extends PressableProps {
    icon?: keyof typeof Ionicons.glyphMap
    children: string
}

export default function ThemedButton({icon, children, ...rest}: Props) {

    const primaryColor = useThemeColor({}, 'primary')

    return (
        <Pressable
            {...rest}
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? primaryColor + '90' : primaryColor
                },
                styles.btn
            ]}
        >
            <Text style={{ color: 'white', fontSize: 22, lineHeight: 24 }}>{children}</Text>

            {
                icon && (
                    <Ionicons name={icon} size={22} color='white' style={{ marginHorizontal: 5 }} />
                )
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})