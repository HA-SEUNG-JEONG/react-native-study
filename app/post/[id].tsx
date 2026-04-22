import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MOCK_POSTS, MOCK_COMMENTS } from "@/constants/mockData";

export default function PostDetailScreen() {
    // useLocalSearchParams: 파일명 [id].tsx → { id } 자동 추출
    // 웹의 useParams()와 동일한 역할
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const post = MOCK_POSTS.find((p) => p.id === id);

    if (!post) {
        return (
            <View
                className="flex-1 bg-primary items-center justify-center"
                style={{ paddingTop: insets.top }}
            >
                <Text className="text-white">게시물을 찾을 수 없습니다</Text>
                <Pressable onPress={() => router.back()} className="mt-4">
                    <Text className="text-accent">돌아가기</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-primary" style={{ paddingTop: insets.top }}>
            {/* 뒤로가기 헤더 — router.back()이 웹의 history.back()과 동일 */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-800">
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </Pressable>
                <Text className="text-white font-bold text-base ml-4">게시물</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
                <View className="flex-row items-center px-4 py-3">
                    <Image
                        source={{ uri: post.user.avatar }}
                        className="w-8 h-8 rounded-full"
                    />
                    <Text className="text-white font-semibold ml-3">
                        {post.user.username}
                    </Text>
                </View>

                <Image
                    source={{ uri: post.imageUrl }}
                    className="w-full aspect-square"
                    resizeMode="cover"
                />

                <View className="px-4 py-3">
                    <Text className="text-white leading-5">
                        <Text className="font-semibold">{post.user.username} </Text>
                        {post.caption}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-2">
                        좋아요 {post.likes}개 · 댓글 {post.commentsCount}개
                    </Text>
                </View>

                <View className="px-4 border-t border-gray-800 pt-3">
                    <Text className="text-gray-400 text-sm mb-3">댓글</Text>
                    {MOCK_COMMENTS.map((c) => (
                        <View key={c.id} className="flex-row mb-3">
                            <Text className="text-white font-semibold">
                                {c.username}
                            </Text>
                            <Text className="text-white ml-2">{c.text}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
