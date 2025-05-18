// app/models/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useModel } from "@/context/ModelContext";
import "@/app/styles/ModelsPage.css";
import Footer from "@/components/Footer";

export default function ModelsPage() {
  const { setSelectedModel, setIsModified } = useModel();
  const router = useRouter();

  // UI label, description, and actual HF repo ID
  const models = [
    {
      id: "7B-Base",
      name: "7B-Base",
      repo: "deepseek-ai/deepseek-llm-7b-base",
      description: "Base conversational model with standard tuning.",
    },
    {
      id: "67B-Chat",
      name: "67B-Chat",
      repo: "meta-llama/Llama-2-7b-chat-hf",
      description: "High capacity chat model with advanced dialogue capabilities.",
    },
    {
      id: "LLAMA-3-8B",
      name: "LLAMA-3-8B",
      repo: "meta-llama/Llama-3-8b",
      description: "Optimized for Llama-based tasks with industry-specific parameters.",
    },
    {
      id: "MISTRAL-7B",
      name: "MISTRAL-7B",
      repo: "mistralai/mistral-7b",
      description: "Fast and efficient responses with low latency.",
    },
    {
      id: "FALCON-40B",
      name: "FALCON-40B",
      repo: "tiiuae/falcon-40b",
      description: "Large model with high versatility and custom tuning.",
    },
    {
      id: "GPT-J-6B",
      name: "GPT-J-6B",
      repo: "EleutherAI/gpt-j-6B",
      description: "Open-source model for general tasks with customizable settings.",
    },
    {
      id: "DeepSeek-Coder-33B",
      name: "DeepSeek-Coder-33B",
      repo: "deepseek-ai/deepseek-coder-33b",
      description: "Code-specialized model with enhanced debugging features.",
    },
  ];

  const handleSelect = (modelRepo: string) => {
    // store the actual HF repo string
    setSelectedModel(modelRepo);
    setIsModified(false);
    router.push("/modify");
  };

  return (
    <div className="models-page container">
      <h2>Select an AI Model to Modify</h2>
      <ul className="models-list">
        {models.map((m) => (
          <li key={m.id} onClick={() => handleSelect(m.repo)}>
            <h3>{m.name}</h3>
            <p>{m.description}</p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
