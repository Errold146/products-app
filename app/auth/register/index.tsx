import { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { router } from 'expo-router';

export default function RegisterScreen() {

    const { height } = useWindowDimensions()
    const backgroundColor = useThemeColor({}, 'background')
    const register = useAuthStore(state => state.register)

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        try {
            await register(fullName, email, password)
            Alert.alert('Felicidades', 'Usuario creado correctamente')
            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error: any) {
            alert(error.message)
        }
    }

    return (

        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1 }}
        >
            <ScrollView
                style={{
                    paddingHorizontal: 40,
                    backgroundColor
                }}
            >
                {/* Encabezado */}
                <View
                    style={{
                        paddingTop: height * 0.35
                    }}
                >
                    <ThemedText type='title' style={{ marginBottom: 10 }}>Crear Cuenta</ThemedText>
                    <ThemedText style={{ color: 'gray'}}>Por favor, complete su información</ThemedText>
                </View>

                {/* Nombre Completo, Email y password */}
                <View style={{ marginTop: 20}}>
                    <ThemedTextInput 
                        placeholder='Nombre Completo'
                        autoCapitalize='words'
                        icon='person-outline'
                        value={fullName}
                        onChangeText={setFullName}
                    />

                    <ThemedTextInput 
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        icon='mail-outline'
                        value={email}
                        onChangeText={setEmail}
                    />
                    
                    <ThemedTextInput 
                        placeholder='Contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                        icon='lock-closed-outline'
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {/* Spacer */}
                <View style={{marginTop: 10}} />

                {/* Botón de iniciar sesión */}
                <ThemedButton 
                    onPress={handleRegister}
                    icon='arrow-forward-circle-outline'
                >
                    Crear Cuenta
                </ThemedButton>

                {/* Enlace al registro */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}
                >
                    <ThemedText>¿Ya tienes cuenta?</ThemedText>
                    <ThemedLink 
                        href={'/auth/login'} 
                        style={{ marginVertical: 20, marginHorizontal: 10}}
                    >
                        Iniciar Sesión
                    </ThemedLink>
                </View>

            </ScrollView>    
        </KeyboardAvoidingView>
    )
}