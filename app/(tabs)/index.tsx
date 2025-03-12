import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-5xl font-bold text-dark-300">Welcome</Text>
            <Link href="/movie/123">
                <Text>Go to movie details</Text>
            </Link>
        </View>
    );
}
