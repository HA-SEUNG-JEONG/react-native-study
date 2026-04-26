import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/stores/auth";

export default function LoginScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const login = useAuthStore((s) => s.login);

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            await login(email, password);
            router.back();
        } catch (e) {
            Alert.alert(
                "로그인 실패",
                e instanceof Error ? e.message : "알 수 없는 오류"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-primary"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingTop: insets.top + 16,
                    paddingBottom: insets.bottom + 16,
                    paddingHorizontal: 24,
                    justifyContent: "center",
                }}
                keyboardShouldPersistTaps="handled"
            >
                <Text className="text-white text-3xl font-bold mb-2">
                    로그인
                </Text>
                <Text className="text-gray-400 mb-8">
                    모의 JWT — 이메일 형식 + 비밀번호 4자 이상
                </Text>

                <View className="gap-4">
                    <View>
                        <Text className="text-gray-300 text-sm mb-1">
                            이메일
                        </Text>
                        <TextInput
                            className="bg-gray-800 text-white rounded-xl px-4 py-4"
                            placeholder="email@example.com"
                            placeholderTextColor="#6b7280"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            returnKeyType="next"
                            editable={!submitting}
                        />
                    </View>

                    <View>
                        <Text className="text-gray-300 text-sm mb-1">
                            비밀번호
                        </Text>
                        <TextInput
                            className="bg-gray-800 text-white rounded-xl px-4 py-4"
                            placeholder="••••••••"
                            placeholderTextColor="#6b7280"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
                            editable={!submitting}
                        />
                    </View>

                    <Pressable
                        className="bg-accent rounded-xl py-4 items-center mt-2 flex-row justify-center gap-2"
                        onPress={handleSubmit}
                        disabled={submitting}
                        style={{ opacity: submitting ? 0.6 : 1 }}
                    >
                        {submitting && (
                            <ActivityIndicator size="small" color="#fff" />
                        )}
                        <Text className="text-white font-bold text-base">
                            {submitting ? "로그인 중..." : "로그인"}
                        </Text>
                    </Pressable>

                    <Pressable
                        className="items-center py-2"
                        onPress={() => router.replace("/auth/signup")}
                        disabled={submitting}
                    >
                        <Text className="text-gray-400">
                            계정이 없으신가요?{" "}
                            <Text className="text-accent font-semibold">
                                회원가입
                            </Text>
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
