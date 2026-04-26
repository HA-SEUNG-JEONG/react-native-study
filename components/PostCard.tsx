import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Post } from "@/types";

interface PostCardProps {
    post: Post;
    /** 좋아요 토글 — 부모가 currentlyLiked 전달, 여기서는 단순 onPress */
    onLike: () => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
    const router = useRouter();

    return (
        <View className="mb-1">
            <View className="flex-row items-center px-4 py-2">
                <Image
                    source={{ uri: post.user.avatar }}
                    className="w-8 h-8 rounded-full"
                />
                <Text className="text-white font-semibold ml-3 flex-1">
                    {post.user.username}
                </Text>
                <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#9ca3af"
                />
            </View>

            <Pressable onPress={() => router.push(`/post/${post.id}`)}>
                <Image
                    source={{ uri: post.imageUrl }}
                    className="w-full aspect-square"
                    resizeMode="cover"
                />
            </Pressable>

            <View className="flex-row items-center px-4 py-2 gap-4">
                <Pressable
                    onPress={onLike}
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
                    <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color="#fff"
                    />
                    <Text className="text-white text-sm">
                        {post.commentsCount}
                    </Text>
                </Pressable>
            </View>

            <View className="px-4 pb-3">
                <Text className="text-white leading-5">
                    <Text className="font-semibold">{post.user.username} </Text>
                    {post.caption}
                </Text>
            </View>
        </View>
    );
}
