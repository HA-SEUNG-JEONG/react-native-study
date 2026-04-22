import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Post } from "@/types";

interface PostCardProps {
    post: Post;
    onLike: (postId: string) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
    const router = useRouter();

    return (
        <View className="mb-1">
            {/* 유저 헤더 */}
            <View className="flex-row items-center px-4 py-2">
                <Image
                    source={{ uri: post.user.avatar }}
                    className="w-8 h-8 rounded-full"
                />
                <Text className="text-white font-semibold ml-3 flex-1">
                    {post.user.username}
                </Text>
                <Ionicons name="ellipsis-horizontal" size={20} color="#9ca3af" />
            </View>

            {/* 이미지 — Pressable로 상세 이동 */}
            <Pressable onPress={() => router.push(`/post/${post.id}`)}>
                {/* aspect-square: 웹 CSS와 동일하게 동작 (NativeWind v4) */}
                <Image
                    source={{ uri: post.imageUrl }}
                    className="w-full aspect-square"
                    resizeMode="cover"
                />
            </Pressable>

            {/* 액션 버튼 */}
            <View className="flex-row items-center px-4 py-2 gap-4">
                {/* Pressable vs TouchableOpacity: RN 권장 최신 API */}
                <Pressable
                    onPress={() => onLike(post.id)}
                    className="flex-row items-center gap-1"
                >
                    <Ionicons
                        name={post.likedByMe ? "heart" : "heart-outline"}
                        size={26}
                        color={post.likedByMe ? "#ef4444" : "#fff"}
                    />
                    <Text className="text-white text-sm">{post.likes}</Text>
                </Pressable>

                <Pressable
                    onPress={() => router.push(`/post/${post.id}`)}
                    className="flex-row items-center gap-1"
                >
                    <Ionicons name="chatbubble-outline" size={24} color="#fff" />
                    <Text className="text-white text-sm">{post.commentsCount}</Text>
                </Pressable>
            </View>

            {/* 캡션 */}
            <View className="px-4 pb-3">
                <Text className="text-white leading-5">
                    <Text className="font-semibold">{post.user.username} </Text>
                    {post.caption}
                </Text>
            </View>
        </View>
    );
}
