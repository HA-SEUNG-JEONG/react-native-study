import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MOCK_POSTS } from "@/constants/mockData";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const results = MOCK_POSTS.filter(
        (p) =>
            p.user.username.toLowerCase().includes(query.toLowerCase()) ||
            p.caption.includes(query)
    );

    return (
        <View className="flex-1 bg-primary" style={{ paddingTop: insets.top }}>
            <View className="px-4 pt-3 pb-2">
                <Text className="text-white text-xl font-bold mb-3">Search</Text>
                {/*
                 * TextInput 웹 input과 다른 점:
                 * - onChangeText: (text: string) => void  (onChange 이벤트 없음)
                 * - returnKeyType: 키보드 엔터 버튼 레이블 변경
                 * - clearButtonMode: iOS 전용 — 입력 중 x 버튼 표시
                 */}
                <TextInput
                    className="bg-gray-800 text-white rounded-xl px-4 py-3"
                    placeholder="유저명 또는 내용 검색"
                    placeholderTextColor="#6b7280"
                    value={query}
                    onChangeText={setQuery}
                    returnKeyType="search"
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                />
            </View>

            {query.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-500">검색어를 입력하세요</Text>
                </View>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push(`/post/${item.id}`)}
                            className="flex-row items-center px-4 py-3 border-b border-gray-800"
                        >
                            <Text className="text-white font-semibold">
                                @{item.user.username}
                            </Text>
                            <Text
                                className="text-gray-400 ml-2 flex-1"
                                numberOfLines={1}
                            >
                                {item.caption}
                            </Text>
                        </Pressable>
                    )}
                    ListEmptyComponent={
                        <View className="items-center py-10">
                            <Text className="text-gray-500">결과 없음</Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
                />
            )}
        </View>
    );
}
