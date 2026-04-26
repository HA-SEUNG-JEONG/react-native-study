import React from "react";
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    Alert,
    RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import { useFeed, useToggleLike } from "@/hooks/useFeed";
import type { Post } from "@/types";

export default function FeedScreen() {
    const insets = useSafeAreaInsets();

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching,
    } = useFeed();

    const likeMutation = useToggleLike();

    // useInfiniteQuery는 { pages: [...], pageParams: [...] } 구조 → 평탄화
    const posts: Post[] = data?.pages.flatMap((p) => p.posts) ?? [];

    const handleLike = (postId: string, currentlyLiked: boolean) => {
        likeMutation.mutate(
            { postId, currentlyLiked },
            {
                onError: (err) => {
                    Alert.alert(
                        "좋아요 실패",
                        err instanceof Error ? err.message : "알 수 없는 오류"
                    );
                },
            }
        );
    };

    if (isLoading) {
        return (
            <View
                className="flex-1 bg-primary items-center justify-center"
                style={{ paddingTop: insets.top }}
            >
                <ActivityIndicator color="#AB8BFF" />
            </View>
        );
    }

    if (isError) {
        return (
            <View
                className="flex-1 bg-primary items-center justify-center px-6"
                style={{ paddingTop: insets.top }}
            >
                <Text className="text-white text-base mb-2">
                    피드 로드 실패
                </Text>
                <Text className="text-gray-400 text-sm">
                    {error instanceof Error ? error.message : "오류"}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-primary" style={{ paddingTop: insets.top }}>
            <View className="px-4 py-3 border-b border-gray-800">
                <Text className="text-white text-xl font-bold">Feed</Text>
            </View>

            {/*
             * FlatList:
             * - keyExtractor → string 필수
             * - onEndReached → 무한 스크롤 트리거 (RQ fetchNextPage)
             * - RefreshControl → 당겨서 새로고침 (refetch)
             */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostCard
                        post={item}
                        onLike={() => handleLike(item.id, item.likedByMe)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <View className="py-6">
                            <ActivityIndicator color="#AB8BFF" />
                        </View>
                    ) : null
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        tintColor="#AB8BFF"
                    />
                }
            />
        </View>
    );
}
