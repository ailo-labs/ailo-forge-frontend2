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

  // List of publicly available Hugging Face models
  const models = [
    {
      id: "Llama-2-7B",
      name: "Llama 2 7B",
      repo: "meta-llama/Llama-2-7b",
      description: "Base Llama 2 7B from Meta.",
    },
    {
      id: "Llama-2-7B-Chat",
      name: "Llama 2 Chat 7B",
      repo: "meta-llama/Llama-2-7b-chat-hf",
      description: "Chat-tuned Llama 2 7B.",
    },
    {
      id: "Llama-3-8B",
      name: "Llama 3 8B",
      repo: "meta-llama/Llama-3-8b",
      description: "Optimized for Llama-based tasks with industry-specific tuning.",
    },
    {
      id: "Mistral-7B",
      name: "Mistral 7B",
      repo: "mistralai/mistral-7b",
      description: "Open-source Mistral model for efficient inference.",
    },
    {
      id: "Falcon-40B",
      name: "Falcon 40B",
      repo: "tiiuae/falcon-40b",
      description: "Large Falcon model with high versatility.",
    },
    {
      id: "GPT-J-6B",
      name: "GPT-J 6B",
      repo: "EleutherAI/gpt-j-6B",
      description: "Classic GPT-J model for general tasks.",
    },
    {
      id: "GPT-NeoX-20B",
      name: "GPT-NeoX 20B",
      repo: "EleutherAI/gpt-neox-20b",
      description: "EleutherAI’s 20B parameter NeoX model.",
    },
    {
      id: "Flan-T5-Large",
      name: "FLAN-T5 Large",
      repo: "google/flan-t5-large",
      description: "Instruction-tuned T5 from Google (encoder-decoder).",
    },
  ];

  const handleSelect = (modelRepo: string) => {
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
