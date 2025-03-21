import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
const MovieCard = ({
    id,
    poster_path,
    title,
    release_date,
    vote_average
}: Movie) => {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                            : "https://via.placeholder.co/600x400/1a1a1a/ffffff.png"
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text
                    className="text-white text-sm font-bold mt-2"
                    numberOfLines={1}
                >
                    {title}
                </Text>
                <View className="flex-row items-center gap-2">
                    <Image
                        source={icons.star}
                        className="size-4"
                        resizeMode="contain"
                    />
                    <Text className="text-white text-sm">
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date.split("-")[0]}
                    </Text>
                    <Text className="text-xs font-medium text-light-300 uppercase">
                        Movie
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
