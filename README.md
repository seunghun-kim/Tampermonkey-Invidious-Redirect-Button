# Invidious Redirect Button

A Tampermonkey userscript that adds a button to YouTube, redirecting to your self-hosted Invidious instance.

## Features
- "To Invidious" button next to YouTube logo
- Hides in fullscreen, repositions dynamically

## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Create a new script in Tampermonkey.
3. Copy `invidious-redirect-button.user.js` into the editor.
4. Edit `INVIDIOUS_URL` to your Invidious instance (e.g., `http://your-instance/`).
5. Save the script.

## Usage
- On YouTube, click "To Invidious" to view the video on your Invidious instance.
- Button auto-hides in fullscreen and reappears after.

## Configuration
Edit this line in the script:
```javascript
const INVIDIOUS_URL = "http://your-instance/";
```
