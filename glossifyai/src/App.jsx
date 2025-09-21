import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [glossary, setGlossary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateGlossary = async () => {
    if (!text.trim()) {
      alert("Please paste some text first!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `
Extract key glossary terms from this text.
Return the glossary in plain, human-readable text format like:

Term: Definition
Example: Optional example

Text: """${text}"""
Do NOT use JSON or extra text.
              `,
            },
          ],
          temperature: 0.3,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const rawText = res.data.choices[0].message.content;
      setGlossary(rawText);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to generate glossary.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText("");
    setGlossary("");
  };

  // 🔍 Highlight glossary terms inside pasted text
  const highlightTerms = () => {
    if (!glossary) return text;

    const lines = glossary.split("\n").filter((l) => l.includes(":"));
    const terms = lines.map((l) => l.split(":")[0].trim());

    let highlightedText = text;
    terms.forEach((term) => {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        (match) => `<span class="highlight">${match}</span>`
      );
    });

    return highlightedText;
  };

  return (
    <div className="container">
      <h1>GlossifyAI</h1>

      <textarea
        className="input-box"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
      />

      <div className="buttons">
        <button onClick={generateGlossary} disabled={loading}>
          {loading ? <span className="spinner"></span> : "Generate Glossary"}
        </button>
        <button onClick={clearAll} className="clear-btn">
          Clear
        </button>
      </div>

      {text && (
        <div
          className="text-preview"
          dangerouslySetInnerHTML={{ __html: highlightTerms() }}
        />
      )}

      {glossary && (
        <div className="glossary-box">
          <h2>Glossary</h2>
          <pre>{glossary}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
