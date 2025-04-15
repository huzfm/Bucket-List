import { View, Text } from "react-native";
import "../global.css";
import Login from "@/components/Login";
import { Link } from "expo-router";
import SignUpScreen from "@/components/Signup";

export default function Index() {
  return (
    <>
      <Login />
      {/* <SignUpScreen /> */}
    </>
  );
}
