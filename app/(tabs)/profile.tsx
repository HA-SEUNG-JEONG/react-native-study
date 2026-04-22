import React from "react";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MOCK_POSTS, MOCK_ME } from "@/constants/mockData";

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View className="flex-1 bg-primary" style={{ paddingTop: insets.top }}>
            <View className="px-4 pt-3 pb-4 border-b border-gray-800">
                <View className="flex-row items-center gap-4">
                    <Image
                        source={{ uri: MOCK_ME.avatar }}
                        className="w-20 h-20 rounded-full"
                    />
                    <View className="flex-1 flex-row justify-around">
                        <View className="items-center">
                            <Text className="text-white font-bold text-lg">
                                {MOCK_ME.postsCount}
                            </Text>
                            <Text className="text-gray-400 text-xs">게시물</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-white font-bold text-lg">
                                {MOCK_ME.followersCount}
                            </Text>
                            <Text className="text-gray-400 text-xs">팔로워</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-white font-bold text-lg">
                                {MOCK_ME.followingCount}
                            </Text>
                            <Text className="text-gray-400 text-xs">팔로잉</Text>
                        </View>
                    </View>
                </View>

                <Text className="text-white font-semibold mt-3">
                    {MOCK_ME.username}
                </Text>

                <Pressable
                    onPress={() => router.push("/auth/login")}
                    className="mt-3 border border-gray-600 rounded-lg py-2 items-center"
                >
                    <Text className="text-white text-sm font-medium">
                        로그인 / 회원가입
                    </Text>
                </Pressable>
            </View>

            {/* numColumns=3 그리드: style prop 사용 (NativeWind aspect-ratio가 numColumns와 충돌할 수 있음) */}
            <FlatList
                data={MOCK_POSTS.slice(0, 9)}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/post/${item.id}`)}
                        style={{ flex: 1, aspectRatio: 1, margin: 1 }}
                    >
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={{ width: "100%", height: "100%" }}
                            resizeMode="cover"
                        />
                    </Pressable>
                )}
                contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
            />
        </View>
    );
}
