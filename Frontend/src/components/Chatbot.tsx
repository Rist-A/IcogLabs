import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const botResponses: Record<string, string> = {
  default: "I can help you navigate the ICOG Knowledge Hub. Try asking about posting knowledge, submitting bugs, or viewing exit interviews.",
  knowledge: "To share tacit knowledge, go to Categories → Insight Vault and click 'Share Knowledge'. You'll earn 10 points per approved post!",
  bug: "To report a bug fix, go to Categories → Bug & Resolution Hub and fill in the bug details along with your solution. It'll be reviewed by an admin.",
  interview: "Exit interview recordings are available under Categories → Exit Insights Archive. You can watch embedded YouTube videos directly.",
  points: "You earn points by sharing knowledge (+10 per approved post). Check your total on the Profile page!",
  admin: "Admin features include approving posts/bugs, managing users, uploading interviews, and viewing analytics.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("knowledge") || lower.includes("post") || lower.includes("share")) return botResponses.knowledge;
  if (lower.includes("bug") || lower.includes("fix") || lower.includes("error")) return botResponses.bug;
  if (lower.includes("interview") || lower.includes("exit") || lower.includes("video")) return botResponses.interview;
  if (lower.includes("point") || lower.includes("score") || lower.includes("earn")) return botResponses.points;
  if (lower.includes("admin") || lower.includes("approve") || lower.includes("manage")) return botResponses.admin;
  return botResponses.default;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm the ICOG Knowledge Assistant. Ask me anything about the system.", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getResponse(userMsg), isBot: true }]);
    }, 600);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground shadow-lg neon-glow-primary"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? "✕" : "💬"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden"
          >
            <div className="border-b border-glass-border px-4 py-3">
              <h3 className="font-display text-sm font-bold tracking-wide text-gradient-primary">ICOG Assistant</h3>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.isBot
                      ? "bg-glass text-foreground"
                      : "ml-auto bg-primary/20 text-foreground"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <div className="border-t border-glass-border p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask something..."
                  className="flex-1 rounded-lg bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={send}
                  className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
