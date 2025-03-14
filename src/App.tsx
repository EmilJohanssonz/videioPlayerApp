import "./App.css";
import VideoFrameExtractor from "./components/VideoFrameExtractor";

function App() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <VideoFrameExtractor />
      </div>
      <footer className="text-center p-4 bg-gray-200 mt-4">
        &copy; {new Date().getFullYear()} Emil Håkanzon. All rights
        reserved.
      </footer>
    </>
  );
}

export default App;
