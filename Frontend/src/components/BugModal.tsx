import { motion, AnimatePresence } from "framer-motion";
import type { BugReport } from "../data/bugs";

interface BugModalProps {
  bug: BugReport | null;
  onClose: () => void;
}

export function BugModal({ bug, onClose }: BugModalProps) {
  if (!bug) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">{bug.title}</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{bug.description}</p>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-destructive mb-2">🐛 Buggy Code</h3>
            <pre className="rounded-lg bg-surface p-4 text-sm text-neon-cyan font-mono overflow-x-auto whitespace-pre-wrap">
              {bug.buggyCode}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-accent mb-2">✅ Solution</h3>
            <pre className="rounded-lg bg-surface p-4 text-sm text-neon-green font-mono overflow-x-auto whitespace-pre-wrap">
              {bug.solution}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-secondary mb-2">💡 Lesson Learned</h3>
            <p className="rounded-lg bg-surface p-4 text-sm text-muted-foreground">{bug.lessonLearned}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
