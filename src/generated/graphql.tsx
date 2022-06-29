import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  order: Scalars['Float'];
  question: Scalars['String'];
  answer: Scalars['String'];
  stats: Array<CardStats>;
};

export type CardInput = {
  id: Scalars['Float'];
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type CardInputWithId = {
  question: Scalars['String'];
  answer: Scalars['String'];
  order: Scalars['Float'];
  id?: Maybe<Scalars['Float']>;
};

export type CardStats = {
  __typename?: 'CardStats';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  difficulty: Scalars['Float'];
  daysBetweenReviews: Scalars['Float'];
  dateLastReviewed: Scalars['DateTime'];
  lastPerformanceRating: Scalars['Float'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  errors?: Maybe<Array<FieldError>>;
  changed?: Maybe<Scalars['Boolean']>;
};


export type Deck = {
  __typename?: 'Deck';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  cards: Array<Card>;
  sessions: Array<Session>;
  creator: User;
  learners: Array<User>;
  canEdit: Scalars['Boolean'];
  isLearner: Scalars['Boolean'];
};

export type DeckInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDeck?: Maybe<Deck>;
  updateDeckInfo?: Maybe<Deck>;
  updateDeckCards?: Maybe<Deck>;
  deleteDeck: Scalars['Boolean'];
  startLearning?: Maybe<Deck>;
  forgotPassword: Scalars['Boolean'];
  changePassword: ChangePasswordResponse;
  logout: Scalars['Boolean'];
  updateCard?: Maybe<Card>;
  calculateStats?: Maybe<CardStats>;
  startLearningSession?: Maybe<Session>;
};


export type MutationCreateDeckArgs = {
  input: DeckInput;
};


export type MutationUpdateDeckInfoArgs = {
  input: DeckInput;
  id: Scalars['Float'];
};


export type MutationUpdateDeckCardsArgs = {
  del?: Maybe<Array<CardInputWithId>>;
  update: Array<CardInputWithId>;
  deckId: Scalars['Float'];
};


export type MutationDeleteDeckArgs = {
  isLearner: Scalars['Boolean'];
  id: Scalars['Float'];
};


export type MutationStartLearningArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateCardArgs = {
  input: CardInput;
};


export type MutationCalculateStatsArgs = {
  id: Scalars['Float'];
  sessionId: Scalars['Float'];
  performanceRating: Scalars['Float'];
};


export type MutationStartLearningSessionArgs = {
  deckId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  decks?: Maybe<Array<Deck>>;
  deck?: Maybe<Deck>;
  deckSearch?: Maybe<Array<Deck>>;
  discover?: Maybe<Array<Deck>>;
  me?: Maybe<User>;
  getStats?: Maybe<StatsResponse>;
  getCardFromSession?: Maybe<Card>;
};


export type QueryDeckArgs = {
  deckId: Scalars['Float'];
};


export type QueryDeckSearchArgs = {
  title: Scalars['String'];
};


export type QueryGetCardFromSessionArgs = {
  cardId: Scalars['Float'];
  sessionId: Scalars['Float'];
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  finishedCards: Scalars['Float'];
  deck: Deck;
  cards: Array<Card>;
  cardsNumber: Scalars['Float'];
};

export type StatsResponse = {
  __typename?: 'StatsResponse';
  overallCards: Scalars['Float'];
  learnedCards: Scalars['Float'];
  createdDecks: Scalars['Float'];
  studentsInCreatedDecks: Scalars['Float'];
  overallLearnedPercent: Scalars['Float'];
  learnedPercent: Scalars['Float'];
  createdDecksArray: Array<Deck>;
  learningDecksArray: Array<Deck>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  deckStats: UserDeckStats;
};

export type UserDeckStats = {
  __typename?: 'UserDeckStats';
  unique: Scalars['Float'];
  overall: Scalars['Float'];
  percent: Scalars['Float'];
};

export type CalculateStatsMutationVariables = Exact<{
  cardId: Scalars['Float'];
  performanceRating: Scalars['Float'];
  sessionId: Scalars['Float'];
}>;


export type CalculateStatsMutation = { __typename?: 'Mutation', calculateStats?: Maybe<{ __typename?: 'CardStats', id: number, lastPerformanceRating: number }> };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', changed?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type CreateDeckMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateDeckMutation = { __typename?: 'Mutation', createDeck?: Maybe<{ __typename?: 'Deck', id: number, title: string, description: string, isLearner: boolean }> };

export type DeleteDeckMutationVariables = Exact<{
  id: Scalars['Float'];
  isLearner: Scalars['Boolean'];
}>;


export type DeleteDeckMutation = { __typename?: 'Mutation', deleteDeck: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type StartLearningMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type StartLearningMutation = { __typename?: 'Mutation', startLearning?: Maybe<{ __typename?: 'Deck', id: number, title: string, description: string, isLearner: boolean }> };

export type StartLearningSessionMutationVariables = Exact<{
  deckId: Scalars['Float'];
}>;


export type StartLearningSessionMutation = { __typename?: 'Mutation', startLearningSession?: Maybe<{ __typename?: 'Session', id: number, cardsNumber: number, cards: Array<{ __typename?: 'Card', id: number }> }> };

export type UpdateCardMutationVariables = Exact<{
  id: Scalars['Float'];
  question: Scalars['String'];
  answer: Scalars['String'];
}>;


export type UpdateCardMutation = { __typename?: 'Mutation', updateCard?: Maybe<{ __typename?: 'Card', id: number, question: string, answer: string }> };

export type UpdateDeckCardsMutationVariables = Exact<{
  id: Scalars['Float'];
  del?: Maybe<Array<CardInputWithId> | CardInputWithId>;
  update: Array<CardInputWithId> | CardInputWithId;
}>;


export type UpdateDeckCardsMutation = { __typename?: 'Mutation', updateDeckCards?: Maybe<{ __typename?: 'Deck', id: number, title: string, description: string, cards: Array<{ __typename?: 'Card', id: number, order: number, question: string, answer: string }> }> };

export type UpdateDeckInfoMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
}>;


export type UpdateDeckInfoMutation = { __typename?: 'Mutation', updateDeckInfo?: Maybe<{ __typename?: 'Deck', title: string, description: string }> };

export type DeckQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeckQuery = { __typename?: 'Query', deck?: Maybe<{ __typename?: 'Deck', title: string, description: string, canEdit: boolean, creator: { __typename?: 'User', username: string }, learners: Array<{ __typename?: 'User', username: string, deckStats: { __typename?: 'UserDeckStats', unique: number, overall: number, percent: number } }>, cards: Array<{ __typename?: 'Card', id: number, order: number, question: string, answer: string }> }> };

export type DeckSearchQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type DeckSearchQuery = { __typename?: 'Query', deckSearch?: Maybe<Array<{ __typename?: 'Deck', id: number, title: string, description: string, creator: { __typename?: 'User', username: string }, cards: Array<{ __typename?: 'Card', order: number, question: string, answer: string }>, learners: Array<{ __typename?: 'User', username: string }> }>> };

export type DecksPreviewQueryVariables = Exact<{ [key: string]: never; }>;


export type DecksPreviewQuery = { __typename?: 'Query', decks?: Maybe<Array<{ __typename?: 'Deck', id: number, title: string, description: string, isLearner: boolean }>> };

export type DiscoverQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscoverQuery = { __typename?: 'Query', discover?: Maybe<Array<{ __typename?: 'Deck', id: number, title: string, description: string, creator: { __typename?: 'User', username: string }, cards: Array<{ __typename?: 'Card', id: number }>, learners: Array<{ __typename?: 'User', id: number }> }>> };

export type GetCardFromSessionQueryVariables = Exact<{
  sessionId: Scalars['Float'];
  cardId: Scalars['Float'];
}>;


export type GetCardFromSessionQuery = { __typename?: 'Query', getCardFromSession?: Maybe<{ __typename?: 'Card', question: string, answer: string }> };

export type GetStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatsQuery = { __typename?: 'Query', getStats?: Maybe<{ __typename?: 'StatsResponse', overallCards: number, learnedCards: number, createdDecks: number, studentsInCreatedDecks: number, overallLearnedPercent: number, learnedPercent: number, createdDecksArray: Array<{ __typename?: 'Deck', id: number, title: string, description: string, creator: { __typename?: 'User', username: string }, cards: Array<{ __typename?: 'Card', id: number }>, learners: Array<{ __typename?: 'User', id: number }> }>, learningDecksArray: Array<{ __typename?: 'Deck', id: number, title: string, description: string, creator: { __typename?: 'User', username: string }, cards: Array<{ __typename?: 'Card', id: number }>, learners: Array<{ __typename?: 'User', id: number }> }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, createdAt: string, updatedAt: string, username: string, email: string }> };


export const CalculateStatsDocument = gql`
    mutation CalculateStats($cardId: Float!, $performanceRating: Float!, $sessionId: Float!) {
  calculateStats(
    id: $cardId
    performanceRating: $performanceRating
    sessionId: $sessionId
  ) {
    id
    lastPerformanceRating
  }
}
    `;

export function useCalculateStatsMutation() {
  return Urql.useMutation<CalculateStatsMutation, CalculateStatsMutationVariables>(CalculateStatsDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    changed
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateDeckDocument = gql`
    mutation CreateDeck($title: String!, $description: String!) {
  createDeck(input: {title: $title, description: $description}) {
    id
    title
    description
    isLearner
  }
}
    `;

export function useCreateDeckMutation() {
  return Urql.useMutation<CreateDeckMutation, CreateDeckMutationVariables>(CreateDeckDocument);
};
export const DeleteDeckDocument = gql`
    mutation DeleteDeck($id: Float!, $isLearner: Boolean!) {
  deleteDeck(id: $id, isLearner: $isLearner)
}
    `;

export function useDeleteDeckMutation() {
  return Urql.useMutation<DeleteDeckMutation, DeleteDeckMutationVariables>(DeleteDeckDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const StartLearningDocument = gql`
    mutation StartLearning($id: Float!) {
  startLearning(id: $id) {
    id
    title
    description
    isLearner
  }
}
    `;

export function useStartLearningMutation() {
  return Urql.useMutation<StartLearningMutation, StartLearningMutationVariables>(StartLearningDocument);
};
export const StartLearningSessionDocument = gql`
    mutation StartLearningSession($deckId: Float!) {
  startLearningSession(deckId: $deckId) {
    id
    cards {
      id
    }
    cardsNumber
  }
}
    `;

export function useStartLearningSessionMutation() {
  return Urql.useMutation<StartLearningSessionMutation, StartLearningSessionMutationVariables>(StartLearningSessionDocument);
};
export const UpdateCardDocument = gql`
    mutation UpdateCard($id: Float!, $question: String!, $answer: String!) {
  updateCard(input: {id: $id, question: $question, answer: $answer}) {
    id
    question
    answer
  }
}
    `;

export function useUpdateCardMutation() {
  return Urql.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument);
};
export const UpdateDeckCardsDocument = gql`
    mutation UpdateDeckCards($id: Float!, $del: [CardInputWithId!], $update: [CardInputWithId!]!) {
  updateDeckCards(deckId: $id, update: $update, del: $del) {
    id
    title
    description
    cards {
      id
      order
      question
      answer
    }
  }
}
    `;

export function useUpdateDeckCardsMutation() {
  return Urql.useMutation<UpdateDeckCardsMutation, UpdateDeckCardsMutationVariables>(UpdateDeckCardsDocument);
};
export const UpdateDeckInfoDocument = gql`
    mutation UpdateDeckInfo($title: String!, $description: String!, $id: Float!) {
  updateDeckInfo(id: $id, input: {title: $title, description: $description}) {
    title
    description
  }
}
    `;

export function useUpdateDeckInfoMutation() {
  return Urql.useMutation<UpdateDeckInfoMutation, UpdateDeckInfoMutationVariables>(UpdateDeckInfoDocument);
};
export const DeckDocument = gql`
    query Deck($id: Float!) {
  deck(deckId: $id) {
    creator {
      username
    }
    title
    description
    canEdit
    learners {
      username
      deckStats {
        unique
        overall
        percent
      }
    }
    cards {
      id
      order
      question
      answer
    }
  }
}
    `;

export function useDeckQuery(options: Omit<Urql.UseQueryArgs<DeckQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DeckQuery>({ query: DeckDocument, ...options });
};
export const DeckSearchDocument = gql`
    query DeckSearch($title: String!) {
  deckSearch(title: $title) {
    id
    creator {
      username
    }
    title
    description
    cards {
      order
      question
      answer
    }
    learners {
      username
    }
  }
}
    `;

export function useDeckSearchQuery(options: Omit<Urql.UseQueryArgs<DeckSearchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DeckSearchQuery>({ query: DeckSearchDocument, ...options });
};
export const DecksPreviewDocument = gql`
    query DecksPreview {
  decks {
    id
    title
    description
    isLearner
  }
}
    `;

export function useDecksPreviewQuery(options: Omit<Urql.UseQueryArgs<DecksPreviewQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DecksPreviewQuery>({ query: DecksPreviewDocument, ...options });
};
export const DiscoverDocument = gql`
    query Discover {
  discover {
    id
    title
    description
    creator {
      username
    }
    cards {
      id
    }
    learners {
      id
    }
  }
}
    `;

export function useDiscoverQuery(options: Omit<Urql.UseQueryArgs<DiscoverQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DiscoverQuery>({ query: DiscoverDocument, ...options });
};
export const GetCardFromSessionDocument = gql`
    query GetCardFromSession($sessionId: Float!, $cardId: Float!) {
  getCardFromSession(sessionId: $sessionId, cardId: $cardId) {
    question
    answer
  }
}
    `;

export function useGetCardFromSessionQuery(options: Omit<Urql.UseQueryArgs<GetCardFromSessionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCardFromSessionQuery>({ query: GetCardFromSessionDocument, ...options });
};
export const GetStatsDocument = gql`
    query GetStats {
  getStats {
    overallCards
    learnedCards
    createdDecks
    studentsInCreatedDecks
    overallLearnedPercent
    learnedPercent
    createdDecksArray {
      id
      title
      description
      creator {
        username
      }
      cards {
        id
      }
      learners {
        id
      }
    }
    learningDecksArray {
      id
      title
      description
      creator {
        username
      }
      cards {
        id
      }
      learners {
        id
      }
    }
  }
}
    `;

export function useGetStatsQuery(options: Omit<Urql.UseQueryArgs<GetStatsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetStatsQuery>({ query: GetStatsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    createdAt
    updatedAt
    username
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};