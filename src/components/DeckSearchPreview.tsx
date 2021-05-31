import { useStartLearningMutation } from "../generated/graphql";
import { useRouter } from "next/router";

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

  const router = useRouter();

  const handleClick = async () => {
    const deck = {
      id,
    };

    startLearning(deck);
    close();
  };

  return (
    <div className="cursor-pointer border border-gray-200 shadow p-2 mb-2 rounded-md group relative">
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
      <div className="absolute right-0 top-0 w-full h-full bg-gray-100 bg-opacity-75 opacity-0 group-hover:opacity-100 grid place-items-center">
        <button
          onClick={handleClick}
          className="px-4 py-2 font-medium inline-flex justify-center text-green-700 bg-green-200 rounded-md hover:bg-green-300 focus:focus:outline-none"
        >
          Add to your decks
        </button>
      </div>
    </div>
  );
};

export default DeckSearchPreview;
