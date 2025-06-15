import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

export default function Password() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (data: any) => router.push({ pathname: "/" });
  return (
    <View className="flex-1 mt-20 mx-5">
      <View className="flex-1 gap-4">
        <View className="gap-2">
          <Text className="text-2xl text-black font-semibold">
            Create Password
          </Text>
        </View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-gray-200 mt-3 rounded-lg p-4 w-full max-w-sm h-[45] my-2"
            />
          )}
        />
        {errors.password && <Text>{errors.password.message}</Text>}
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
