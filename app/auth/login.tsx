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

export default function LoginScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        /*
         * KeyboardAvoidingView: 소프트 키보드가 올라올 때 콘텐츠를 밀어줌
         * behavior 값:
         *   iOS   → "padding": 키보드 높이만큼 하단 padding 추가
         *   Android → "height": 전체 높이를 줄임 (또는 생략 가능, OS가 자체 처리)
         * Platform.OS로 플랫폼 분기 — RN에서 자주 쓰는 필수 패턴
         */
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
                // 키보드 외부 탭해도 input 포커스 유지 (스크롤 중 탭 이슈 방지)
                keyboardShouldPersistTaps="handled"
            >
                <Text className="text-white text-3xl font-bold mb-2">로그인</Text>
                <Text className="text-gray-400 mb-8">
                    Phase 2에서 JWT 실제 연동 예정
                </Text>

                <View className="gap-4">
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
                            autoComplete="email"
                            returnKeyType="next"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-300 text-sm mb-1">비밀번호</Text>
                        <TextInput
                            className="bg-gray-800 text-white rounded-xl px-4 py-4"
                            placeholder="••••••••"
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
                        <Text className="text-white font-bold text-base">로그인</Text>
                    </Pressable>

                    <Pressable
                        className="items-center py-2"
                        onPress={() => router.replace("/auth/signup")}
                    >
                        <Text className="text-gray-400">
                            계정이 없으신가요?{" "}
                            <Text className="text-accent font-semibold">회원가입</Text>
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
