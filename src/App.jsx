import { ZegoSuperBoardManager } from "zego-superboard-web";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useEffect } from "react";

function App() {
  const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID),
    serverUrl = import.meta.env.VITE_ZEGO_SERVER_URL,
    userID = "786786",
    roomID = "78783",
    userName = "Hassan",
    token =
      "04AAAAAGixjCkADOZ+xJ3FcUsjYE8B2gCxloFqnBLrNzidleggxk0ioSDfoiQxuCBDL/uq0PM7BAv4roiaAbDWzdla/eUf37jiJnwaiGU3jXzH+EWZepBf2p/rBKBILtetZ8wCE8UC43KbPT/Q4gC5xzVORcU/Df69lYv4WubJsMZdb56/4eKHeAGxeTVbv7IEy8uVvnaObgzKMf2GWjhA1w5yBLqi/bpoBHu5PWnzyYx6l4thddGNeZT2Xz9Pohw+cCIxi0OTU8TlAQ==";

  // Initialize the ZegoExpressEngine instance
  const zg = new ZegoExpressEngine(appID, serverUrl);

  const zegoSuperBoard = ZegoSuperBoardManager.getInstance();

  const initSuperBoard = async () => {
    await zegoSuperBoard.init(zg, {
      parentDomID: "superboard",
      appID,
      userID,
      token,
    });

    await zg.loginRoom(
      roomID,
      token,
      { userID, userName },
      { userUpdate: true }
    );

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
    </div>
  );
}

export default App;

// 27: 30
