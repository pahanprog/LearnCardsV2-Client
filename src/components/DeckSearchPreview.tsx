import { useStartLearningMutation } from "../generated/graphql";

interface DeckSearchPreviewProps {
  id: number;
  title: string;
  creator: string;
  close: Function;
  learners: { username: string }[];
  cards: {
    number: number;
    question: string;
    answer: string;
  }[];
}

const DeckSearchPreview: React.FC<DeckSearchPreviewProps> = ({
  cards,
  creator,
  title,
  id,
  close,
  learners,
}) => {
  const [{}, startLearning] = useStartLearningMutation();

  const handleClick = () => {
    const deck = {
      id,
    };

    startLearning(deck);

    close();
  };

  return (
    <div
      className="cursor-pointer border border-gray-200 shadow p-2 mb-2"
      onClick={handleClick}
    >
      <div>{title}</div>
      <div className="flex">
        <div className="mr-2">Creator: </div>
        <div>{creator}</div>
      </div>
      <div className="flex">
        <div className="mr-2">{cards.length}</div>
        <div>unique cards</div>
      </div>
      <div className="flex">
        <div className="mr-2">{learners.length}</div>
        <div>learners</div>
      </div>
    </div>
  );
};

export default DeckSearchPreview;
