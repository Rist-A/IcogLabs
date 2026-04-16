import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { BugModal } from "../components/BugModal";
import type { BugReport } from "../data/bugs";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/categories")({
  component: CategoriesPage,
});

type Category = "knowledge" | "bugs" | "interviews";

const categories: { id: Category; label: string; icon: string }[] = [
  { id: "knowledge", label: "Insight Vault", icon: "🧠" },
  { id: "bugs", label: "Bug & Resolution Hub", icon: "🐞" },
  { id: "interviews", label: "Exit Insights Archive", icon: "🎥" },
];

// Static knowledge posts data
const staticKnowledgePosts = [
  {
    id: "1",
    title: "Understanding Overfitting in Machine Learning",
    content: "Overfitting occurs when a model learns noise instead of patterns. It performs well on training data but poorly on unseen data. Use techniques like cross-validation, regularization, and dropout to prevent it.",
    author: "Getachew Tessema",
    tags: ["machine-learning", "overfitting", "model-training"],
    createdAt: "2024-03-15T10:30:00Z",
    status: "approved"
  },
  {
    id: "2",
    title: "Feature Scaling Importance",
    content: "Feature scaling ensures that all input variables contribute equally to the model. Use normalization or standardization when working with algorithms like KNN, SVM, and gradient descent.",
    author: "Helen Sheferaw",
    tags: ["data-preprocessing", "feature-scaling"],
    createdAt: "2024-03-14T14:20:00Z",
    status: "approved"
  },
  {
    id: "3",
    title: "Bias vs Variance Tradeoff",
    content: "High bias leads to underfitting, while high variance leads to overfitting. A good model balances both by capturing patterns without memorizing noise.",
    author: "Rist Wubrist",
    tags: ["ml-basics", "bias-variance"],
    createdAt: "2024-03-13T09:15:00Z",
    status: "approved"
  },
  {
    id: "4",
    title: "What is Gradient Descent?",
    content: "Gradient descent is an optimization algorithm used to minimize loss functions. It updates model parameters iteratively by moving in the direction of the negative gradient.",
    author: "Dr.Sifen Damtew",
    tags: ["optimization", "deep-learning"],
    createdAt: "2024-03-12T16:45:00Z",
    status: "approved"
  },
  {
    id: "5",
    title: "Difference Between AI, ML, and Deep Learning",
    content: "AI is the broader concept of machines simulating human intelligence. ML is a subset where systems learn from data. Deep learning is a subset of ML using neural networks with many layers.",
    author: "Rist Wubrist",
    tags: ["ai", "ml", "deep-learning"],
    createdAt: "2024-03-11T11:00:00Z",
    status: "approved"
  },
  {
    id: "6",
    title: "Neural Networks Basics",
    content: "Neural networks consist of layers of neurons that process data. Each neuron applies weights, bias, and activation functions to produce outputs.",
    author: "Demis Zerihun",
    tags: ["neural-networks", "deep-learning"],
    createdAt: "2024-03-10T08:30:00Z",
    status: "approved"
  },
  {
    id: "7",
    title: "Supervised vs Unsupervised Learning",
    content: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data. Examples include classification vs clustering.",
    author: "Telahun hayle",
    tags: ["supervised-learning", "unsupervised-learning"],
    createdAt: "2024-03-09T13:20:00Z",
    status: "approved"
  },
  {
    id: "8",
    title: "Model Evaluation Metrics",
    content: "Use accuracy, precision, recall, and F1-score for classification tasks. For regression, use metrics like MSE and RMSE. Choose metrics based on your problem.",
    author: "Rist Wubrist",
    tags: ["evaluation", "metrics"],
    createdAt: "2024-03-08T10:00:00Z",
    status: "approved"
  },
  {
    id: "9",
    title: "What is Natural Language Processing (NLP)?",
    content: "NLP enables machines to understand and process human language. Applications include chatbots, translation, sentiment analysis, and speech recognition.",
    author: "Hiwot Zelalem",
    tags: ["nlp", "ai"],
    createdAt: "2024-03-07T15:45:00Z",
    status: "approved"
  },
  {
    id: "10",
    title: "Training vs Testing Data",
    content: "Training data is used to train the model, while testing data evaluates its performance. Always keep them separate to avoid data leakage.",
    author: "Rist Wubrist",
    tags: ["data-splitting", "ml-workflow"],
    createdAt: "2024-03-06T09:30:00Z",
    status: "approved"
  }
];

// Static bugs data
const staticBugs = [
  {
    id: "1",
    title: "Data Leakage During Model Training",
    description: "Model is trained using test data leading to unrealistic high accuracy",
    buggyCode: `<div>
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# WRONG: fitting on entire dataset instead of training set
model = LinearRegression()
model.fit(X, y)

predictions = model.predict(X_test)
</div>`,
    solution: `<div>
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# CORRECT: fit only on training data
model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
</div>`,
    lessonLearned: "Never train your model on test data to avoid data leakage",
    author: "Andrew Ng",
    createdAt: "2024-03-15T10:30:00Z",
    status: "approved"
  },
  {
    id: "2",
    title: "Missing Feature Scaling",
    description: "Model performs poorly because features are on different scales",
    buggyCode: `<div>
from sklearn.neighbors import KNeighborsClassifier

model = KNeighborsClassifier()
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
</div>`,
    solution: `<div>
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = KNeighborsClassifier()
model.fit(X_train_scaled, y_train)

accuracy = model.score(X_test_scaled, y_test)
</div>`,
    lessonLearned: "Always scale features for distance-based algorithms like KNN",
    author: "Geoffrey Hinton",
    createdAt: "2024-03-14T14:20:00Z",
    status: "approved"
  },
  {
    id: "3",
    title: "Overfitting Due to Complex Model",
    description: "Model memorizes training data and fails on unseen data",
    buggyCode: `<div>
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=None)
model.fit(X_train, y_train)

train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)
</div>`,
    solution: `<div>
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=5)
model.fit(X_train, y_train)

train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)
</div>`,
    lessonLearned: "Control model complexity to prevent overfitting",
    author: "Yoshua Bengio",
    createdAt: "2024-03-13T09:15:00Z",
    status: "approved"
  },
  {
    id: "4",
    title: "Incorrect Label Encoding",
    description: "Categorical variables not encoded properly for model input",
    buggyCode: `<div>
model.fit(X_train, y_train)  # X contains string categories like 'Male', 'Female'
</div>`,
    solution: `<div>
from sklearn.preprocessing import LabelEncoder

encoder = LabelEncoder()
X_train['gender'] = encoder.fit_transform(X_train['gender'])
X_test['gender'] = encoder.transform(X_test['gender'])

model.fit(X_train, y_train)
</div>`,
    lessonLearned: "Convert categorical variables into numerical format before training",
    author: "Fei-Fei Li",
    createdAt: "2024-03-12T16:45:00Z",
    status: "approved"
  },
  {
    id: "5",
    title: "Wrong Evaluation Metric",
    description: "Using accuracy for imbalanced dataset gives misleading results",
    buggyCode: `<div>
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_test, predictions)
print("Accuracy:", accuracy)
</div>`,
    solution: `<div>
from sklearn.metrics import classification_report

report = classification_report(y_test, predictions)
print(report)
</div>`,
    lessonLearned: "Use precision, recall, and F1-score for imbalanced datasets",
    author: "Pedro Domingos",
    createdAt: "2024-03-11T11:00:00Z",
    status: "approved"
  },
  {
    id: "6",
    title: "Not Shuffling Data Before Training",
    description: "Model learns order-based patterns instead of real patterns",
    buggyCode: `<div>
model.fit(X, y)  # Data is ordered (e.g., all positives then negatives)
</div>`,
    solution: `<div>
from sklearn.utils import shuffle

X_shuffled, y_shuffled = shuffle(X, y, random_state=42)
model.fit(X_shuffled, y_shuffled)
</div>`,
    lessonLearned: "Always shuffle data to avoid bias from ordering",
    author: "Sebastian Thrun",
    createdAt: "2024-03-10T08:30:00Z",
    status: "approved"
  },
  {
    id: "7",
    title: "Improper Train-Test Split Ratio",
    description: "Too little test data leads to unreliable evaluation",
    buggyCode: `<div>
train_test_split(X, y, test_size=0.01)
</div>`,
    solution: `<div>
train_test_split(X, y, test_size=0.2, random_state=42)
</div>`,
    lessonLearned: "Use a reasonable split like 80/20 for reliable evaluation",
    author: "Christopher Manning",
    createdAt: "2024-03-09T13:20:00Z",
    status: "approved"
  },
  {
    id: "8",
    title: "Gradient Explosion in Deep Learning",
    description: "Training becomes unstable due to very large gradients",
    buggyCode: `<div>
loss.backward()
optimizer.step()
</div>`,
    solution: `<div>
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

loss.backward()
optimizer.step()
</div>`,
    lessonLearned: "Use gradient clipping to stabilize deep learning training",
    author: "Ian Goodfellow",
    createdAt: "2024-03-08T10:00:00Z",
    status: "approved"
  },
  {
    id: "9",
    title: "Using Test Data for Hyperparameter Tuning",
    description: "Leads to overly optimistic model performance",
    buggyCode: `<div>
# tuning directly on test data
model.fit(X_test, y_test)
</div>`,
    solution: `<div>
# use validation set instead
X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2)

model.fit(X_train, y_train)
validation_score = model.score(X_val, y_val)
</div>`,
    lessonLearned: "Always keep test data untouched until final evaluation",
    author: "Demis Hassabis",
    createdAt: "2024-03-07T15:45:00Z",
    status: "approved"
  },
  {
    id: "10",
    title: "Ignoring Missing Values",
    description: "Model crashes or behaves incorrectly due to NaN values",
    buggyCode: `<div>
model.fit(X_train, y_train)  # X contains missing values
</div>`,
    solution: `<div>
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy='mean')
X_train = imputer.fit_transform(X_train)
X_test = imputer.transform(X_test)

model.fit(X_train, y_train)
</div>`,
    lessonLearned: "Always handle missing data before training models",
    author: "Andrew Ng",
    createdAt: "2024-03-06T09:30:00Z",
    status: "approved"
  }
];

// Static interviews data
const staticInterviews = [
  { id: "1", employeeName: "Bisrat Hayelom", role: "Chief AI Scientist", summary: "Publish or perish is killing applied AI. Papers are vanity, impact is sanity.", date: "2024-03-15", videoUrl: "https://www.youtube.com/embed/3a9cbmZm2UU" },
  { id: "2", employeeName: "Helena Seyum", role: "Principal Research Engineer", summary: "Theory tells you it should work. Reality tells you it won't. Your beautiful attention mechanism will crash on OOM errors.", date: "2024-03-10", videoUrl: "https://www.youtube.com/embed/EHmsexcVrqg" },
  { id: "3", employeeName: "Dr.Balecha Getenet", role: "ML Infrastructure Lead", summary: "Researchers think infrastructure is beneath them until their training job fails at 4 AM. I've seen million-dollar GPU clusters burning cycles on I/O bottlenecks.", date: "2024-03-05", videoUrl: "https://www.youtube.com/embed/KKmC1Rki1ec" },
  { id: "4", employeeName: "Rediet Ephrem", role: "Ethics & Responsible AI Lead", summary: "Every impressive demo hides an uncomfortable truth: your model is learning your biases. That fairness metric you ignored? It's someone's life.", date: "2024-02-28", videoUrl: "https://www.youtube.com/embed/VMIWgp-iF5I" },
  { id: "5", employeeName: "Naol Sifen", role: "Senior Applied Scientist", summary: "Stop chasing SOTA on ImageNet. Your custom object detector needs to work in rain, at night, with motion blur, on an edge device with 2GB RAM. ", date: "2024-02-20", videoUrl: "https://www.youtube.com/embed/3y7Szum8xRY" },
];

function CategoriesPage() {
  const [active, setActive] = useState<Category>("knowledge");
  const [showPostForm, setShowPostForm] = useState(false);
  const [showBugForm, setShowBugForm] = useState(false);
  const [selectedBug, setSelectedBug] = useState<BugReport | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-6 py-3 text-base font-medium transition-all ${
              active === cat.id
                ? "bg-primary text-primary-foreground neon-glow-primary"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl mr-2">{cat.icon}</span> {cat.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active === "knowledge" && <KnowledgeSection key="knowledge" showForm={showPostForm} setShowForm={setShowPostForm} onSelectPost={setSelectedPost} />}
        {active === "bugs" && <BugsSection key="bugs" showForm={showBugForm} setShowForm={setShowBugForm} onSelectBug={setSelectedBug} />}
        {active === "interviews" && <InterviewsSection key="interviews" onSelectInterview={setSelectedInterview} />}
      </AnimatePresence>

      <BugModal bug={selectedBug} onClose={() => setSelectedBug(null)} />
      
      {/* Knowledge Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full p-8 rounded-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-foreground">{selectedPost.title}</h2>
                <button onClick={() => setSelectedPost(null)} className="text-muted-foreground hover:text-foreground text-2xl">&times;</button>
              </div>
              <p className="text-base text-muted-foreground mb-4 whitespace-pre-wrap">{selectedPost.content}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{tag}</span>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>by {selectedPost.author}</span>
                <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interview Modal */}
      <AnimatePresence>
        {selectedInterview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInterview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-4xl w-full p-8 rounded-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-foreground">{selectedInterview.employeeName}</h2>
                <button onClick={() => setSelectedInterview(null)} className="text-muted-foreground hover:text-foreground text-2xl">&times;</button>
              </div>
              <div className="aspect-video mb-4">
                <iframe
                  src={selectedInterview.videoUrl}
                  title={selectedInterview.employeeName}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-primary mb-2">{selectedInterview.role}</p>
              <p className="text-base text-muted-foreground mb-4">{selectedInterview.summary}</p>
              <p className="text-sm text-muted-foreground">Exit Date: {selectedInterview.date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KnowledgeSection({ showForm, setShowForm, onSelectPost }: { showForm: boolean; setShowForm: (v: boolean) => void; onSelectPost: (post: any) => void }) {
  const { addPost } = useData();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [posts, setPosts] = useState(staticKnowledgePosts);

  // Check for duplicate knowledge post
  const isDuplicatePost = (title: string, content: string) => {
    return posts.some(post => 
      post.title.toLowerCase() === title.toLowerCase() ||
      post.content.toLowerCase() === content.toLowerCase()
    );
  };

  const showConfirmationDialog = (onConfirm: () => void) => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="rounded-xl shadow-2xl p-8 max-w-lg mx-auto"
        style={{
          background: "oklch(0.18 0.03 260 / 95%)",
          border: "1px solid oklch(1 0 0 / 15%)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <span className="text-3xl">✅</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-foreground">Confirm Submission</h3>
            <p className="text-lg text-muted-foreground mt-2">
              Please confirm that the information you provided is true, valid, and not a duplicate.
            </p>
          </div>
        </div>
        <div className="mt-8 flex gap-4 justify-end">
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded-lg px-6 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t);
              onConfirm();
            }}
            className="rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Yes, Submit
          </button>
        </div>
      </motion.div>
    ), {
      duration: 10000,
      position: "top-center",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !user) {
      toast.error(
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <span className="text-lg font-semibold">Missing Fields</span>
          </div>
          <p className="text-base">Please fill in all required fields.</p>
        </div>,
        {
          duration: 4000,
          style: {
            background: "oklch(0.18 0.03 260 / 95%)",
            border: "1px solid oklch(0.8 0.2 20 / 50%)",
            padding: "1.25rem",
          },
        }
      );
      return;
    }

    if (isDuplicatePost(title, content)) {
      toast.error(
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <span className="text-lg font-semibold">Duplicate Content</span>
          </div>
          <p className="text-base">This knowledge post already exists! Please submit unique content.</p>
        </div>,
        {
          duration: 4000,
          style: {
            background: "oklch(0.18 0.03 260 / 95%)",
            border: "1px solid oklch(0.8 0.2 20 / 50%)",
            padding: "1.25rem",
          },
        }
      );
      return;
    }

    showConfirmationDialog(() => {
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        author: user.name,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        points: 10,
        createdAt: new Date().toISOString(),
        status: "pending" as const,
      };
      
      addPost(newPost);
      
      toast.success(
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📝</span>
            <span className="text-xl font-semibold">Knowledge Base Submitted!</span>
          </div>
          <p className="text-lg">Your insight will be available after admin approval.</p>
          <p className="text-base text-muted-foreground mt-2">Stay tuned! You'll be notified once approved.</p>
        </div>,
        {
          duration: 6000,
          style: {
            background: "oklch(0.18 0.03 260 / 95%)",
            border: "1px solid oklch(0.6 0.2 150 / 50%)",
            padding: "1.5rem",
          },
        }
      );
      
      setTitle("");
      setContent("");
      setTags("");
      setShowForm(false);
    });
  };

  const filteredPosts = posts
    .filter(post => 
      post.status === "approved" && (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">🧠 Insight Vault</h2>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg bg-input px-4 py-2.5 pl-10 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
            <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
            className="rounded-lg bg-input px-4 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="latest">Latest </option>
            <option value="oldest">Oldest </option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-primary/20 px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-primary/30"
          >
            {showForm ? "Cancel" : "➕ Share Knowledge"}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="glass-card mb-8 space-y-5 overflow-hidden p-8"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What knowledge do you want to share today?"
              rows={5}
              className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              required
            />
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma separated)"
              className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground"
            >
              Submit (+10 points)
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => onSelectPost(post)}
            className="glass-card p-6 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
            <p className="mt-3 text-base text-muted-foreground line-clamp-3">{post.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{tag}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>by {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function BugsSection({
  showForm,
  setShowForm,
  onSelectBug,
}: {
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  onSelectBug: (bug: BugReport) => void;
}) {
  const { addBug } = useData();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buggyCode, setBuggyCode] = useState("");
  const [solution, setSolution] = useState("");
  const [lesson, setLesson] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [bugs, setBugs] = useState(staticBugs);

  // Check for duplicate bug
  const isDuplicateBug = (title: string, buggyCode: string) => {
    return bugs.some(bug => 
      bug.title.toLowerCase() === title.toLowerCase() ||
      bug.buggyCode.toLowerCase() === buggyCode.toLowerCase()
    );
  };

  const showConfirmationDialog = (onConfirm: () => void) => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="rounded-xl shadow-2xl p-8 max-w-lg mx-auto"
        style={{
          background: "oklch(0.18 0.03 260 / 95%)",
          border: "1px solid oklch(1 0 0 / 15%)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
            <span className="text-3xl">🐞</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-foreground">Confirm Bug Report</h3>
            <p className="text-lg text-muted-foreground mt-2">
              Please confirm that this bug fix is accurate, valid, and not a duplicate.
            </p>
          </div>
        </div>
        <div className="mt-8 flex gap-4 justify-end">
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded-lg px-6 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t);
              onConfirm();
            }}
            className="rounded-lg bg-secondary px-6 py-3 text-lg font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            Yes, Submit
          </button>
        </div>
      </motion.div>
    ), {
      duration: 10000,
      position: "top-center",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !buggyCode || !solution || !user) {
      toast.error(
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <span className="text-lg font-semibold">Missing Fields</span>
          </div>
          <p className="text-base">Please fill in all required fields.</p>
        </div>,
        {
          duration: 4000,
          style: {
            background: "oklch(0.18 0.03 260 / 95%)",
            border: "1px solid oklch(0.8 0.2 20 / 50%)",
            padding: "1.25rem",
          },
        }
      );
      return;
    }

    if (isDuplicateBug(title, buggyCode)) {
      toast.error(
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <span className="text-lg font-semibold">Duplicate Bug Report</span>
          </div>
          <p className="text-base">This bug report already exists! Please submit a unique bug fix.</p>
        </div>,
        {
          duration: 4000,
          style: {
            background: "oklch(0.18 0.03 260 / 95%)",
            border: "1px solid oklch(0.8 0.2 20 / 50%)",
            padding: "1.25rem",
          },
        }
      );
      return;
    }

    showConfirmationDialog(() => {
      const newBug = {
        id: Date.now().toString(),
        title,
        description,
        buggyCode,
        solution,
        lessonLearned: lesson,
        author: user.name,
        authorId: user.id,
        createdAt: new Date().toISOString(),
        status: "pending" as const,
      };
      
      addBug(newBug);
      
      toast.success(
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔧</span>
            <span className="text-xl font-semibold">Bug Fix Submitted!</span>
          </div>
          <p className="text-lg">Your bug fix will be available after admin approval.</p>
          <p className="text-base text-muted-foreground mt-2">Stay tuned! The community will benefit from your contribution once approved.</p>
        </div>,
        {
          duration: 6000,
          style: {
            background: "oklch(0.18 0.03 260 / 95%)",
            border: "1px solid oklch(0.6 0.2 200 / 50%)",
            padding: "1.5rem",
          },
        }
      );
      
      setTitle(""); setDescription(""); setBuggyCode(""); setSolution(""); setLesson("");
      setShowForm(false);
    });
  };

  const filteredBugs = bugs
    .filter(bug => 
      bug.status === "approved" && (
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.lessonLearned.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">🐞 Bug & Resolution Hub</h2>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder=" Search bugs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg bg-input px-4 py-2.5 pl-10 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
            <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
            className="rounded-lg bg-input px-4 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="latest">Latest </option>
            <option value="oldest">Oldest </option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-secondary/20 px-6 py-3 text-base font-medium text-secondary transition-colors hover:bg-secondary/30"
          >
            {showForm ? "Cancel" : "➕ Report Bug Fix"}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="glass-card mb-8 overflow-hidden p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-5">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bug title" className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Bug description" rows={3} className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                <textarea value={buggyCode} onChange={(e) => setBuggyCode(e.target.value)} placeholder="Paste buggy code here..." rows={6} className="w-full rounded-lg bg-input px-5 py-3.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
              </div>
              <div className="space-y-5">
                <textarea value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Solution code / explanation" rows={6} className="w-full rounded-lg bg-input px-5 py-3.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
                <textarea value={lesson} onChange={(e) => setLesson(e.target.value)} placeholder="Lesson learned" rows={4} className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6 rounded-lg bg-secondary px-8 py-3.5 text-base font-semibold text-secondary-foreground">
              Submit Bug Fix
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredBugs.map((bug, i) => (
          <motion.div
            key={bug.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => onSelectBug(bug as BugReport)}
            className="glass-card cursor-pointer p-6"
          >
            <h3 className="text-xl font-semibold text-foreground">{bug.title}</h3>
            <pre className="mt-3 max-h-32 overflow-hidden rounded-lg bg-surface p-4 text-sm font-mono text-neon-cyan">{bug.buggyCode}</pre>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{bug.lessonLearned}</p>
            <p className="mt-3 text-xs text-muted-foreground">{new Date(bug.createdAt).toLocaleDateString()}</p>
            <p className="mt-2 text-sm text-muted-foreground">Click to view full details →</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function InterviewsSection({ onSelectInterview }: { onSelectInterview: (interview: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [interviews, setInterviews] = useState(staticInterviews);
  const [playing, setPlaying] = useState<string | null>(null);

  const filteredInterviews = interviews
    .filter(interview => 
      interview.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.summary.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">🎥 Exit Insights Archive</h2>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg bg-input px-4 py-2.5 pl-10 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
            <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
            className="rounded-lg bg-input px-4 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="latest">Latest </option>
            <option value="oldest">Oldest </option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInterviews.map((interview, i) => (
          <motion.div
            key={interview.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass-card overflow-hidden cursor-pointer"
            onClick={() => onSelectInterview(interview)}
          >
            {playing === interview.id ? (
              <div className="aspect-video">
                <iframe
                  src={interview.videoUrl + "?autoplay=1"}
                  title={interview.employeeName}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setPlaying(interview.id);
                }}
                className="flex aspect-video cursor-pointer items-center justify-center bg-surface/50"
              >
                <motion.span whileHover={{ scale: 1.2 }} className="text-5xl">▶️</motion.span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground">{interview.employeeName}</h3>
              <p className="text-sm text-primary mt-1">{interview.role}</p>
              <p className="mt-3 text-base text-muted-foreground line-clamp-2">{interview.summary}</p>
              <p className="mt-3 text-sm text-muted-foreground">{interview.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
// import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { useData } from "../context/DataContext";
// import { BugModal } from "../components/BugModal";
// import type { BugReport } from "../data/bugs";

// export const Route = createFileRoute("/dashboard/categories")({
//   component: CategoriesPage,
// });

// type Category = "knowledge" | "bugs" | "interviews";

// const categories: { id: Category; label: string; icon: string }[] = [
//   { id: "knowledge", label: "Insight Vault", icon: "🧠" },
//   { id: "bugs", label: "Bug & Resolution Hub", icon: "🐞" },
//   { id: "interviews", label: "Exit Insights Archive", icon: "🎥" },
// ];

// // Static knowledge posts data
// const staticKnowledgePosts = [
//   {
//     id: "1",
//     title: "Understanding Overfitting in Machine Learning",
//     content: "Overfitting occurs when a model learns noise instead of patterns. It performs well on training data but poorly on unseen data. Use techniques like cross-validation, regularization, and dropout to prevent it.",
//     author: "Andrew Ng",
//     tags: ["machine-learning", "overfitting", "model-training"],
//     createdAt: "2024-03-15T10:30:00Z",
//     status: "approved"
//   },
//   {
//     id: "2",
//     title: "Feature Scaling Importance",
//     content: "Feature scaling ensures that all input variables contribute equally to the model. Use normalization or standardization when working with algorithms like KNN, SVM, and gradient descent.",
//     author: "Geoffrey Hinton",
//     tags: ["data-preprocessing", "feature-scaling"],
//     createdAt: "2024-03-14T14:20:00Z",
//     status: "approved"
//   },
//   {
//     id: "3",
//     title: "Bias vs Variance Tradeoff",
//     content: "High bias leads to underfitting, while high variance leads to overfitting. A good model balances both by capturing patterns without memorizing noise.",
//     author: "Yoshua Bengio",
//     tags: ["ml-basics", "bias-variance"],
//     createdAt: "2024-03-13T09:15:00Z",
//     status: "approved"
//   },
//   {
//     id: "4",
//     title: "What is Gradient Descent?",
//     content: "Gradient descent is an optimization algorithm used to minimize loss functions. It updates model parameters iteratively by moving in the direction of the negative gradient.",
//     author: "Ian Goodfellow",
//     tags: ["optimization", "deep-learning"],
//     createdAt: "2024-03-12T16:45:00Z",
//     status: "approved"
//   },
//   {
//     id: "5",
//     title: "Difference Between AI, ML, and Deep Learning",
//     content: "AI is the broader concept of machines simulating human intelligence. ML is a subset where systems learn from data. Deep learning is a subset of ML using neural networks with many layers.",
//     author: "Fei-Fei Li",
//     tags: ["ai", "ml", "deep-learning"],
//     createdAt: "2024-03-11T11:00:00Z",
//     status: "approved"
//   },
//   {
//     id: "6",
//     title: "Neural Networks Basics",
//     content: "Neural networks consist of layers of neurons that process data. Each neuron applies weights, bias, and activation functions to produce outputs.",
//     author: "Demis Hassabis",
//     tags: ["neural-networks", "deep-learning"],
//     createdAt: "2024-03-10T08:30:00Z",
//     status: "approved"
//   },
//   {
//     id: "7",
//     title: "Supervised vs Unsupervised Learning",
//     content: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data. Examples include classification vs clustering.",
//     author: "Sebastian Thrun",
//     tags: ["supervised-learning", "unsupervised-learning"],
//     createdAt: "2024-03-09T13:20:00Z",
//     status: "approved"
//   },
//   {
//     id: "8",
//     title: "Model Evaluation Metrics",
//     content: "Use accuracy, precision, recall, and F1-score for classification tasks. For regression, use metrics like MSE and RMSE. Choose metrics based on your problem.",
//     author: "Pedro Domingos",
//     tags: ["evaluation", "metrics"],
//     createdAt: "2024-03-08T10:00:00Z",
//     status: "approved"
//   },
//   {
//     id: "9",
//     title: "What is Natural Language Processing (NLP)?",
//     content: "NLP enables machines to understand and process human language. Applications include chatbots, translation, sentiment analysis, and speech recognition.",
//     author: "Christopher Manning",
//     tags: ["nlp", "ai"],
//     createdAt: "2024-03-07T15:45:00Z",
//     status: "approved"
//   },
//   {
//     id: "10",
//     title: "Training vs Testing Data",
//     content: "Training data is used to train the model, while testing data evaluates its performance. Always keep them separate to avoid data leakage.",
//     author: "Andrew Ng",
//     tags: ["data-splitting", "ml-workflow"],
//     createdAt: "2024-03-06T09:30:00Z",
//     status: "approved"
//   }
// ];

// // Static bugs data
// const staticBugs = [
//   {
//     id: "1",
//     title: "Data Leakage During Model Training",
//     description: "Model is trained using test data leading to unrealistic high accuracy",
//     buggyCode: `<div>
// from sklearn.model_selection import train_test_split
// from sklearn.linear_model import LinearRegression

// X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

// # WRONG: fitting on entire dataset instead of training set
// model = LinearRegression()
// model.fit(X, y)

// predictions = model.predict(X_test)
// </div>`,
//     solution: `<div>
// from sklearn.model_selection import train_test_split
// from sklearn.linear_model import LinearRegression

// X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

// # CORRECT: fit only on training data
// model = LinearRegression()
// model.fit(X_train, y_train)

// predictions = model.predict(X_test)
// </div>`,
//     lessonLearned: "Never train your model on test data to avoid data leakage",
//     author: "Andrew Ng",
//     createdAt: "2024-03-15T10:30:00Z",
//     status: "approved"
//   },
//   {
//     id: "2",
//     title: "Missing Feature Scaling",
//     description: "Model performs poorly because features are on different scales",
//     buggyCode: `<div>
// from sklearn.neighbors import KNeighborsClassifier

// model = KNeighborsClassifier()
// model.fit(X_train, y_train)

// accuracy = model.score(X_test, y_test)
// </div>`,
//     solution: `<div>
// from sklearn.preprocessing import StandardScaler
// from sklearn.neighbors import KNeighborsClassifier

// scaler = StandardScaler()
// X_train_scaled = scaler.fit_transform(X_train)
// X_test_scaled = scaler.transform(X_test)

// model = KNeighborsClassifier()
// model.fit(X_train_scaled, y_train)

// accuracy = model.score(X_test_scaled, y_test)
// </div>`,
//     lessonLearned: "Always scale features for distance-based algorithms like KNN",
//     author: "Geoffrey Hinton",
//     createdAt: "2024-03-14T14:20:00Z",
//     status: "approved"
//   },
//   {
//     id: "3",
//     title: "Overfitting Due to Complex Model",
//     description: "Model memorizes training data and fails on unseen data",
//     buggyCode: `<div>
// from sklearn.tree import DecisionTreeClassifier

// model = DecisionTreeClassifier(max_depth=None)
// model.fit(X_train, y_train)

// train_score = model.score(X_train, y_train)
// test_score = model.score(X_test, y_test)
// </div>`,
//     solution: `<div>
// from sklearn.tree import DecisionTreeClassifier

// model = DecisionTreeClassifier(max_depth=5)
// model.fit(X_train, y_train)

// train_score = model.score(X_train, y_train)
// test_score = model.score(X_test, y_test)
// </div>`,
//     lessonLearned: "Control model complexity to prevent overfitting",
//     author: "Yoshua Bengio",
//     createdAt: "2024-03-13T09:15:00Z",
//     status: "approved"
//   },
//   {
//     id: "4",
//     title: "Incorrect Label Encoding",
//     description: "Categorical variables not encoded properly for model input",
//     buggyCode: `<div>
// model.fit(X_train, y_train)  # X contains string categories like 'Male', 'Female'
// </div>`,
//     solution: `<div>
// from sklearn.preprocessing import LabelEncoder

// encoder = LabelEncoder()
// X_train['gender'] = encoder.fit_transform(X_train['gender'])
// X_test['gender'] = encoder.transform(X_test['gender'])

// model.fit(X_train, y_train)
// </div>`,
//     lessonLearned: "Convert categorical variables into numerical format before training",
//     author: "Fei-Fei Li",
//     createdAt: "2024-03-12T16:45:00Z",
//     status: "approved"
//   },
//   {
//     id: "5",
//     title: "Wrong Evaluation Metric",
//     description: "Using accuracy for imbalanced dataset gives misleading results",
//     buggyCode: `<div>
// from sklearn.metrics import accuracy_score

// accuracy = accuracy_score(y_test, predictions)
// print("Accuracy:", accuracy)
// </div>`,
//     solution: `<div>
// from sklearn.metrics import classification_report

// report = classification_report(y_test, predictions)
// print(report)
// </div>`,
//     lessonLearned: "Use precision, recall, and F1-score for imbalanced datasets",
//     author: "Pedro Domingos",
//     createdAt: "2024-03-11T11:00:00Z",
//     status: "approved"
//   },
//   {
//     id: "6",
//     title: "Not Shuffling Data Before Training",
//     description: "Model learns order-based patterns instead of real patterns",
//     buggyCode: `<div>
// model.fit(X, y)  # Data is ordered (e.g., all positives then negatives)
// </div>`,
//     solution: `<div>
// from sklearn.utils import shuffle

// X_shuffled, y_shuffled = shuffle(X, y, random_state=42)
// model.fit(X_shuffled, y_shuffled)
// </div>`,
//     lessonLearned: "Always shuffle data to avoid bias from ordering",
//     author: "Sebastian Thrun",
//     createdAt: "2024-03-10T08:30:00Z",
//     status: "approved"
//   },
//   {
//     id: "7",
//     title: "Improper Train-Test Split Ratio",
//     description: "Too little test data leads to unreliable evaluation",
//     buggyCode: `<div>
// train_test_split(X, y, test_size=0.01)
// </div>`,
//     solution: `<div>
// train_test_split(X, y, test_size=0.2, random_state=42)
// </div>`,
//     lessonLearned: "Use a reasonable split like 80/20 for reliable evaluation",
//     author: "Christopher Manning",
//     createdAt: "2024-03-09T13:20:00Z",
//     status: "approved"
//   },
//   {
//     id: "8",
//     title: "Gradient Explosion in Deep Learning",
//     description: "Training becomes unstable due to very large gradients",
//     buggyCode: `<div>
// loss.backward()
// optimizer.step()
// </div>`,
//     solution: `<div>
// torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

// loss.backward()
// optimizer.step()
// </div>`,
//     lessonLearned: "Use gradient clipping to stabilize deep learning training",
//     author: "Ian Goodfellow",
//     createdAt: "2024-03-08T10:00:00Z",
//     status: "approved"
//   },
//   {
//     id: "9",
//     title: "Using Test Data for Hyperparameter Tuning",
//     description: "Leads to overly optimistic model performance",
//     buggyCode: `<div>
// # tuning directly on test data
// model.fit(X_test, y_test)
// </div>`,
//     solution: `<div>
// # use validation set instead
// X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2)

// model.fit(X_train, y_train)
// validation_score = model.score(X_val, y_val)
// </div>`,
//     lessonLearned: "Always keep test data untouched until final evaluation",
//     author: "Demis Hassabis",
//     createdAt: "2024-03-07T15:45:00Z",
//     status: "approved"
//   },
//   {
//     id: "10",
//     title: "Ignoring Missing Values",
//     description: "Model crashes or behaves incorrectly due to NaN values",
//     buggyCode: `<div>
// model.fit(X_train, y_train)  # X contains missing values
// </div>`,
//     solution: `<div>
// from sklearn.impute import SimpleImputer

// imputer = SimpleImputer(strategy='mean')
// X_train = imputer.fit_transform(X_train)
// X_test = imputer.transform(X_test)

// model.fit(X_train, y_train)
// </div>`,
//     lessonLearned: "Always handle missing data before training models",
//     author: "Andrew Ng",
//     createdAt: "2024-03-06T09:30:00Z",
//     status: "approved"
//   }
// ];

// // Static interviews data
// const staticInterviews = [
//   { id: "1", employeeName: "Bisrat Hayelom", role: "Chief AI Scientist", summary: "Publish or perish is killing applied AI. Papers are vanity, impact is sanity.", date: "2024-03-15", videoUrl: "https://www.youtube.com/embed/3a9cbmZm2UU" },
//   { id: "2", employeeName: "Helena Seyum", role: "Principal Research Engineer", summary: "Theory tells you it should work. Reality tells you it won't. Your beautiful attention mechanism will crash on OOM errors.", date: "2024-03-10", videoUrl: "https://www.youtube.com/embed/EHmsexcVrqg" },
//   { id: "3", employeeName: "Dr.Balecha Getenet", role: "ML Infrastructure Lead", summary: "Researchers think infrastructure is beneath them until their training job fails at 4 AM. I've seen million-dollar GPU clusters burning cycles on I/O bottlenecks.", date: "2024-03-05", videoUrl: "https://www.youtube.com/embed/KKmC1Rki1ec" },
//   { id: "4", employeeName: "Rediet Ephrem", role: "Ethics & Responsible AI Lead", summary: "Every impressive demo hides an uncomfortable truth: your model is learning your biases. That fairness metric you ignored? It's someone's life.", date: "2024-02-28", videoUrl: "https://www.youtube.com/embed/VMIWgp-iF5I" },
//   { id: "5", employeeName: "Naol Sifen", role: "Senior Applied Scientist", summary: "Stop chasing SOTA on ImageNet. Your custom object detector needs to work in rain, at night, with motion blur, on an edge device with 2GB RAM. ", date: "2024-02-20", videoUrl: "https://www.youtube.com/embed/3y7Szum8xRY" },
// ];

// function CategoriesPage() {
//   const [active, setActive] = useState<Category>("knowledge");
//   const [showPostForm, setShowPostForm] = useState(false);
//   const [showBugForm, setShowBugForm] = useState(false);
//   const [selectedBug, setSelectedBug] = useState<BugReport | null>(null);
//   const [selectedPost, setSelectedPost] = useState<any>(null);
//   const [selectedInterview, setSelectedInterview] = useState<any>(null);

//   return (
//     <div>
//       <div className="mb-10 flex flex-wrap gap-3">
//         {categories.map((cat) => (
//           <motion.button
//             key={cat.id}
//             onClick={() => setActive(cat.id)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`rounded-full px-6 py-3 text-base font-medium transition-all ${
//               active === cat.id
//                 ? "bg-primary text-primary-foreground neon-glow-primary"
//                 : "glass text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             <span className="text-xl mr-2">{cat.icon}</span> {cat.label}
//           </motion.button>
//         ))}
//       </div>

//       <AnimatePresence mode="wait">
//         {active === "knowledge" && <KnowledgeSection key="knowledge" showForm={showPostForm} setShowForm={setShowPostForm} onSelectPost={setSelectedPost} />}
//         {active === "bugs" && <BugsSection key="bugs" showForm={showBugForm} setShowForm={setShowBugForm} onSelectBug={setSelectedBug} />}
//         {active === "interviews" && <InterviewsSection key="interviews" onSelectInterview={setSelectedInterview} />}
//       </AnimatePresence>

//       <BugModal bug={selectedBug} onClose={() => setSelectedBug(null)} />
      
//       {/* Knowledge Post Modal */}
//       <AnimatePresence>
//         {selectedPost && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedPost(null)}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               onClick={(e) => e.stopPropagation()}
//               className="glass-card max-w-2xl w-full p-8 rounded-xl"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold text-foreground">{selectedPost.title}</h2>
//                 <button onClick={() => setSelectedPost(null)} className="text-muted-foreground hover:text-foreground text-2xl">&times;</button>
//               </div>
//               <p className="text-base text-muted-foreground mb-4 whitespace-pre-wrap">{selectedPost.content}</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {selectedPost.tags.map((tag: string) => (
//                   <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{tag}</span>
//                 ))}
//               </div>
//               <div className="flex justify-between items-center text-sm text-muted-foreground">
//                 <span>by {selectedPost.author}</span>
//                 <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Interview Modal */}
//       <AnimatePresence>
//         {selectedInterview && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedInterview(null)}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               onClick={(e) => e.stopPropagation()}
//               className="glass-card max-w-4xl w-full p-8 rounded-xl"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <h2 className="text-2xl font-bold text-foreground">{selectedInterview.employeeName}</h2>
//                 <button onClick={() => setSelectedInterview(null)} className="text-muted-foreground hover:text-foreground text-2xl">&times;</button>
//               </div>
//               <div className="aspect-video mb-4">
//                 <iframe
//                   src={selectedInterview.videoUrl}
//                   title={selectedInterview.employeeName}
//                   className="w-full h-full rounded-lg"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//               <p className="text-sm text-primary mb-2">{selectedInterview.role}</p>
//               <p className="text-base text-muted-foreground mb-4">{selectedInterview.summary}</p>
//               <p className="text-sm text-muted-foreground">Exit Date: {selectedInterview.date}</p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function KnowledgeSection({ showForm, setShowForm, onSelectPost }: { showForm: boolean; setShowForm: (v: boolean) => void; onSelectPost: (post: any) => void }) {
//   const { addPost } = useData();
//   const { user } = useAuth();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
//   const [posts, setPosts] = useState(staticKnowledgePosts);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !content || !user) return;
//     const newPost = {
//       id: Date.now().toString(),
//       title,
//       content,
//       author: user.name,
//       tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
//       points: 10,
//       createdAt: new Date().toISOString(),
//       status: "approved" as const,
//     };
//     setPosts([newPost, ...posts]);
//     addPost(newPost);
//     setTitle("");
//     setContent("");
//     setTags("");
//     setShowForm(false);
//   };

//   const filteredPosts = posts
//     .filter(post => 
//       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//     )
//     .sort((a, b) => {
//       if (sortOrder === "latest") {
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       } else {
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       }
//     });

//   return (
//     <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
//       <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
//         <h2 className="text-2xl font-semibold text-foreground">🧠 Insight Vault</h2>
//         <div className="flex gap-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search insights..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="rounded-lg bg-input px-4 py-2.5 pl-10 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
//             />
//             <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
//           </div>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
//             className="rounded-lg bg-input px-4 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//           >
//             <option value="latest">Latest </option>
//             <option value="oldest">Oldest </option>
//           </select>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowForm(!showForm)}
//             className="rounded-lg bg-primary/20 px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-primary/30"
//           >
//             {showForm ? "Cancel" : "➕ Share Knowledge"}
//           </motion.button>
//         </div>
//       </div>

//       <AnimatePresence>
//         {showForm && (
//           <motion.form
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             onSubmit={handleSubmit}
//             className="glass-card mb-8 space-y-5 overflow-hidden p-8"
//           >
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Title"
//               className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//               required
//             />
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="What knowledge do you want to share today?"
//               rows={5}
//               className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
//               required
//             />
//             <input
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               placeholder="Tags (comma separated)"
//               className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//             />
//             <motion.button
//               type="submit"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground"
//             >
//               Submit (+10 points)
//             </motion.button>
//           </motion.form>
//         )}
//       </AnimatePresence>

//       <div className="grid gap-6 md:grid-cols-2">
//         {filteredPosts.map((post, i) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             whileHover={{ scale: 1.02, y: -2 }}
//             onClick={() => onSelectPost(post)}
//             className="glass-card p-6 cursor-pointer"
//           >
//             <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
//             <p className="mt-3 text-base text-muted-foreground line-clamp-3">{post.content}</p>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {post.tags.map((tag) => (
//                 <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{tag}</span>
//               ))}
//             </div>
//             <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
//               <span>by {post.author}</span>
//               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// function BugsSection({
//   showForm,
//   setShowForm,
//   onSelectBug,
// }: {
//   showForm: boolean;
//   setShowForm: (v: boolean) => void;
//   onSelectBug: (bug: BugReport) => void;
// }) {
//   const { addBug } = useData();
//   const { user } = useAuth();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [buggyCode, setBuggyCode] = useState("");
//   const [solution, setSolution] = useState("");
//   const [lesson, setLesson] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
//   const [bugs, setBugs] = useState(staticBugs);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !buggyCode || !solution || !user) return;
//     const newBug = {
//       id: Date.now().toString(),
//       title,
//       description,
//       buggyCode,
//       solution,
//       lessonLearned: lesson,
//       author: user.name,
//       authorId: user.id,
//       createdAt: new Date().toISOString(),
//       status: "approved" as const,
//     };
//     setBugs([newBug, ...bugs]);
//     addBug(newBug);
//     setTitle(""); setDescription(""); setBuggyCode(""); setSolution(""); setLesson("");
//     setShowForm(false);
//   };

//   const filteredBugs = bugs
//     .filter(bug => 
//       bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       bug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       bug.lessonLearned.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortOrder === "latest") {
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       } else {
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       }
//     });

//   return (
//     <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
//       <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
//         <h2 className="text-2xl font-semibold text-foreground">🐞 Bug & Resolution Hub</h2>
//         <div className="flex gap-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="🔍 Search bugs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="rounded-lg bg-input px-4 py-2.5 pl-10 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
//             />
//             <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
//           </div>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
//             className="rounded-lg bg-input px-4 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//           >
//             <option value="latest">Latest </option>
//             <option value="oldest">Oldest </option>
//           </select>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowForm(!showForm)}
//             className="rounded-lg bg-secondary/20 px-6 py-3 text-base font-medium text-secondary transition-colors hover:bg-secondary/30"
//           >
//             {showForm ? "Cancel" : "➕ Report Bug Fix"}
//           </motion.button>
//         </div>
//       </div>

//       <AnimatePresence>
//         {showForm && (
//           <motion.form
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             onSubmit={handleSubmit}
//             className="glass-card mb-8 overflow-hidden p-8"
//           >
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-5">
//                 <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bug title" className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
//                 <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Bug description" rows={3} className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
//                 <textarea value={buggyCode} onChange={(e) => setBuggyCode(e.target.value)} placeholder="Paste buggy code here..." rows={6} className="w-full rounded-lg bg-input px-5 py-3.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
//               </div>
//               <div className="space-y-5">
//                 <textarea value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Solution code / explanation" rows={6} className="w-full rounded-lg bg-input px-5 py-3.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
//                 <textarea value={lesson} onChange={(e) => setLesson(e.target.value)} placeholder="Lesson learned" rows={4} className="w-full rounded-lg bg-input px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
//               </div>
//             </div>
//             <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6 rounded-lg bg-secondary px-8 py-3.5 text-base font-semibold text-secondary-foreground">
//               Submit Bug Fix
//             </motion.button>
//           </motion.form>
//         )}
//       </AnimatePresence>

//       <div className="grid gap-6 md:grid-cols-2">
//         {filteredBugs.map((bug, i) => (
//           <motion.div
//             key={bug.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             whileHover={{ scale: 1.02, y: -2 }}
//             onClick={() => onSelectBug(bug as BugReport)}
//             className="glass-card cursor-pointer p-6"
//           >
//             <h3 className="text-xl font-semibold text-foreground">{bug.title}</h3>
//             <pre className="mt-3 max-h-32 overflow-hidden rounded-lg bg-surface p-4 text-sm font-mono text-neon-cyan">{bug.buggyCode}</pre>
//             <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{bug.lessonLearned}</p>
//             <p className="mt-3 text-xs text-muted-foreground">{new Date(bug.createdAt).toLocaleDateString()}</p>
//             <p className="mt-2 text-sm text-muted-foreground">Click to view full details →</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// function InterviewsSection({ onSelectInterview }: { onSelectInterview: (interview: any) => void }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
//   const [interviews, setInterviews] = useState(staticInterviews);
//   const [playing, setPlaying] = useState<string | null>(null);

//   const filteredInterviews = interviews
//     .filter(interview => 
//       interview.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       interview.summary.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortOrder === "latest") {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       } else {
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       }
//     });

//   return (
//     <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
//       <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
//         <h2 className="text-2xl font-semibold text-foreground">🎥 Exit Insights Archive</h2>
//         <div className="flex gap-3">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="🔍 Search interviews..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="rounded-lg bg-input px-4 py-2.5 pl-10 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
//             />
//             <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
//           </div>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
//             className="rounded-lg bg-input px-4 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//           >
//             <option value="latest">Latest </option>
//             <option value="oldest">Oldest </option>
//           </select>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredInterviews.map((interview, i) => (
//           <motion.div
//             key={interview.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             whileHover={{ scale: 1.02, y: -2 }}
//             className="glass-card overflow-hidden cursor-pointer"
//             onClick={() => onSelectInterview(interview)}
//           >
//             {playing === interview.id ? (
//               <div className="aspect-video">
//                 <iframe
//                   src={interview.videoUrl + "?autoplay=1"}
//                   title={interview.employeeName}
//                   className="h-full w-full"
//                   allow="autoplay; encrypted-media"
//                   allowFullScreen
//                 />
//               </div>
//             ) : (
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setPlaying(interview.id);
//                 }}
//                 className="flex aspect-video cursor-pointer items-center justify-center bg-surface/50"
//               >
//                 <motion.span whileHover={{ scale: 1.2 }} className="text-5xl">▶️</motion.span>
//               </div>
//             )}
//             <div className="p-6">
//               <h3 className="text-xl font-semibold text-foreground">{interview.employeeName}</h3>
//               <p className="text-sm text-primary mt-1">{interview.role}</p>
//               <p className="mt-3 text-base text-muted-foreground line-clamp-2">{interview.summary}</p>
//               <p className="mt-3 text-sm text-muted-foreground">{interview.date}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }
