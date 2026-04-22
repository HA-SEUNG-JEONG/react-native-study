import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
    return (
        // SafeAreaProvider: useSafeAreaInsets()가 작동하려면 트리 최상단에 필요
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
                <Stack.Screen
                    name="auth/login"
                    options={{ presentation: "modal", headerShown: false }}
                />
                <Stack.Screen
                    name="auth/signup"
                    options={{ presentation: "modal", headerShown: false }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}
