import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DebBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I'm Debkanta — your InstaVerse friend! 🤖\nHow can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are DebBot, a friendly helpful chatbot for InstaVerse." },
            ...messages.map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: input }
          ]
        },
        {
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      const reply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I couldn't reach OpenAI right now." }]);
    }
    setLoading(false);
  };

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) return "Hey there! 👋";
    if (msg.includes("how are you")) return "I'm doing great, always here to help you!";
    if (msg.includes("who made you")) return "Debkanta made me 💻. Cool right?";
    if (msg.includes("help")) return "Sure! You can upload posts, explore the feed, or just chat with me.";
    if (msg.includes("bye")) return "Goodbye! See you again soon! 👋";
    return "Hmm, I'm not sure about that. But I'm learning new things every day! ��";
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", post.id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-white p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-purple-600">🤖 InstaVerse Chatbot</h2>
      <div className="h-64 overflow-y-auto mb-4 border rounded p-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {isTyping && <p className="text-sm text-gray-500">Debkanta is typing...</p>}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border p-2 rounded-l"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      {user && <Link to="/profile" className="text-sm text-blue-600 dark:text-blue-300">My Profile</Link>}
    </div>
  );
} 