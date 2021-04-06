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
};

export type Query = {
  decks?: Maybe<Array<Deck>>;
  deck?: Maybe<Deck>;
  deckSearch?: Maybe<Array<Deck>>;
  me?: Maybe<User>;
  getUsername?: Maybe<User>;
};


export type QueryDeckArgs = {
  deckId: Scalars['Float'];
};


export type QueryDeckSearchArgs = {
  title: Scalars['String'];
};


export type QueryGetUsernameArgs = {
  id: Scalars['Float'];
};

export type Deck = {
  id: Scalars['Float'];
  cards: Array<Card>;
  creatorId: Scalars['Float'];
  creator: User;
  learners: Array<User>;
  title: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Card = {
  id: Scalars['Float'];
  number: Scalars['Float'];
  parentId: Scalars['Float'];
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type User = {
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  createDeck?: Maybe<Deck>;
  updateDeckInfo?: Maybe<Deck>;
  updateDeckCards?: Maybe<Deck>;
  deleteDeck: Scalars['Boolean'];
  startLearning?: Maybe<Deck>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateCard?: Maybe<Card>;
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
  id: Scalars['Float'];
};


export type MutationStartLearningArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateCardArgs = {
  input: CardInput;
};

export type DeckInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type CardInputWithId = {
  question: Scalars['String'];
  answer: Scalars['String'];
  number: Scalars['Float'];
  id?: Maybe<Scalars['Float']>;
};

export type UserResponse = {
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CardInput = {
  id: Scalars['Float'];
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type CreateDeckMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateDeckMutation = { createDeck?: Maybe<{ id: number, title: string, description: string }> };

export type DeleteDeckMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteDeckMutation = { deleteDeck: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: { errors?: Maybe<Array<{ field: string, message: string }>>, user?: Maybe<{ id: number, username: string }> } };

export type StartLearningMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type StartLearningMutation = { startLearning?: Maybe<{ id: number, creatorId: number, learners: Array<{ id: number, username: string }> }> };

export type UpdateCardMutationVariables = Exact<{
  id: Scalars['Float'];
  question: Scalars['String'];
  answer: Scalars['String'];
}>;


export type UpdateCardMutation = { updateCard?: Maybe<{ id: number, question: string, answer: string }> };

export type UpdateDeckCardsMutationVariables = Exact<{
  id: Scalars['Float'];
  del?: Maybe<Array<CardInputWithId> | CardInputWithId>;
  update: Array<CardInputWithId> | CardInputWithId;
}>;


export type UpdateDeckCardsMutation = { updateDeckCards?: Maybe<{ id: number, title: string, description: string, cards: Array<{ id: number, number: number, question: string, answer: string }> }> };

export type UpdateDeckInfoMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
}>;


export type UpdateDeckInfoMutation = { updateDeckInfo?: Maybe<{ title: string, description: string }> };

export type DeckQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeckQuery = { deck?: Maybe<{ title: string, description: string, creator: { username: string }, learners: Array<{ username: string }>, cards: Array<{ id: number, number: number, question: string, answer: string }> }> };

export type DeckSearchQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type DeckSearchQuery = { deckSearch?: Maybe<Array<{ id: number, title: string, description: string, creator: { username: string }, cards: Array<{ number: number, question: string, answer: string }>, learners: Array<{ username: string }> }>> };

export type DecksPreviewQueryVariables = Exact<{ [key: string]: never; }>;


export type DecksPreviewQuery = { decks?: Maybe<Array<{ id: number, title: string, description: string }>> };

export type GetUsernameQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUsernameQuery = { getUsername?: Maybe<{ username: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: Maybe<{ id: number, createdAt: string, updatedAt: string, username: string }> };


export const CreateDeckDocument = gql`
    mutation CreateDeck($title: String!, $description: String!) {
  createDeck(input: {title: $title, description: $description}) {
    id
    title
    description
  }
}
    `;

export function useCreateDeckMutation() {
  return Urql.useMutation<CreateDeckMutation, CreateDeckMutationVariables>(CreateDeckDocument);
};
export const DeleteDeckDocument = gql`
    mutation DeleteDeck($id: Float!) {
  deleteDeck(id: $id)
}
    `;

export function useDeleteDeckMutation() {
  return Urql.useMutation<DeleteDeckMutation, DeleteDeckMutationVariables>(DeleteDeckDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const StartLearningDocument = gql`
    mutation StartLearning($id: Float!) {
  startLearning(id: $id) {
    id
    creatorId
    learners {
      id
      username
    }
  }
}
    `;

export function useStartLearningMutation() {
  return Urql.useMutation<StartLearningMutation, StartLearningMutationVariables>(StartLearningDocument);
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
      number
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
    learners {
      username
    }
    cards {
      id
      number
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
      number
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
  }
}
    `;

export function useDecksPreviewQuery(options: Omit<Urql.UseQueryArgs<DecksPreviewQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DecksPreviewQuery>({ query: DecksPreviewDocument, ...options });
};
export const GetUsernameDocument = gql`
    query GetUsername($id: Float!) {
  getUsername(id: $id) {
    username
  }
}
    `;

export function useGetUsernameQuery(options: Omit<Urql.UseQueryArgs<GetUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUsernameQuery>({ query: GetUsernameDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    createdAt
    updatedAt
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};