import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#AB8BFF",
                tabBarInactiveTintColor: "#6b7280",
                tabBarStyle: {
                    backgroundColor: "#030014",
                    borderTopColor: "#1f1f2e",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Feed",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            {/* saved는 탭 바에서 숨김 — href: null이 Expo Router v4 방식 */}
            <Tabs.Screen name="saved" options={{ href: null }} />
        </Tabs>
    );
}
