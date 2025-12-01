import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LogoutIconButton from '@/presentation/auth/components/LogoutIconButton';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';

export default function CheckAuthenticationLayout() {

    const { status, checkStatus } = useAuthStore()
    const backgroundColor = useThemeColor({}, 'background')

    useEffect(() => {
        checkStatus()
    }, [])

    if ( status === 'checking' ) {
        return (
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    backgroundColor
                }}
            >
                <ActivityIndicator  size={40} />
            </View>
        )
    }

    if ( status === 'unauthenticated' ) {
        return(
            <Redirect href={'/auth/login'} />
        )
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor,
                flex: 1
            }}
        >
            <Stack
                screenOptions={{
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor
                    },
                    contentStyle: {
                        backgroundColor
                    }
                }}
            >
                <Stack.Screen 
                    name='(home)/index'
                    options={{
                        title: 'Productos',
                        headerLeft: () => <LogoutIconButton />
                    }}
                />
            </Stack>
        </SafeAreaView>
    )

}