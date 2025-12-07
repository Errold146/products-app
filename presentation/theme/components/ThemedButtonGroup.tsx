import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColor } from '../hooks/use-theme-color'

interface Props {
    options: string[]
    selectedOptions: string[]
    onSelect: (option: string) => void
}

export default function ThemedButtonGroup({options, selectedOptions, onSelect}: Props) {
    const primaryColor = useThemeColor({}, 'primary')

    return (
        <View style={styles.container}>
            {
                options.map(opt => {
                    const isSelected = selectedOptions.includes(opt)
                    return (
                        <TouchableOpacity
                            key={opt}
                            onPress={() => onSelect(opt)}
                            style={[
                                styles.btn,
                                {
                                    borderColor: primaryColor,   // 👈 borde siempre con primaryColor
                                    borderWidth: isSelected ? 0 : 1, // 👈 si está seleccionado, sin borde
                                    backgroundColor: isSelected ? primaryColor : 'transparent'
                                }
                            ]}
                        >
                            <Text
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={[
                                    styles.btnText,
                                    isSelected && styles.selectedBtnText
                                ]}
                            >
                                {opt[0].toUpperCase() + opt.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    btn: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    btnText: {
        fontSize: 16,
        color: 'gray'
    },
    selectedBtnText: {
        color: '#fff'
    }
})
