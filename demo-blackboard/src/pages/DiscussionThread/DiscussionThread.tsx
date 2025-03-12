import { useState } from "react";
import "./DiscussionThread.css";
import { askLangflowQuestion } from "../../api/langflow";
import defaultProfile from "../../assets/default-profile-avatar.jpg";
import companionProfile from "../../assets/companion-pfp.jpg";
import { useCourseUnit } from "../../contexts/useCourseUnit";
import Banner from "../../components/Banner/Banner";
import Sidebar from "../../components/Sidebar/Sidebar";

export type VerificationStatus = 'unverified' | 'correct' | 'incorrect';
export type VoteType = null | 'up' | 'down';

interface DiscussionThreadProps {
  initialQuestion?: string;
  initialResponse?: string;
  initialVerificationStatus?: VerificationStatus;
  initialThumbsUpCount?: number;
  initialThumbsDownCount?: number;
  initialUserVote?: VoteType;
  threadTitle?: string;
  postTimestamp?: string;
  responseTimestamp?: string;
}

function DiscussionThread({
  initialQuestion = "Hi, I was just wondering when the coursework will be released? Thanks in advance!",
  initialResponse = "",
  initialVerificationStatus = 'unverified',
  initialThumbsUpCount = 0,
  initialThumbsDownCount = 0,
  initialUserVote = null,
  threadTitle = "Coursework",
  postTimestamp = "3 minutes ago",
  responseTimestamp = "Just now",
}: DiscussionThreadProps) {
  const { courseUnit } = useCourseUnit();
  const [question, setQuestion] = useState(initialQuestion);
  const [aiResponse, setAiResponse] = useState(initialResponse);
  const [statusMessage, setStatusMessage] = useState("");
  const [thumbsUpCount, setThumbsUpCount] = useState(initialThumbsUpCount);
  const [thumbsDownCount, setThumbsDownCount] = useState(initialThumbsDownCount);
  const [userVote, setUserVote] = useState<VoteType>(initialUserVote);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(initialVerificationStatus);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setStatusMessage("Please enter a question.");
      return;
    }

    setStatusMessage("Thinking...");
    setAiResponse("");
    setVerificationStatus('unverified');

    try {
      const response = await askLangflowQuestion(question, courseUnit);
      setAiResponse(response);
      setStatusMessage("");
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const handleThumbsUp = () => {
    if (userVote === 'up') {
      setThumbsUpCount(thumbsUpCount - 1);
      setUserVote(null);
    } else {
      if (userVote === 'down') {
        setThumbsDownCount(thumbsDownCount - 1);
      }
      setThumbsUpCount(thumbsUpCount + 1);
      setUserVote('up');
    }
  };

  const handleThumbsDown = () => {
    if (userVote === 'down') {
      setThumbsDownCount(thumbsDownCount - 1);
      setUserVote(null);
    } else {
      if (userVote === 'up') {
        setThumbsUpCount(thumbsUpCount - 1);
      }
      setThumbsDownCount(thumbsDownCount + 1);
      setUserVote('down');
    }
  };

  const markAsIncorrect = () => {
    setVerificationStatus('incorrect');
  };

  const markAsCorrect = () => {
    setVerificationStatus('correct');
  };

  return (
    <div className="container">
      {/* Banner */}
      <Banner pageName="Discussion Board" subPath={`Thread: ${threadTitle}`} />

      <div className="main">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="content">
          <div className="thread-title">Thread: {threadTitle}</div>
          <div>
            {/* Student Post with Input */}
            <div className="post">
              <img
                src={defaultProfile}
                alt="Profile"
              />
              <div className="post-content">
                <div><strong>Student</strong></div>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="post-input"
                />
              </div>
              <div className="post-time">{postTimestamp}</div>
            </div>

            {/* Button Action */}
            <div className="button-container">
              <button className="ask-button" onClick={handleAskQuestion}>Ask</button>
            </div>

            {/* AI Study Companion Response */}
            {(aiResponse || initialResponse || statusMessage) && (
              <div className="post">
                <img
                  src={companionProfile}
                  alt="Profile"
                />
                <div className="post-content">
                  {verificationStatus === 'unverified' && (
                    <div className="action-buttons">
                      <button className="action-button red" onClick={markAsIncorrect}>❌</button>
                      <button className="action-button green" onClick={markAsCorrect}>✅</button>
                    </div>
                  )}
                  
                  {verificationStatus === 'correct' && (
                    <div className="verification-status correct">
                      <span className="verified-icon">✅</span>
                      <span>Verified answer</span>
                    </div>
                  )}
                  
                  <div><strong>AI Study Companion</strong></div>
                  {statusMessage ? (
                    <div className="status-message">{statusMessage}</div>
                  ) : (
                    <div>
                      {verificationStatus === 'incorrect' ? (
                        <div className="incorrect-answer">[INCORRECT ANSWER]</div>
                      ) : (
                        aiResponse || initialResponse
                      )}
                    </div>
                  )}
                  {/* Thumbs Up and Down Buttons */}
                  <div className="feedback-buttons">
                    <button 
                      className="thumbs-up" 
                      onClick={handleThumbsUp}
                      style={{color: userVote === 'up' ? '#007bff' : 'inherit'}}
                    >
                      👍 {thumbsUpCount}
                    </button>
                    <button 
                      className="thumbs-down" 
                      onClick={handleThumbsDown}
                      style={{color: userVote === 'down' ? '#dc3545' : 'inherit'}}
                    >
                      👎 {thumbsDownCount}
                    </button>
                  </div>
                </div>
                <div className="post-time">{responseTimestamp}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionThread;
