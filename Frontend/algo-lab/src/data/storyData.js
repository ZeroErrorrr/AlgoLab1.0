const storyData = [
  {
    id: "spam",
    title: "📬 The Spam Detective",
    topic: "Spam Email Detection",
    concept: "Classification",
    algorithm: "Logistic Regression",
    difficulty: "Easy",
    xp: 100,

    scenario:
      "Emma has just joined MailSecure Inc. Every day, millions of emails flood into users' inboxes. Some contain useful information, while others are dangerous scams trying to steal passwords or money. Your mission is to train an AI that can separate spam from genuine emails.",

    takeaway:
      "Logistic Regression predicts the probability that an email belongs to a particular class, such as Spam or Not Spam.",

    slides: [
      {
        visual: "📬",
        text: "Welcome to MailSecure Inc. Emma's first task is cleaning millions of incoming emails."
      },
      {
        visual: "😵",
        text: "Reading every email manually is impossible. People would waste hours every day."
      },
      {
        visual: "🧠",
        text: "The AI studies thousands of previously labeled emails and starts recognizing patterns."
      },
      {
        visual: "📊",
        text: "Words like 'FREE', 'WINNER', or 'URGENT' increase the probability of an email being spam."
      },
      {
        visual: "✅",
        text: "The AI now filters spam automatically and protects millions of users."
      }
    ]
  },

  {
    id: "netflix",
    title: "🎬 The Netflix Oracle",
    topic: "Movie Recommendation",
    concept: "Similarity",
    algorithm: "KNN",
    difficulty: "Easy",
    xp: 120,

    scenario:
      "You are part of Netflix's recommendation team. Millions of movies are available, but users expect the perfect suggestion every time they finish watching.",

    takeaway:
      "K-Nearest Neighbors recommends content by finding users with similar preferences.",

    slides: [
      {
        visual: "🍿",
        text: "Sarah watches three thriller movies in one weekend."
      },
      {
        visual: "👥",
        text: "Netflix searches for thousands of users with similar viewing habits."
      },
      {
        visual: "⭐",
        text: "Most similar users loved 'Sherlock'. The AI recommends it instantly."
      },
      {
        visual: "💡",
        text: "KNN doesn't guess randomly. It learns from neighbors with similar behavior."
      },
      {
        visual: "🎉",
        text: "Sarah discovers her new favorite series thanks to AI recommendations."
      }
    ]
  },

  {
    id: "fraud",
    title: "💳 The Fraud Catcher",
    topic: "Credit Card Fraud Detection",
    concept: "Pattern Recognition",
    algorithm: "Neural Network",
    difficulty: "Medium",
    xp: 180,

    scenario:
      "A global bank processes over one million transactions every hour. Hidden among them are fraudulent payments. Your AI must detect suspicious activity before criminals can steal money.",

    takeaway:
      "Neural Networks recognize complex hidden patterns that traditional rules often miss.",

    slides: [
      {
        visual: "💳",
        text: "Every credit card swipe creates valuable data."
      },
      {
        visual: "🌎",
        text: "A customer shops in Mumbai, but five minutes later another purchase appears from London."
      },
      {
        visual: "⚠️",
        text: "The Neural Network compares this behavior with millions of past fraud cases."
      },
      {
        visual: "🚨",
        text: "The transaction is flagged before the payment is approved."
      },
      {
        visual: "🏦",
        text: "The customer's money stays safe because the AI recognized hidden fraud patterns."
      }
    ]
  },

  {
    id: "cancer",
    title: "🩺 The Cancer Scanner",
    topic: "Medical Diagnosis",
    concept: "Decision Making",
    algorithm: "Decision Tree",
    difficulty: "Medium",
    xp: 200,

    scenario:
      "Doctors must quickly determine whether a tumor is benign or malignant. Every decision can save a life. Your AI assistant helps doctors make faster and more consistent diagnoses.",

    takeaway:
      "Decision Trees solve problems by asking a sequence of simple Yes/No questions.",

    slides: [
      {
        visual: "🏥",
        text: "A patient arrives with a suspicious tumor."
      },
      {
        visual: "🔬",
        text: "Doctors collect measurements like size, shape, and texture."
      },
      {
        visual: "🌳",
        text: "The Decision Tree asks questions such as 'Is the radius greater than 15?'"
      },
      {
        visual: "🩺",
        text: "Each answer follows a different branch until a diagnosis is reached."
      },
      {
        visual: "❤️",
        text: "The doctor receives AI-assisted predictions to support life-saving decisions."
      }
    ]
  }
];

export default storyData;