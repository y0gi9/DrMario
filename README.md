# Dr. Mario Clone

A modern Dr. Mario-inspired puzzle game with local and online multiplayer support, built with React and Node.js.

## Features
- Authentic Dr. Mario pill rotation and gravity
- Local single-player mode
- Online multiplayer (host/join rooms)
- Lag compensation groundwork

## Prerequisites
- Node.js (v16 or newer recommended)
- npm

## Setup
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd DR-Mario
   ```
2. Install dependencies for the frontend:
   ```sh
   cd client
   npm install
   ```
3. Install dependencies for the backend:
   ```sh
   cd ../server
   npm install
   ```

## Running the Game
### 1. Start the backend server
```sh
cd server
node index.js
```
The server will run at `ws://localhost:3001`.

### 2. Start the frontend
```sh
cd ../client
npm start
```
The game will open at [http://localhost:3000](http://localhost:3000).

## Controls
- **Left/Right Arrow:** Move pill left/right
- **Down Arrow:** Soft drop
- **Z:** Rotate counterclockwise
- **X:** Rotate clockwise
- **Space:** Hard drop (if implemented)

## Online Multiplayer
- Enable "Online Multiplayer" in the UI
- Enter a room name and click Join on two browsers/devices
- Play head-to-head with lag compensation groundwork

## License
MIT 