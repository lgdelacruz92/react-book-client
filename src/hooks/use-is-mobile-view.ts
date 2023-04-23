import { useMediaQuery } from "@chakra-ui/react";

export const useIsMobileView = () => {
    const [isMobileView] = useMediaQuery("(max-width: 700px)");
    return isMobileView;
}