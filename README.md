# Silver Lining

**Silver Lining** is a React Native mobile application that encourages gratitude and reflection through meaningful posts, that you can share with those you know

## 🎥 Demonstrations
- [Code Overview of the Application](https://youtu.be/ruILo_twCZs): Watch a detailed walkthrough of the application's code structure and functionality.
- [Overview of the Cloud Database](https://youtu.be/vz84lge0BE8): Learn about the cloud database setup, features, and how it integrates with the application.

## 📲 Screens

### **Feed Screen**
- View a scrollable list of others miracles (currently just mock posts).
- Includes the app logo and a profile picture button for quick navigation to the Profile Screen.
- Miracle button, a floating button to create a new post.

### **Create Post Screen**
- Capture and save your miracles.
- Take photos using the device's camera.
- Add descriptions to remember each moment.
- Posts are saved locally.

### **Profile Screen**
- Showcase your personal miracles.
- Personalized Greeting!
- Display your saved posts in a grid.
- Option to clear all saved posts.

## 🛠 Technologies Used
- **React Native**: For building the mobile application.
- **Expo**: For accessing device features like the camera and file system.
- **React Navigation**: For handling navigation between screens.
- **expo-file-system**: For storing user data and images.
- **expo-camera**: For using the device's camera.
- **React Native Vector Icons**: For icons.

## 🌟 Components

### **Main Application**
- **App.js**: Sets up navigation and ensures directories/files are ready for use.

### **Components**
- **TakePhoto.js**: Manages the camera functionality, included a flip camera button.
- **PhotoPreview.js**: Displays a preview of the captured photo, retake button added.
- **ProfileScreenPosts.js**: Component to render each of the users post, used in the profile screen flatlist.
- **Post.js**: The component to handle when a post goes to the feed.


## 💾 Data Persistence/Cloud Data
- Firebase Authentication: User authentication is handled with email and password.
- Firestore Database: User data, including profile information and posts, is stored securely.
- Cloud Storage: All images are stored in Firebase Cloud Storage.
- Persistent Authentication: Users remain logged in across sessions for seamless access.
- Efficient Queries: Firestore allows optimized retrieval and filtering of user posts and profile data.

### **Firebase Collections:**
-`users` Stores all the users of the application; here is a template

```json
6nojLWSjomPhda7fhelDFU2:{
  "firstName": "John",
  "lastName": "Doe",
  "profilePhotoUrl": "https://example.com/path/to/profile/photo.jpg",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "userId": "exampleUserId123",
  "username": "johndoe123"
}
```
`posts` Stores all the posts; here is a template

```json
{
  "description": "This is great",
  "photoURL": "exampleimage.com",
  "timestamp": "2025-02-08T20:46:01.721Z",
  "userId": "bqrbFFFB6DRkGnSBSooGf1"
}
```
### **Firebase Images:**
I configured Firebase Storage to manage and store images for both user posts and profile pictures.

### **User Authentication:**
I implemented user authentication with email and password, which also generates a unique user UID upon account creation.



## 🚀 How to Run

1. Ensure you have Node.js and npm installed.
2. Install Expo CLI: `npm install expo-cli`
3. Clone the repository: `git clone https://github.com/BBopsCode/Silver-Lining.git`
4. Navigate to the project directory: `cd silver-lining`
5. Install dependencies: `npm install`
6. Start the development server: `npx expo start`
7. Use the Expo Go app on your mobile device or an emulator to run the application.

## 🆘 Links that helped me:
- [Firebase Documentation](https://firebase.google.com/docs/): Explore the official Firebase documentation to learn how to integrate and use Firebase services in your projects.
- [React Native Getting Started Guide](https://reactnative.dev/docs/getting-started): Get started with React Native by following the official guide, which covers everything from setup to building your first app.
- [Helpful YouTube Tutorial](https://www.youtube.com/watch?v=a0KJ7l5sNGw&list=WL&index=1): Watch this highly recommended YouTube tutorial for practical tips and step-by-step guidance on mastering Firebase and React Native.


---