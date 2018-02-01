export interface Socket {
    on(event: string, callback: (data: any) => void);
    emit(event: string, data: any);
}

export interface QuestionRequest {
    sessionId: string;
    question: Question;
}

export interface Question {
    upvotes: number;
    _id?: string;
    questionText: string;
    sessionId: string;
}

export interface SessionMetadata {
    title: string;
    description: string;
    ownerUid: string;
    id: string;
}