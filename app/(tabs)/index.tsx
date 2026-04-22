import React, { useState } from "react";
import { FlatList, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import { MOCK_POSTS } from "@/constants/mockData";
import { Post } from "@/types";

export default function FeedScreen() {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    // useSafeAreaInsets: 노치/홈바 영역을 padding으로 직접 제어
    // SafeAreaView 대신 이 방식을 쓰면 배경색을 전체 화면에 채울 수 있음
    const insets = useSafeAreaInsets();

    const handleLike = (postId: string) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? {
                          ...p,
                          likedByMe: !p.likedByMe,
                          likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
                      }
                    : p
            )
        );
    };

    return (
        <View className="flex-1 bg-primary" style={{ paddingTop: insets.top }}>
            <View className="px-4 py-3 border-b border-gray-800">
                <Text className="text-white text-xl font-bold">Feed</Text>
            </View>

            {/*
             * FlatList vs ScrollView:
             * - FlatList: 화면 밖 항목은 렌더링 안 함 (가상화) → 긴 리스트에 필수
             * - ScrollView: 전체 한 번에 렌더 → 고정된 소수 컨텐츠에만 사용
             * keyExtractor: string 반환 필수 (RN 내부 재조정에 사용)
             */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostCard post={item} onLike={handleLike} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
            />
        </View>
    );
}
