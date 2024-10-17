import { View, Text, ScrollView, Image, Alert } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import FormField from "@/components/FormField"
import CustomButton from "@/components/CustomButton"
import { Link, router } from "expo-router"
import { getCurrentUser, signIn } from "@/lib/appwrite"
import { useGlobalContext } from "@/context/GlobalProvider"

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    const { email, password } = form
    if (email === "" || password === "")
      Alert.alert("Error", "Please fill in all the fields")

    setIsSubmitting(true)

    try {
      await signIn(email, password)
      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)

      router.replace("/(tabs)/home")
    } catch (error: unknown) {
      console.log(error)
      Alert.alert("Error", "Error Signing In")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/(auth)/sign-up"
              className="text-lg font-semibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
