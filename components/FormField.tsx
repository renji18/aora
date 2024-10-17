import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import React, { useState } from "react"
import { icons } from "@/constants"

const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  keyboardType,
  placeholder,
}: {
  title: string
  value: string
  handleChange: (arg: string) => void
  otherStyles: string
  keyboardType?: string
  placeholder?: string
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={!showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
