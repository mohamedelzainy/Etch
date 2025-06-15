import { Fontisto } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function Email() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: any) =>
    router.push({ pathname: "/code", params: { email: data.email } });
  return (
    <View className="flex-1 mt-20 mx-5">
      <View className="flex-1 gap-4">
        <View className="bg-gray-200 rounded-full p-2 w-[50] h-[50] items-center justify-center mb-5">
          <Fontisto name="email" size={24} color="black" />
        </View>
        <View className="gap-2">
          <Text className="text-2xl text-black font-semibold">
            Continue with Email
          </Text>
          <Text className="text-gray-400 font-semibold">
            Sign up with your email.
          </Text>
        </View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-gray-200 mt-3 rounded-lg p-4 w-full max-w-sm h-[45] my-2"
            />
          )}
        />
        {errors.email && <Text>{errors.email.message}</Text>}
      </View>
      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="flex h-[50] justify-center bg-red-500 flex-col w-full my-6 rounded-lg p-3"
      >
        <Text className="text-white font-semibold text-center">Next</Text>
      </Pressable>
    </View>
  );
}
