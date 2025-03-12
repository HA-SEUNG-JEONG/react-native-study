import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabIcon = ({
    icon,
    title,
    focused
}: {
    icon: any;
    title: string;
    focused: boolean;
}) => {
    // if (focused) {
    //     return (
    //         <ImageBackground
    //             source={images.highlight}
    //             className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
    //         >
    //             <Image source={icon} tintColor="#151312" className="size-5" />
    //             <Text className="text-secondary text-base font-semibold ml-2">
    //                 {title}
    //             </Text>
    //         </ImageBackground>
    //     );
    // }
    return focused ? (
        <ImageBackground
            source={images.highlight}
            className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <Image source={icon} tintColor="#151312" className="size-5" />
            <Text className="text-secondary text-base font-semibold ml-2">
                {title}
            </Text>
        </ImageBackground>
    ) : (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#A8B5DB" className="size-5" />
        </View>
    );
};

const _Layout = () => {
    return (
        // how to hide header? -> headerShown: false
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23"
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.home}
                            title="Home"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.search}
                            title="Search"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.save}
                            title="Saved"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.person}
                            title="Profile"
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    );
};

export default _Layout;
