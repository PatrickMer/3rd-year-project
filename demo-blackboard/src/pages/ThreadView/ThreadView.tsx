import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DiscussionThread from '../DiscussionThread/DiscussionThread';
import { mockThreads } from '../../mocks/threadData';

const ThreadView: React.FC = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const id = parseInt(threadId || '0');
    
    // Find the thread data
    const threadData = mockThreads.find(thread => thread.id === id);
    
    if (!threadData) {
        // If thread not found, redirect to discussion board
        return <Navigate to="/discussion-board" />;
    }
    
    return (
        <DiscussionThread
            initialQuestion={threadData.question}
            initialResponse={threadData.response}
            initialVerificationStatus={threadData.verificationStatus}
            initialThumbsUpCount={threadData.thumbsUpCount}
            initialThumbsDownCount={threadData.thumbsDownCount}
            initialUserVote={threadData.userVote}
            threadTitle={threadData.title}
            postTimestamp={threadData.postTimestamp}
            responseTimestamp={threadData.responseTimestamp}
        />
    );
};

export default ThreadView;
