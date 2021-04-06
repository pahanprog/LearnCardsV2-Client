interface LearnerProps {
  username: string;
}

const Learner: React.FC<LearnerProps> = ({ username }) => {
  return <div>{username}</div>;
};

export default Learner;
