import { View, Text, ScrollView, Image, Alert } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import FormField from "@/components/FormField"
import CustomButton from "@/components/CustomButton"
import { Link, router } from "expo-router"
import { createUser } from "@/lib/appwrite"
import { useGlobalContext } from "@/context/GlobalProvider"

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const [form, setForm] = useState<{
    email: string
    password: string
    username: string
  }>({
    email: "",
    password: "",
    username: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    const { email, password, username } = form
    if (email === "" || password === "" || username === "")
      Alert.alert("Error", "Please fill in all the fields")

    setIsSubmitting(true)

    try {
      const result = await createUser(email, password, username)
      setUser(result)
      setIsLoggedIn(true)

      router.replace("/(tabs)/home")
    } catch (error: unknown) {
      console.log(error)
      Alert.alert("Error", "Error Signing Up")
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
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChange={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/(auth)/sign-in"
              className="text-lg font-semibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
