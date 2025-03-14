# Video Frame Extractor

Detta projekt är en React-applikation som låter användare ladda upp en MP4-video, välja en specifik frame och extrahera den som en bild med hjälp av **FFmpeg.wasm**.

## 🚀 Funktioner
- Ladda upp en video
- Använd en slider för att välja en specifik frame
- Förhandsgranska den valda framen
- Extrahera och spara framen som en bild
- Återställ allt och börja om

## 🛠 Tekniker
- **React (TypeScript)** – Frontend-ramverk
- **Tailwind CSS** – Styling
- **FFmpeg.wasm** – Videobearbetning

## 📦 Installation
1. Klona detta repo:
   ```sh
   git clone https://github.com/EmilJohanssonz/videioPlayerApp.git
   cd videioPlayerApp
   ```
2. Installera beroenden:
   ```sh
   npm install
   ```
3. Starta utvecklingsservern:
   ```sh
   npm run dev
   ```

## 🎥 Användning
1. Ladda upp en MP4-video
2. Använd slidern för att välja en frame 
3. Klicka på **"Extrahera Frame"** för att generera en bild
4. Förhandsgranska och spara framen

## 📌 Struktur
```
/video-frame-extractor
│── src/
│   ├── components/
│   │   ├── VideoUploader.tsx
│   │   ├── FrameSlider.tsx
│   │   ├── FrameExtractor.tsx
│   │   ├── FramePreview.tsx
│   ├── App.tsx
│── public/
│── package.json
│── README.md
```

## ❗️ Vanliga problem & Lösningar
### "Memory access out of bounds"-fel
- Kontrollera att **frame-tiden** är inom videons längd.
- Prova att byta `-ss` mot `-t` i FFmpeg-kommandot.
- Rensa buffern innan en ny frame extraheras.
- Låt den nya Url från vedion ladda innan man trycker på knappen för frame.

### CORS-problem vid laddning av FFmpeg
- FFmpeg laddas från **unpkg** – kontrollera att du har rätt URL i `coreURL`.
- Om det fortfarande inte fungerar, testa att köra med en lokal **FFmpeg-core**.

## 📄 Licens
Detta projekt är open-source och kan användas fritt! 🚀

