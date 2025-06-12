### 🔮 Zodyssey

`Zodyssey` is a beautifully crafted mobile astrology app that helps you explore your zodiac identity and cosmic journey with daily updates, insightful charts, and a deeply private experience. No ads, no data selling — just the stars, you, and some delightful astrological fun.

<p align="center"> <img src="/assets/images/adaptive-icon.png" alt="Icon" width="100"/></p>

---

<p align="center">
   <a href="https://github.com/crispengari/zodyssey/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT">
  </a>
  <a href="https://typescriptlang.org/">
    <img src="https://img.shields.io/badge/language-typescript-blue.svg" alt="Language: TypeScript">
  </a>
</p>

### ✨ Features

- 🪐 **Zodiac Profile Builder**  
  Input your birth date, time, and location to generate a personalized natal chart stored **securely on-device**.

- 📅 **Daily Notifications**  
  Receive fun, insightful zodiac readings and cosmic updates each day at your local time. No manual check-ins required!

- 🌠 **On-Device Horoscope Engine**  
  Insights are generated offline or anonymously in the cloud — no personal identifiers are ever transmitted.

- 🔐 **Privacy-Focused Design**  
  All data remains on your device. No third-party analytics, no tracking, and no ads — ever.

- 💫 **Lightweight & Fast**  
  Optimized performance with animations, smooth scroll, and responsive design.

### 🛠️ Tech Stack

- **React Native + Expo** – Cross-platform mobile development
- **react-native-reanimated** – Rich, performant UI animations
- **Custom Component System** – Cards, colors, fonts via constants
- **Push Notifications** – Local notifications via Expo
- **Manual Time-based Triggering** – For daily readings

### 🔔 Daily Notification Setup

`Zodyssey` sends a daily notification reminding users to check their zodiac reading and interesting cosmic events.

#### How it works:

- The app schedules a **daily local notification** on first launch or after profile creation.
- Notifications are **randomized slightly** around a fixed time to avoid patterns.
- Uses `expo-notifications`.

### 🔏 Privacy

`Zodyssey` is designed with user privacy in mind. Highlights include:

- No external APIs for storing user data
- All astrological data is stored **locally**
- No ads, no analytics, no profiling

### 📍 License

This project is licensed under the [MIT](/LICENSE) License.
