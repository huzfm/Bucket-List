import { Link, useRouter } from "expo-router";
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Alert,
} from "react-native";

import api from "../utils/api";
// Import the icons from 'react-native-vector-icons'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async () => {
    if (!email && !password) {
      Alert.alert("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      console.log(response.data);
      Alert.alert("Login successfull");
      router.push("/signup");
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          "Login error:",
          (err as any).response?.data || err.message
        );
      } else {
        console.error("Login error:", err);
      }
      Alert.alert("Login Failed", (err as any).response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      className="flex-1"
      source={require("../assets/images/login_bg.jpeg")}
    >
      <KeyboardAvoidingView
        className="flex-1 bg"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-6">
            <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

            <View
              className="border p-6 rounded-3xl bg-neutral-900"
              style={{
                shadowColor: "white",
                shadowOffset: { width: 10, height: 60 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 50,
              }}
            >
              <Text
                className="text-4xl font-semibold text-white  mb-6 text-center py-6 font-headings"
                style={{ fontFamily: "heading" }}
              >
                Welcome Back!
              </Text>

              {/* Email Input */}
              <View className="mb-4 pb-1">
                <View className="flex-row items-center border border-neutral-700 bg-neutral-900 rounded-3xl px-4 py-3">
                  <TextInput
                    placeholder="Enter the email"
                    placeholderTextColor="#A9A9AC"
                    className="flex-1 py-2 text-white"
                    value={email}
                    onChangeText={setEmail}
                    style={{
                      fontFamily: "placeholder",
                      fontSize: 18,
                    }}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-4 pb-5">
                <View className="flex-row items-center border border-neutral-700 bg-neutral-900 rounded-3xl px-4 py-3">
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A9A9AC"
                    className="flex-1 text-white text-base py-2"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={{ fontFamily: "placeholder", fontSize: 18 }}
                  />
                  {/* Show/Hide Password Icon */}
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="ml-2"
                  >
                    <Text className="text-blue-500">
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className="bg-white py-3 rounded-xl"
                onPress={handleLogin}
              >
                <Text
                  className="text-black text-center font-semibold text-base"
                  style={{ fontFamily: "headingBold", fontSize: 16 }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>

              {/* Sign Up Option */}
              <Text
                className="text-center text-neutral-400 mt-6"
                style={{ fontFamily: "placeholder", fontSize: 16 }}
              >
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-500"
                  style={{ fontFamily: "placeholder", fontSize: 16 }}
                >
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
