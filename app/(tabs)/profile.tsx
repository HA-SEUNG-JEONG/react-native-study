import React from "react";
import { View, Text, Image, FlatList, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth";
import { useFeed } from "@/hooks/useFeed";

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { user, status, logout } = useAuthStore();
    const { data } = useFeed();

    // 그리드용 — 첫 9장만 미리 표시 (실제 자기 게시물 API 부재)
    const gridPosts = data?.pages.flatMap((p) => p.posts).slice(0, 9) ?? [];

    const handleLogout = () => {
        Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "확인",
                style: "destructive",
                onPress: () => logout(),
            },
        ]);
    };

    return (
        <View className="flex-1 bg-primary" style={{ paddingTop: insets.top }}>
            <View className="px-4 pt-3 pb-4 border-b border-gray-800">
                <View className="flex-row items-center gap-4">
                    <Image
                        source={{
                            uri:
                                user?.avatar ??
                                "https://picsum.photos/seed/guest/200/200",
                        }}
                        className="w-20 h-20 rounded-full"
                    />
                    <View className="flex-1 flex-row justify-around">
                        <View className="items-center">
                            <Text className="text-white font-bold text-lg">
                                {user?.postsCount ?? 0}
                            </Text>
                            <Text className="text-gray-400 text-xs">
                                게시물
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-white font-bold text-lg">
                                {user?.followersCount ?? 0}
                            </Text>
                            <Text className="text-gray-400 text-xs">
                                팔로워
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-white font-bold text-lg">
                                {user?.followingCount ?? 0}
                            </Text>
                            <Text className="text-gray-400 text-xs">
                                팔로잉
                            </Text>
                        </View>
                    </View>
                </View>

                <Text className="text-white font-semibold mt-3">
                    {user?.username ?? "게스트"}
                </Text>

                {status === "authenticated" ? (
                    <Pressable
                        onPress={handleLogout}
                        className="mt-3 border border-gray-600 rounded-lg py-2 items-center"
                    >
                        <Text className="text-white text-sm font-medium">
                            로그아웃
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={() => router.push("/auth/login")}
                        className="mt-3 border border-gray-600 rounded-lg py-2 items-center"
                    >
                        <Text className="text-white text-sm font-medium">
                            로그인 / 회원가입
                        </Text>
                    </Pressable>
                )}
            </View>

            <FlatList
                data={gridPosts}
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
