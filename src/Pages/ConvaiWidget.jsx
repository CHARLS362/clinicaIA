// src/components/ConvaiWidget.jsx
import { useEffect } from "react";

const ConvaiWidget = () => {
  useEffect(() => {
    const scriptId = "convai-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <elevenlabs-convai agent-id="agent_01jw4jgehteh3an57gm19x6wf3"></elevenlabs-convai>
    </div>
  );
};

export default ConvaiWidget;
