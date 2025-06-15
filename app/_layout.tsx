import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import { AppStateStatus, Platform } from "react-native";
import "../global.css";
// import { useOnlineManager } from "../hooks/UseOnlineManager";
// import { useAppState } from "../hooks/useAppState";

export default function RootLayout() {
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  // useOnlineManager();
  // useAppState(onAppStateChange);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
