import { useIsMobileView } from "@/hooks/use-is-mobile-view";

interface MobileViewProps {
  children?: React.ReactElement;
}

const MobileView: React.FC<MobileViewProps> = ({ children }) => {
  const isMobileView = useIsMobileView();

  return <>{isMobileView ? children : null}</>;
};

export default MobileView;
