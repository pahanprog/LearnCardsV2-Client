import {
  faChartBar,
  faCompass,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DashboardLinkProps {
  type: "Discover" | "Stats";
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ type }) => {
  let icon: IconDefinition;

  switch (type) {
    case "Discover":
      icon = faCompass;
      break;
    case "Stats":
      icon = faChartBar;
      break;
  }

  return (
    <div className="flex items-center mb-3">
      <FontAwesomeIcon icon={icon} size="lg" className="mr-4" />
      <span className="font-semibold">{type}</span>
    </div>
  );
};

export default DashboardLink;
