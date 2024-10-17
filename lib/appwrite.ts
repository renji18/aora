import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite"

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mittls.aora",
  projectId: "67109a04001c0166c6b9",
  databaseId: "67109b4b000170ceaa6e",
  userCollectionId: "67109b7f00219d87cc1a",
  videoCollectionID: "67109b9d0037607ffbc1",
  storageId: "6710a993002eb79736df",
}

// Init your React Native SDK
const client = new Client()

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

// Register User
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw new Error("Account was not created")

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )

    return newUser
  } catch (error) {
    console.log(error)
    throw new Error("Error creating User")
  }
}

// Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.log(error)
    throw new Error("Error signin User")
  }
}

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currAccount = await account.get()

    if (!currAccount) throw Error

    const currUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currAccount.$id)]
    )

    if (!currUser) throw Error

    return currUser.documents[0]
  } catch (error) {
    console.log(error)
    throw new Error("Error Fetching Current User")
  }
}

// Get All Posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionID,
      [Query.orderDesc("$createdAt")]
    )

    return posts.documents
  } catch (error) {
    console.log(error)
    throw new Error("Error Fetching Posts")
  }
}

// Get Latest Posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionID,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    )

    return posts.documents
  } catch (error) {
    console.log(error)
    throw new Error("Error Fetching Posts")
  }
}

// Search Posts
export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionID,
      [Query.search("title", query)]
    )

    return posts.documents
  } catch (error) {
    console.log(error)
    throw new Error("Error Fetching Posts")
  }
}

// Get User Posts
export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionID,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    )

    return posts.documents
  } catch (error) {
    console.log(error)
    throw new Error("Error Fetching Posts")
  }
}

// Log Out
export const logOut = async () => {
  try {
    const session = await account.deleteSession("current")
    return session
  } catch (error) {
    console.log(error)
    throw new Error("Error Logging Out")
  }
}

// Get File Preview
export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl

  try {
    if (type === "video")
      fileUrl = storage.getFileView(config.storageId, fileId)
    else if (type === "image")
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      )
    else throw new Error("Invalid file type")

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    console.log(error)
    throw new Error("Error getting file preview")
  }
}

// Upload Files
export const uploadFile = async (file: any, type: string) => {
  if (!file) return

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    return fileUrl
  } catch (error) {
    console.log(error)
    throw new Error("Error Uploading File")
  }
}

// Create Video
export const createVideo = async (form: {
  video: any
  thumbnail: any
  title: string
  prompt: string
  userId: string
}) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ])

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionID,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    )

    return newPost
  } catch (error) {
    console.log(error)
    throw new Error("Error Uploading Video")
  }
}
