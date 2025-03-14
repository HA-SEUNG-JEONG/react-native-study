import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    View
} from "react-native";
import React from "react";
import MovieCard from "@/components/MovieCard";
export default function Index() {
    const router = useRouter();

    const {
        data: movies,
        error: moviesError,
        loading: moviesLoading,
        refetch: refetchMovies
    } = useFetch(() => fetchMovies({ query: "" }));

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: "100%",
                    paddingBottom: 10
                }}
            >
                <Image
                    source={icons.logo}
                    className="w-12 h-10 mt-20 mb-5 mx-auto"
                />
                {moviesLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#fff"
                        className="mt-10 self-center"
                    />
                ) : moviesError ? (
                    <Text className="text-white text-center text-lg">
                        {moviesError.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie"
                        />
                        <>
                            <Text className="text-white text-center text-lg">
                                Latest movies
                            </Text>
                            <FlatList
                                data={movies?.results}
                                renderItem={({ item }) => (
                                    <MovieCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    marginBottom: 10,
                                    gap: 20,
                                    paddingRight: 5
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
