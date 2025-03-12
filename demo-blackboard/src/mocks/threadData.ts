import { VerificationStatus, VoteType } from "../pages/DiscussionThread/DiscussionThread";

export interface ThreadData {
  id: number;
  title: string;
  author: string;
  question: string;
  response?: string;
  verificationStatus?: VerificationStatus;
  thumbsUpCount: number;
  thumbsDownCount: number;
  userVote?: VoteType;
  postTimestamp: string;
  responseTimestamp?: string;
  replies: number;
  lastUpdated: string;
}

export const mockThreads: ThreadData[] = [
  {
    id: 1,
    title: "Coursework",
    author: "Student",
    question: "Hi, I was just wondering when the coursework will be released? Thanks in advance!",
    response: "According to the course syllabus, the coursework will be released in Week 4 (next Monday). It will be worth 30% of your final grade and you'll have 3 weeks to complete it.",
    verificationStatus: 'correct',
    thumbsUpCount: 5,
    thumbsDownCount: 0,
    userVote: 'up',
    postTimestamp: "Today at 14:00",
    responseTimestamp: "Today at 14:30",
    replies: 5,
    lastUpdated: "Today at 14:30"
  },
  {
    id: 2,
    title: "Exam Format",
    author: "Student",
    question: "Does anyone know what format the exam will take this year? Will it be similar to previous years?",
    response: "The exam will follow the same format as last year: 2 hours, 3 sections (multiple choice, short answer, and essay). There will be questions on all topics covered in weeks 1-10.",
    verificationStatus: 'incorrect',
    thumbsUpCount: 7,
    thumbsDownCount: 13,
    userVote: 'down',
    postTimestamp: "4 days ago",
    responseTimestamp: "3 days ago",
    replies: 20,
    lastUpdated: "3 days ago"
  },
  {
    id: 3,
    title: "Group Project Clarification",
    author: "Student",
    question: "For the group project, are we expected to implement all features mentioned in the spec or can we focus on a subset?",
    thumbsUpCount: 0,
    thumbsDownCount: 0,
    postTimestamp: "1 week ago",
    replies: 15,
    lastUpdated: "1 week ago"
  }
];
