// import { useEffect, useState } from "react";
// import { FFmpeg } from "@ffmpeg/ffmpeg";

// const FFmpegTest = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const loadFFmpeg = async () => {
//       const ffmpeg = new FFmpeg();
//       try {
//         await ffmpeg.load({
//           coreURL:
//             "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js",
//           wasmURL:
//             "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm",
//         });
//         setIsLoaded(true);
//         console.log("FFmpeg loaded successfully!");
//       } catch (error) {
//         console.error("Failed to load FFmpeg:", error);
//       }
//     };

//     loadFFmpeg();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold">FFmpeg Test</h2>
//       {isLoaded ? (
//         <p className="text-green-500">FFmpeg is loaded!</p>
//       ) : (
//         <p className="text-red-500">Loading FFmpeg...</p>
//       )}
//     </div>
//   );
// };

// export default FFmpegTest;
