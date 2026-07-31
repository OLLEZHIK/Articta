"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

export interface CommentReply {
  id: string;
  author: string;
  avatarBg: string;
  date: string;
  text: string;
  likes: number;
  userLiked?: boolean;
}

export interface CommentItem {
  id: string;
  author: string;
  avatarBg: string;
  date: string;
  text: string;
  likes: number;
  userLiked?: boolean;
  replies?: CommentReply[];
}

const INITIAL_COMMENTS: Record<string, CommentItem[]> = {
  ru: [
    {
      id: "c1",
      author: "Мартин К.",
      avatarBg: "#2563eb",
      date: "2 дня назад",
      text: "Отличный разбор ROI! Особая благодарность за отдельную строчку с налогом на аренду (19%) от чистого дохода. Теперь видно, почему коммунальные вычитаются из базы.",
      likes: 12,
      replies: [
        {
          id: "r1",
          author: "Автор Articta",
          avatarBg: "#3b82f6",
          date: "1 день назад",
          text: "Рады, что финансовая модель оказалась полезной! Именно учет всех мелких невозвратных расходов дает объективную картину окупаемости.",
          likes: 5,
        },
      ],
    },
    {
      id: "c2",
      author: "Елена В.",
      avatarBg: "#10b981",
      date: "Вчера",
      text: "Очень удобная функция сравнения с авторскими параметрами! Быстро сориентировалась по реальному ремонту в Братиславе.",
      likes: 8,
      replies: [],
    },
  ],
  sk: [
    {
      id: "c1",
      author: "Martin K.",
      avatarBg: "#2563eb",
      date: "pred 2 dňami",
      text: "Skvelá analýza ROI! Osobitná vďaka za samostatný riadok pre daň z prenájmu (19%). Je jasné, prečo sa energie odpočítavajú z základu.",
      likes: 12,
      replies: [
        {
          id: "r1",
          author: "Autor Articta",
          avatarBg: "#3b82f6",
          date: "pred 1 dňom",
          text: "Sme radi, že finančný model bol užitočný! Práve zohľadnenie všetkých drobných výdavkov poskytuje objektívny obraz návratnosti.",
          likes: 5,
        },
      ],
    },
    {
      id: "c2",
      author: "Elena V.",
      avatarBg: "#10b981",
      date: "Včera",
      text: "Veľmi užitočná funkcia porovnania s autorskými parametrami! Rýchlo som sa zorientovala v reálnych nákladoch na rekonštrukciu.",
      likes: 8,
      replies: [],
    },
  ],
  en: [
    {
      id: "c1",
      author: "Martin K.",
      avatarBg: "#2563eb",
      date: "2 days ago",
      text: "Outstanding ROI analysis! Special thanks for itemizing the 19% rental income tax separately. Makes it crystal clear why utilities are deducted.",
      likes: 12,
      replies: [
        {
          id: "r1",
          author: "Articta Author",
          avatarBg: "#3b82f6",
          date: "1 day ago",
          text: "Glad the financial model helped! Accounting for all hidden unrecoverable costs is key to accurate ROI forecasting.",
          likes: 5,
        },
      ],
    },
    {
      id: "c2",
      author: "Elena V.",
      avatarBg: "#10b981",
      date: "Yesterday",
      text: "Love the hold-to-compare feature against author's defaults! Made it so easy to stress-test renovation budgets in Bratislava.",
      likes: 8,
      replies: [],
    },
  ],
};

export function ArticleFeedback({ articleSlug = "bratislava" }: { articleSlug?: string }) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Reaction State
  const [likesCount, setLikesCount] = useState(48);
  const [dislikesCount, setDislikesCount] = useState(3);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);

  // Comments State
  const [comments, setComments] = useState<CommentItem[]>(() => INITIAL_COMMENTS.ru);
  const [newCommentText, setNewCommentText] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("");

  // Reply State
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyAuthorName, setReplyAuthorName] = useState("");

  // Load reaction & comments from localStorage
  useEffect(() => {
    try {
      const savedReaction = localStorage.getItem(`articta_reaction_${articleSlug}`);
      if (savedReaction === "like" || savedReaction === "dislike") {
        setUserReaction(savedReaction);
      }

      const savedComments = localStorage.getItem(`articta_comments_${articleSlug}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments(INITIAL_COMMENTS[language] || INITIAL_COMMENTS.ru);
      }
    } catch {
      // Fallback
    }
  }, [articleSlug, language]);

  const handleReaction = (type: "like" | "dislike") => {
    if (userReaction === type) {
      setUserReaction(null);
      if (type === "like") setLikesCount((prev) => prev - 1);
      else setDislikesCount((prev) => prev - 1);
      localStorage.removeItem(`articta_reaction_${articleSlug}`);
    } else {
      if (userReaction === "like") setLikesCount((prev) => prev - 1);
      if (userReaction === "dislike") setDislikesCount((prev) => prev - 1);

      if (type === "like") setLikesCount((prev) => prev + 1);
      if (type === "dislike") setDislikesCount((prev) => prev + 1);

      setUserReaction(type);
      localStorage.setItem(`articta_reaction_${articleSlug}`, type);
    }
  };

  const getRandomColor = () => {
    const colors = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const item: CommentItem = {
      id: `c_${Date.now()}`,
      author: newAuthorName.trim() || (language === "sk" ? "Čitateľ" : language === "en" ? "Reader" : "Читатель"),
      avatarBg: getRandomColor(),
      date: language === "sk" ? "Práve teraz" : language === "en" ? "Just now" : "Только что",
      text: newCommentText.trim(),
      likes: 0,
      replies: [],
    };

    const updated = [item, ...comments];
    setComments(updated);
    setNewCommentText("");
    setNewAuthorName("");
    saveComments(updated);
  };

  const handleAddReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: CommentReply = {
      id: `r_${Date.now()}`,
      author: replyAuthorName.trim() || (language === "sk" ? "Čitateľ" : language === "en" ? "Reader" : "Читатель"),
      avatarBg: getRandomColor(),
      date: language === "sk" ? "Práve teraz" : language === "en" ? "Just now" : "Только что",
      text: replyText.trim(),
      likes: 0,
    };

    const updated = comments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
        };
      }
      return c;
    });

    setComments(updated);
    setReplyingToId(null);
    setReplyText("");
    setReplyAuthorName("");
    saveComments(updated);
  };

  const handleLikeComment = (commentId: string, replyId?: string) => {
    const updated = comments.map((c) => {
      if (replyId && c.id === commentId) {
        return {
          ...c,
          replies: (c.replies || []).map((r) => {
            if (r.id === replyId) {
              const userLiked = !r.userLiked;
              return { ...r, likes: userLiked ? r.likes + 1 : r.likes - 1, userLiked };
            }
            return r;
          }),
        };
      }
      if (!replyId && c.id === commentId) {
        const userLiked = !c.userLiked;
        return { ...c, likes: userLiked ? c.likes + 1 : c.likes - 1, userLiked };
      }
      return c;
    });

    setComments(updated);
    saveComments(updated);
  };

  const saveComments = (data: CommentItem[]) => {
    try {
      localStorage.setItem(`articta_comments_${articleSlug}`, JSON.stringify(data));
    } catch {
      // Ignore
    }
  };

  const totalCommentCount = comments.reduce(
    (acc, c) => acc + 1 + (c.replies ? c.replies.length : 0),
    0
  );

  return (
    <div className="article-feedback-section">
      {/* Minimalist Bottom Bar: Left Comment Counter & Right Like/Dislike Icons */}
      <div className="article-bottom-bar">
        <div className="bottom-bar-left">
          <span className="bottom-bar-title">{t.commentsTitle}</span>
          <span className="comments-badge">{totalCommentCount}</span>
        </div>

        {/* Bottom Right Like/Dislike Icon Buttons */}
        <div className="bottom-bar-reactions">
          <button
            type="button"
            onClick={() => handleReaction("like")}
            className={`reaction-icon-btn like ${userReaction === "like" ? "active" : ""}`}
            title={t.like}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <span className="reaction-count">{likesCount}</span>
          </button>

          <button
            type="button"
            onClick={() => handleReaction("dislike")}
            className={`reaction-icon-btn dislike ${userReaction === "dislike" ? "active" : ""}`}
            title={t.dislike}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
            </svg>
            <span className="reaction-count">{dislikesCount}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        {/* Comment Input Form */}
        <form onSubmit={handleAddComment} className="comment-form">
          <input
            type="text"
            value={newAuthorName}
            onChange={(e) => setNewAuthorName(e.target.value)}
            placeholder={t.authorNamePlaceholder}
            className="comment-author-input"
          />
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={t.addCommentPlaceholder}
            rows={3}
            className="comment-textarea"
            required
          />
          <div className="comment-form-actions">
            <button type="submit" className="comment-submit-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>{t.postComment}</span>
            </button>
          </div>
        </form>

        {/* Comment List */}
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">{t.noCommentsYet}</p>
          ) : (
            comments.map((item) => (
              <div key={item.id} className="comment-card-wrapper">
                {/* Main Comment */}
                <div className="comment-card">
                  <div className="comment-avatar" style={{ backgroundColor: item.avatarBg }}>
                    {item.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="comment-content">
                    <div className="comment-meta">
                      <span className="comment-author">{item.author}</span>
                      <span className="comment-date">{item.date}</span>
                    </div>
                    <p className="comment-text">{item.text}</p>
                    <div className="comment-actions">
                      <button
                        type="button"
                        onClick={() => handleLikeComment(item.id)}
                        className={`comment-like-btn ${item.userLiked ? "active" : ""}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        <span>{item.likes > 0 ? item.likes : ""}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setReplyingToId(replyingToId === item.id ? null : item.id);
                          setReplyText("");
                          setReplyAuthorName("");
                        }}
                        className="comment-reply-btn"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 17 4 12 9 7"></polyline>
                          <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                        </svg>
                        <span>{t.reply}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inline Reply Form */}
                {replyingToId === item.id && (
                  <form
                    onSubmit={(e) => handleAddReply(e, item.id)}
                    className="reply-form"
                  >
                    <input
                      type="text"
                      value={replyAuthorName}
                      onChange={(e) => setReplyAuthorName(e.target.value)}
                      placeholder={t.authorNamePlaceholder}
                      className="comment-author-input"
                    />
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`${t.reply} @${item.author}...`}
                      rows={2}
                      className="comment-textarea"
                      required
                      autoFocus
                    />
                    <div className="comment-form-actions">
                      <button
                        type="button"
                        onClick={() => setReplyingToId(null)}
                        className="reply-cancel-btn"
                      >
                        {language === "sk" ? "Zrušiť" : language === "en" ? "Cancel" : "Отмена"}
                      </button>
                      <button type="submit" className="comment-submit-btn">
                        <span>{t.postComment}</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Nested Replies List */}
                {item.replies && item.replies.length > 0 && (
                  <div className="replies-list">
                    {item.replies.map((reply) => (
                      <div key={reply.id} className="comment-card reply-card">
                        <div className="comment-avatar reply-avatar" style={{ backgroundColor: reply.avatarBg }}>
                          {reply.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="comment-content">
                          <div className="comment-meta">
                            <span className="comment-author">{reply.author}</span>
                            <span className="comment-date">{reply.date}</span>
                          </div>
                          <p className="comment-text">{reply.text}</p>
                          <div className="comment-actions">
                            <button
                              type="button"
                              onClick={() => handleLikeComment(item.id, reply.id)}
                              className={`comment-like-btn ${reply.userLiked ? "active" : ""}`}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                              </svg>
                              <span>{reply.likes > 0 ? reply.likes : ""}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
