import { Text, TouchableOpacity } from "react-native"
import React from "react"

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: {
  title: string
  handlePress: () => void
  containerStyles: string
  textStyles?: string
  isLoading?: boolean
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${containerStyles} bg-secondary rounded-xl min-h-[62px] justify-center items-center ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`${textStyles} text-primary font-psemibold text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
