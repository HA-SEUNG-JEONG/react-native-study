import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import { useAuthStore } from "@/stores/auth";
import "./globals.css";

export default function RootLayout() {
    // 부팅 시 SecureStore 토큰 복구 시도 (Phase 2)
    const restore = useAuthStore((s) => s.restore);
    useEffect(() => {
        restore();
    }, [restore]);

    return (
        <QueryClientProvider client={queryClient}>
            {/* SafeAreaProvider: useSafeAreaInsets()가 작동하려면 트리 최상단에 필요 */}
            <SafeAreaProvider>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="post/[id]"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="auth/login"
                        options={{
                            presentation: "modal",
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="auth/signup"
                        options={{
                            presentation: "modal",
                            headerShown: false,
                        }}
                    />
                </Stack>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}
