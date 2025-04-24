import { Link } from "expo-router";
import { AxiosError } from "axios";
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
import api from "@/utils/api";

// Utility function for email validation
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSignup = async () => {
    setErrors({});

    // Client-side validation
    if (!email || !password || !confirmPassword) {
      Alert.alert("Please fill in all the details");
      return;
    }
    if (!isValidEmail(email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }
    if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters." });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/signup", {
        email,
        password,
        confirmPassword,
      });

      if (response.status === 200) {
        Alert.alert(
          "Registration successful",
          "You can now log in to your account"
        );
        // Optionally clear form or navigate to login
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      const err = error as AxiosError<any>;
      console.log("Signup error:", err.response?.data);

      if (err.response?.data?.message) {
        // Handle duplicate email error
        if (
          err.response.data.message.includes("E11000") ||
          err.response.data.message.includes("duplicate key") ||
          err.response.data.message.toLowerCase().includes("already exists")
        ) {
          setErrors({
            email: "This email is already registered",
          });
        }
        // Handle other backend validation errors
        else if (Array.isArray(err.response?.data?.errors)) {
          const fieldErrors: Record<string, string> = {};
          err.response.data.errors.forEach((e: any) => {
            fieldErrors[e.path[0]] = e.message;
          });
          setErrors(fieldErrors);
        }
        // Handle other custom error messages from backend
        else {
          setErrors({ general: err.response.data.message });
        }
      } else {
        setErrors({
          general: "Signup failed. Please check your connection and try again.",
        });
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
        className="flex-1"
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
                className="text-4xl font-semibold text-white mb-6 text-center py-6"
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
                    style={{ fontFamily: "placeholder", fontSize: 18 }}
                  />
                </View>
                {errors.email && (
                  <Text
                    className="text-red-400 mt-1 ml-2"
                    style={{ fontFamily: "placeholder" }}
                  >
                    {errors.email}
                  </Text>
                )}
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
                {errors.password && (
                  <Text
                    className="text-red-400 mt-1 ml-2  "
                    style={{ fontFamily: "placeholder" }}
                  >
                    {errors.password}
                  </Text>
                )}
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
                {errors.confirmPassword && (
                  <Text
                    className="text-red-400 mt-1 ml-2"
                    style={{ fontFamily: "placeholder" }}
                  >
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                className={`py-3 rounded-xl ${
                  loading ? "bg-gray-500" : "bg-white"
                }`}
                onPress={handleSignup}
                disabled={loading}
              >
                <Text
                  className="text-black text-center font-semibold text-base"
                  style={{ fontFamily: "headingBold", fontSize: 16 }}
                >
                  {loading ? "Signing up..." : "Signup"}
                </Text>
              </TouchableOpacity>

              {/* General Error */}
              {errors.general && (
                <Text className="text-red-400 text-center mt-2">
                  {errors.general}
                </Text>
              )}

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
