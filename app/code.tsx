import { MaterialCommunityIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const schema = Yup.object().shape({
  otp1: Yup.string().length(1).required(),
  otp2: Yup.string().length(1).required(),
  otp3: Yup.string().length(1).required(),
  otp4: Yup.string().length(1).required(),
});

export default function Code() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
  });
  const onSubmit = (data: any) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
    if (otp !== "0000") return alert("Invalid OTP");
    else
      router.push({
        pathname: "/password",
      });
  };
  const inputs: ["otp1", "otp2", "otp3", "otp4"] = [
    "otp1",
    "otp2",
    "otp3",
    "otp4",
  ];

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    reset();
    inputsRef.current[0]?.focus();
    return alert("timer reset");
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="flex-1 mt-20 mx-5">
      <View className="flex-1 gap-4">
        <View className="bg-gray-200 rounded-full p-2 w-[50] h-[50] items-center justify-center mb-5">
          <MaterialCommunityIcons name="keyboard" size={24} color="black" />
        </View>
        <View className="gap-2">
          <Text className="text-2xl text-black font-semibold">Enter Code</Text>
          <Text className="text-gray-400 font-semibold">
            We send a verification code to your email
          </Text>
          <Text className="text-gray-400 font-semibold">{params.email}</Text>
        </View>
        <View className="flex-row justify-between mx-2">
          {inputs.map((name, index) => (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  ref={(ref) => {
                    inputsRef.current[index] = ref;
                  }}
                  className="w-14 h-14 border border-gray-400 rounded-xl text-center text-xl"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    if (text && index < 3) {
                      inputsRef.current[index + 1]?.focus();
                    }
                    if (!text && index > 0) {
                      inputsRef.current[index - 1]?.focus();
                    }
                  }}
                />
              )}
            />
          ))}
        </View>

        {(errors.otp1 || errors.otp2 || errors.otp3 || errors.otp4) && (
          <Text className="text-red-500 mt-2 text-center">
            Please enter a valid 4-digit code.
          </Text>
        )}

        <View className="flex">
          <Pressable onPress={canResend ? handleResend : undefined}>
            <Text className="text-gray-400 font-semibold">
              {canResend
                ? "Resend code"
                : `Resend code in ${formatTime(timer)}`}
            </Text>
          </Pressable>
        </View>
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
