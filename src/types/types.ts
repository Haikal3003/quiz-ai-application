export interface GameProps {
  game: {
    id: string;

    userId: string;

    timeStarted: string | Date;

    topic: string;

    timeEnded?: Date | null;

    gameType: string;

    questions: {
      id: string;

      question: string;

      options: string[];

      answer: string;
    }[];
  };
}

export interface GameResultProps {
  game: {
    id: string;
    userId: string;
    timeStarted: string | Date;
    topic: string;
    timeEnded?: Date | null;
    gameType: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      answer: string;
      gameId: string;
      isCorrect: boolean;
      questionType: string;
      userAnswer: string | null;
    }[];
  };
}

export interface GamesProps {
  games: {
    id: string;
    userId: string;
    timeStarted: string | Date;
    topic: string;
    timeEnded?: Date | null;
    gameType: string;
  }[];
}
