import {
  faChartBar,
  faCompass,
  faSearch,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface DashboardLinkProps {
  type: "Актуальные колоды" | "Общая статистика" | "Поиск колод";
}

const DashboardLink: React.FC<DashboardLinkProps> = ({ type }) => {
  let icon: IconDefinition;
  let href: string;

  switch (type) {
    case "Актуальные колоды":
      icon = faCompass;
      href = "/discover";
      break;
    case "Общая статистика":
      icon = faChartBar;
      href = "/stats";
      break;
    case "Поиск колод":
      icon = faSearch;
      href = "/search";
      break;
  }

  return (
    <Link href={href}>
      <div className="flex items-center py-3 px-4 hover:bg-gray-200 cursor-pointer">
        <FontAwesomeIcon icon={icon} size="lg" className="mr-4" />
        <span className="font-semibold">{type}</span>
      </div>
    </Link>
  );
};

export default DashboardLink;
