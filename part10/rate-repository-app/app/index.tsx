import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";

import Main from "@/app/src/components/Main";

export default function Index() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}
