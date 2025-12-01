import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

export default function LoginScreen() {

    const { login } = useAuthStore()
    const { height } = useWindowDimensions()
    const backgroundColor = useThemeColor({}, 'background')

    const [isPosting, setIsPosting] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const onLogin = async () => {

        const { email, password } = form
        if ( email.length === 0 || password.length === 0 ) return;

        setIsPosting(true)
        try {
            const wasSuccessFul = await login(email, password)
            if (wasSuccessFul) {
                router.replace('/')
            }
        } catch (err: any) {
            Alert.alert('Error', err.message)
        } finally {
            setIsPosting(false)
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
                    <ThemedText type='title' style={{ marginBottom: 10 }}>Ingresar</ThemedText>
                    <ThemedText style={{ color: 'gray'}}>Por favor ingrese para continuar</ThemedText>
                </View>

                {/* Email y password */}
                <View style={{ marginTop: 20}}>
                    <ThemedTextInput 
                        placeholder='Ingrese su email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        icon='mail-outline'
                        value={form.email}
                        onChangeText={val => setForm({...form, email: val})}
                    />
                    
                    <ThemedTextInput 
                        placeholder='Ingrese su contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                        icon='lock-closed-outline'
                        value={form.password}
                        onChangeText={val => setForm({...form, password: val})}
                    />
                </View>

                {/* Spacer */}
                <View style={{marginTop: 10}} />

                {/* Botón de iniciar sesión */}
                <ThemedButton 
                    icon='arrow-forward-circle-outline'
                    onPress={onLogin}
                    disabled={isPosting}
                >Ingresar</ThemedButton>

                {/* Enlace al registro */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                    }}
                >
                    <ThemedText>¿No tienes cuenta?</ThemedText>
                    <ThemedLink href={'/auth/register'} style={{ marginVertical: 20, marginHorizontal: 10}}>Crear Cuenta</ThemedLink>
                </View>

            </ScrollView>    
        </KeyboardAvoidingView>
    )
}