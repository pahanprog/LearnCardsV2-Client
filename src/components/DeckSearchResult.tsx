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
    <div className="flex-1">
      <div
        onClick={() => back()}
        className="cursor-pointer bg-black w-8 h-8 grid place-items-center rounded-full absolute left-0 top-0 mt-2 ml-2 "
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" color="white" />
      </div>
      <div>
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
    </div>
  );
};

export default DeckSearchResult;
