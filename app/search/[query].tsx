import { View, Text, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import SearchInput from "@/components/SearchInput"
import EmptyState from "@/components/EmptyState"
import { searchPosts } from "@/lib/appwrite"
import useAppwrite from "@/lib/useAppwrite"
import VideoCard from "@/components/VideoCard"
import { useLocalSearchParams } from "expo-router"

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(String(query)))

  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={String(query)} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
        renderItem={({ item }) => <VideoCard video={item} />}
      />
    </SafeAreaView>
  )
}

export default Search
