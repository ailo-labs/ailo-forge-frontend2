// app/modify/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModel } from "@/context/ModelContext";
import SliderControl from "@/components/SliderControl";
import "@/app/styles/ModifyModelPage.css";
import Footer from "@/components/Footer";

export default function ModifyModelPage() {
  const { selectedModel, setIsModified } = useModel();
  const router = useRouter();
  const [mode, setMode] = useState<"standard" | "advanced">("standard");

  // Standard mode state
  const [temperature, setTemperature] = useState(0.5);
  const [tokenLimit, setTokenLimit] = useState(512);
  const [instructions, setInstructions] = useState("");

  // Advanced mode JSON state
  const [advancedJSON, setAdvancedJSON] = useState(
    `{"temperature":0.5,"tokenLimit":512,"instructions":""}`
  );

  const handleModify = async () => {
    if (!selectedModel) {
      alert("Please select a model first.");
      return;
    }

    let payload: any;
    if (mode === "advanced") {
      try {
        payload = JSON.parse(advancedJSON);
      } catch (e) {
        return alert("Invalid JSON in advanced mode!");
      }
      payload.modelId = selectedModel;
    } else {
      payload = {
        modelId: selectedModel,
        temperature,
        tokenLimit,
        instructions,
      };
    }

    const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080")
      .replace(/\/+$/, "");

    try {
      const { data } = await axios.post(
        `${backendUrl}/modify-file`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.success) {
        alert(data.message);
        setIsModified(true);
        router.push("/chat");
      } else {
        alert("Modify failed: " + JSON.stringify(data));
      }
    } catch (err: any) {
      console.error("Modify error:", err.response?.data || err.message);
      alert("Error modifying model: " + (err.response?.data?.detail || err.message));
    }
  };

  if (!selectedModel) {
    return (
      <div className="modify-model-page container">
        <h2>No Model Selected</h2>
        <p>Please go to <a href="/models">Model Selection</a> first.</p>
      </div>
    );
  }

  return (
    <div className="modify-model-page container">
      <h2>Modify {selectedModel}</h2>
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === "standard" ? "active" : ""}`}
          onClick={() => setMode("standard")}
        >
          Standard Mode
        </button>
        <button
          className={`mode-btn ${mode === "advanced" ? "active" : ""}`}
          onClick={() => setMode("advanced")}
        >
          Advanced Mode
        </button>
      </div>

      {mode === "standard" ? (
        <div className="standard-interface">
          <SliderControl
            label="Creativity (Temperature)"
            min={0}
            max={1}
            step={0.01}
            value={temperature}
            onChange={e => setTemperature(parseFloat(e.target.value))}
            description="Adjust how creative responses are."
          />
          <SliderControl
            label="Token Limit"
            min={128}
            max={2048}
            step={1}
            value={tokenLimit}
            onChange={e => setTokenLimit(parseInt(e.target.value))}
            description="Set maximum tokens per response."
          />
          <div className="instructions-control">
            <label>Additional Instructions:</label>
            <textarea
              placeholder="E.g. Focus on finance compliance..."
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="advanced-json">
          <label>Enter Advanced JSON:</label>
          <textarea
            rows={8}
            value={advancedJSON}
            onChange={e => setAdvancedJSON(e.target.value)}
          />
          <small className="json-hint">
            Example: {"{\"temperature\":0.7,\"tokenLimit\":150,\"instructions\":\"You are a helpful assistant.\"}"}
          </small>
        </div>
      )}

      <div className="button-group">
        <button onClick={handleModify} className="btn modify-btn">
          Modify Settings
        </button>
      </div>

      <Footer />
    </div>
  );
}
