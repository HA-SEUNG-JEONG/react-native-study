import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignupScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                <Text className="text-white text-3xl font-bold mb-2">회원가입</Text>
                <Text className="text-gray-400 mb-8">
                    Phase 2에서 실제 API 연동 예정
                </Text>

                <View className="gap-4">
                    <View>
                        <Text className="text-gray-300 text-sm mb-1">유저명</Text>
                        <TextInput
                            className="bg-gray-800 text-white rounded-xl px-4 py-4"
                            placeholder="username"
                            placeholderTextColor="#6b7280"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            returnKeyType="next"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-300 text-sm mb-1">이메일</Text>
                        <TextInput
                            className="bg-gray-800 text-white rounded-xl px-4 py-4"
                            placeholder="email@example.com"
                            placeholderTextColor="#6b7280"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            returnKeyType="next"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-300 text-sm mb-1">비밀번호</Text>
                        <TextInput
                            className="bg-gray-800 text-white rounded-xl px-4 py-4"
                            placeholder="8자 이상"
                            placeholderTextColor="#6b7280"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            returnKeyType="done"
                        />
                    </View>

                    <Pressable
                        className="bg-accent rounded-xl py-4 items-center mt-2"
                        onPress={() => router.back()}
                    >
                        <Text className="text-white font-bold text-base">가입하기</Text>
                    </Pressable>

                    <Pressable
                        className="items-center py-2"
                        onPress={() => router.replace("/auth/login")}
                    >
                        <Text className="text-gray-400">
                            이미 계정이 있으신가요?{" "}
                            <Text className="text-accent font-semibold">로그인</Text>
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
