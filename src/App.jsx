import { ZegoSuperBoardManager } from "zego-superboard-web";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useEffect, useState } from "react";
import ToolBox from "./ToolBox/ToolBox";

function App() {
  const [currentTool, setCurrentTool] = useState(null);

  const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID),
    serverUrl = import.meta.env.VITE_ZEGO_SERVER_URL,
    userID = "99988",
    roomID = "room190",
    userName = "Hassan",
    token =
      "04AAAAAGi0G6IADN9+CBTuVY691kBNiQCvB3RmaPqImtZPOM8IsV3t9DdHIZJ17CkLNdC/Lc919/xQyZ4FFDoYdVvA+cuh6mQvU+jVEUVb2agiLWVq56Vjr1vkfBZXlPzIzcBYsP7mnRkyP2AghZhg73pcNbUu77bjodnWXyRk/R+zgW5IIlobAkfna1XOOYY8asHrK/MLd4PbU+oM85xoch2DBz0fihdVUea0fZGf3Kgwph0ykGFNLXDA8NfECcPRNl0iMXGLqAE=";

  // Initialize the ZegoExpressEngine instance
  const zg = new ZegoExpressEngine(appID, serverUrl);
  const zegoSuperBoard = ZegoSuperBoardManager.getInstance();

  const initSuperBoard = async () => {
    await zg.loginRoom(
      roomID,
      token,
      { userID, userName },
      { userUpdate: true }
    );
    setCurrentTool(zegoSuperBoard.getToolType());

    await zegoSuperBoard.init(zg, {
      parentDomID: "superboard",
      appID,
      userID,
      token,
    });

    await zegoSuperBoard.createWhiteboardView({
      name: "My project",
      perPageWidth: 1600,
      perPageHeight: 900,
      pageCount: 1,
    });
  };

  useEffect(() => {
    if (zegoSuperBoard) {
      initSuperBoard();
    }
  }, [zegoSuperBoard]);

  return (
    <div className="app">
      <div id="superboard"></div>
      <ToolBox
        currentTool={currentTool}
        onClick={(tool) => {
          zegoSuperBoard.setToolType(tool.type);
          setCurrentTool(tool.type);
        }}
      />
    </div>
  );
}

export default App;
