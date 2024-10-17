import { Text } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomButton from "@/components/CustomButton"
import { router } from "expo-router"

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary h-full justify-center items-center">
      <Text className="text-4xl text-white font-pmedium">Coming Soon!!!</Text>

      <CustomButton
        title="Explore Videos"
        containerStyles="mt-7 px-4"
        handlePress={() => router.push("/(tabs)/home")}
      />
    </SafeAreaView>
  )
}

export default Bookmark
