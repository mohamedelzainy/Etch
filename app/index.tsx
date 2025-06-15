import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 mt-20 mx-5">
      <View className="flex-1 gap-4">
        <Text className="text-2xl font-bold mb-10 text-center">Etch Logo</Text>
        <Pressable className="flex flex-row justify-center items-center gap-4 bg-gray-300/50 w-full max-w-sm rounded-lg p-3">
          <MaterialIcons name="tiktok" size={24} color="black" />
          <Text className="text-black font-semibold text-center">
            Continue with tiktok
          </Text>
        </Pressable>
        <Pressable className="flex flex-row justify-center items-center gap-4 bg-gray-300/50 w-full max-w-sm rounded-lg p-3">
          <MaterialIcons name="facebook" size={24} color="black" />
          <Text className="text-black font-semibold text-center">
            Continue with facebook
          </Text>
        </Pressable>
        <Pressable className="flex flex-row justify-center items-center gap-4 bg-gray-300/50 w-full max-w-sm rounded-lg p-3">
          <AntDesign name="google" size={24} color="black" />
          <Text className="text-black font-semibold text-center">
            Continue with Google
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/email")}
          className="flex flex-row justify-center items-center gap-4 bg-gray-300/50 w-full max-w-sm rounded-lg p-3"
        >
          <Fontisto name="email" size={24} color="black" />
          <Text className="text-black font-semibold text-center">
            Continue with email
          </Text>
        </Pressable>
      </View>
      <View className="flex items-center w-full my-5">
        <Text className="text-1 text-gray-600 text-sm">
          Already have an account?
        </Text>
        <Pressable
          onPress={() => {}}
          className="flex border flex-col w-full max-w-sm my-2 rounded-lg p-3"
        >
          <Text className="text-black font-semibold text-center text-lg">
            Sgin in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
