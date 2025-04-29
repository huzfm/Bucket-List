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
  ActivityIndicator,
  Alert,
} from "react-native";
import api from "../utils/api";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    // Basic frontend validations
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/signup", {
        email,
        password,
        confirmPassword,
      });

      // If successful
      console.log("Signup success:", response.data);
      Alert.alert("Success", "Registration successful!");
      router.push("/login");
    } catch (error) {
      console.log("Signup error:", error);

      if ((error as any).response && (error as any).response.data) {
        // Assuming your backend sends { message: "Email already exists" } or similar
        const serverMessage = (error as any).response.data.message;
        Alert.alert("Signup Failed", serverMessage || "Unknown error occurred");
      } else {
        Alert.alert("Signup Failed", "Network error. Please try again.");
      }
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
                className={`py-3 rounded-xl ${
                  loading ? "bg-gray-300" : "bg-white"
                }`}
                onPress={handleSignup}
                disabled={loading} // disables the button
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text
                    className="text-black text-center font-semibold text-base"
                    style={{ fontFamily: "headingBold", fontSize: 16 }}
                  >
                    Register
                  </Text>
                )}
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
