import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeckSearchQuery } from "../generated/graphql";
import DeckSearchPreview from "./DeckSearchPreview";

interface DeckSearchResultProps {
  title: string;
  back: Function;
  close: Function;
}

const DeckSearchResult: React.FC<DeckSearchResultProps> = ({ title, back }) => {
  const [{ data }] = useDeckSearchQuery({ variables: { title } });
  return (
    <div className="flex-1 mt-4">
      {data?.deckSearch?.length == 0 ? (
        <div>Nothing Found</div>
      ) : (
        data?.deckSearch?.map((deck) => {
          return (
            <DeckSearchPreview
              title={deck.title}
              creator={deck.creator.username}
              cards={deck.cards}
              learners={deck.learners}
              id={deck.id}
              close={close}
              key={deck.id}
            />
          );
        })
      )}
    </div>
  );
};

export default DeckSearchResult;
