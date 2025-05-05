# 📱 ChatNotes App

ChatNotes is a lightweight mobile app that combines **real-time chat** and **personal note-taking**. Built with **React Native + TypeScript** using **Clean Architecture (MVVM)**, this app is designed to be modular, maintainable, and scalable.

---

## ✨ Features

- 🔐 Login with Firebase Authentication  
- 💬 Lightweight real-time chat via WebSocket  
- 📝 Personal notes stored locally  
- 📥 Chat history saved offline using SQLite  
- 🔔 Push notifications with Firebase Cloud Messaging (FCM)  
- 🧠 Clean Architecture with MVVM separation  
- ✅ Unit test support for ViewModels and services  

---

## 🧱 Technology Stack

| Layer         | Technology                                     |
|---------------|------------------------------------------------|
| UI            | React Native (TypeScript)                      |
| Architecture  | Clean Architecture (MVVM)                      |
| Authentication| Firebase Auth                                  |
| Chat          | WebSocket (custom client)                      |
| Local Storage | SQLite (`react-native-sqlite-storage`)         |
| Notifications | Firebase Cloud Messaging                       |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ayash12/chatnotes-app.git
cd chatnotes-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Link Native Modules

```bash
npx pod-install
```

### 4. Run on Android

```bash
npx react-native run-android
```

### 5. Run on iOS

```bash
npx react-native run-ios
```

---

## 🔧 Firebase Setup

- Add `google-services.json` to `android/app/`
- Add `GoogleService-Info.plist` to `ios/`
- Enable Firebase Authentication and Firebase Cloud Messaging on the Firebase Console

---

## 📦 Core Dependencies

- `firebase`
- `@react-navigation/native`
- `react-native-sqlite-storage`
- `react-native-push-notification`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-reanimated`

---

## 📄 License

MIT License © 2025 - Ayash Abdus Syahiid
