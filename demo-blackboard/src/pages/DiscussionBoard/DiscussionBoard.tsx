import React from 'react';
import { Link } from 'react-router-dom';
import "./DiscussionBoard.css";
import { useCourseUnit } from "../../contexts/useCourseUnit";
import { mockThreads } from '../../mocks/threadData';
import Banner from "../../components/Banner/Banner";
import Sidebar from "../../components/Sidebar/Sidebar";

const DiscussionBoard: React.FC = () => {
    const { courseUnit } = useCourseUnit();
    
    return (
        <div className="container">
            {/* Banner */}
            <Banner pageName="Discussion Board" />

            <div className="main">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content - Thread List */}
                <div className="content">
                    <div className="board-title">Discussion Board: {courseUnit || "COMP34812"}</div>
                    <div className="thread-controls">
                        <button className="new-thread-btn">Create New Thread</button>
                        <div className="thread-filter">
                            <span>Filter: </span>
                            <select>
                                <option>All Threads</option>
                                <option>My Threads</option>
                                <option>Unread</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="thread-list">
                        <div className="thread-header">
                            <span className="thread-title-header">Thread Title</span>
                            <span className="thread-author-header">Started By</span>
                            <span className="thread-replies-header">Replies</span>
                            <span className="thread-date-header">Last Updated</span>
                        </div>
                        
                        {mockThreads.map(thread => (
                            <div className="thread-item" key={thread.id}>
                                <Link to={`/discussion-thread/${thread.id}`} className="thread-title-link">
                                    {thread.title}
                                </Link>
                                <span className="thread-author">{thread.author}</span>
                                <span className="thread-replies">{thread.replies}</span>
                                <span className="thread-date">{thread.lastUpdated}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscussionBoard;