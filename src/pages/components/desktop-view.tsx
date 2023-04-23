import { useIsMobileView } from "@/hooks/use-is-mobile-view";

interface DesktopViewProps {
  children?: React.ReactElement;
}

const DesktopView: React.FC<DesktopViewProps> = ({ children }) => {
  const isMobileView = useIsMobileView();

  return <>{isMobileView ? null : children}</>;
};

export default DesktopView;
