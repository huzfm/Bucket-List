import { Link } from "expo-router";
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
} from "react-native";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (password === confirmPassword) {
      console.log("Signing up:", email, password);
    } else {
      console.log("Passwords do not match.");
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
                className="text-4xl font-semibold text-white mb-6 text-center py-6 font-headings"
                style={{ fontFamily: "heading" }}
              >
                Create an Account
              </Text>

              {/* Email Input */}
              <View className="mb-4 pb-1">
                <View className="flex-row items-center border border-neutral-700 bg-neutral-900 rounded-3xl px-4 py-3">
                  <TextInput
                    placeholder="Enter your email"
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
              <View className="mb-4 pb-1">
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

              {/* Confirm Password Input */}
              <View className="mb-4 pb-5">
                <View className="flex-row items-center border border-neutral-700 bg-neutral-900 rounded-3xl px-4 py-3">
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#A9A9AC"
                    className="flex-1 text-white text-base py-2"
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={{ fontFamily: "placeholder", fontSize: 18 }}
                  />
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

              {/* Sign Up Button */}
              <TouchableOpacity
                className="bg-white py-3 rounded-xl"
                onPress={handleSignup}
              >
                <Text
                  className="text-black text-center font-semibold text-base"
                  style={{ fontFamily: "headingBold", fontSize: 16 }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>

              {/* Login Option */}
              <Text
                className="text-center text-neutral-400 mt-6"
                style={{ fontFamily: "placeholder", fontSize: 16 }}
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-500"
                  style={{ fontFamily: "placeholder", fontSize: 16 }}
                >
                  Log In
                </Link>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignupScreen;
