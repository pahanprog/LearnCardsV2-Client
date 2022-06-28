interface LearnerProps {
  username: string;
  deckStats: {
    unique: number;
    overall: number;
    percent: number;
  };
  me?: boolean;
  adnim?: boolean;
}

const Learner: React.FC<LearnerProps> = ({
  username,
  deckStats,
  me,
  adnim,
}) => {
  return (
    <div className="px-4 py-2 pb-2 border-b-2">
      <div className="flex flex-col items-start md:flex-row md:items-center mb-2 justify-between">
        <div className="flex flex-col md:flex-row">
          <div className="md:text-xl text-lg md:mr-6">{`${username} ${
            me ? "(Вы)" : ""
          }`}</div>
          {adnim && (
            <div className="md:text-xl text-lg text-purple-700 md:mr-6">
              Администратор
            </div>
          )}
          <div className="md:text-xl text-lg">{deckStats.percent}%</div>
        </div>
        <div className="flex flex-col md:items-end">
          <div className="text-md">
            Изучено уникальных карточек: {deckStats.unique}
          </div>
          <div className="text-md">
            Всего изученных карточек: {deckStats.overall}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 10,
          background: `linear-gradient(90deg, rgb(34 211 238) ${deckStats.percent}%, rgb(165 243 252) ${deckStats.percent}%)`,
        }}
      ></div>
    </div>
  );
};

export default Learner;
