import { useEffect, useState } from "react"
import { Alert } from "react-native"

const useAppwrite = (fn: any) => {
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fn()
      setData(response)
    } catch (error) {
      Alert.alert("Error", "Error Fetching Posts")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return { data, refetch }
}

export default useAppwrite
