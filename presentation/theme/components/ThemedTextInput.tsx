import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap
}

export default function ThemedTextInput({icon, ...rest}: Props) {

    const [isActive, setIsActive] = useState(false)
    const inputRef = useRef<TextInput>(null)

    const primaryColor = useThemeColor({}, 'primary')
    const textColor = useThemeColor({}, 'text')
    
    return (
        <View
            style={{
                ...styles.border,
                borderColor: isActive ? primaryColor : '#ccc'
            }}
            onTouchStart={() => inputRef.current?.focus()}
        >
            {
                icon && (
                    <Ionicons 
                        name={icon}
                        size={24}
                        color={textColor}
                        style={{ marginHorizontal: 10 }}
                    />
                )
            }

            <TextInput 
                ref={inputRef}
                {...rest} 
                placeholderTextColor='#5c5c5c'
                onFocus={() => setIsActive(true)} 
                onBlur={() => setIsActive(false)}
                style={{
                    color: textColor,
                    flex: 1
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})