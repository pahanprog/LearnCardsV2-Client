export type DeckPreviewContextType = {
  decks: DeckPreview[];
  setDecks: Function;
};

export type DeckPreview = {
  id: number;
  title: string;
  description: string;
  isLearner: boolean;
};
