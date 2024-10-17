import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native"
import React, { useState } from "react"
import { icons } from "@/constants"
import { router, usePathname } from "expo-router"

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || "")
  return (
    <View className="flex-row h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center space-x-4 w-full">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            )
          if (pathname.startsWith("/search")) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
      >
        <Image className="w-5 h-5" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
