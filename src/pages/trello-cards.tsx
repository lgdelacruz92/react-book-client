import { NextPage } from "next";
import axios from "axios";
import { apiURL } from "@/lib/api/apIURL";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Heading,
  Stack,
} from "@chakra-ui/react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

type Card = {
  name:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  desc:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
};

interface TrelloCardsProps {
  cards: any;
}

const TrelloCards: NextPage<TrelloCardsProps> = ({ cards }) => {
  return (
    <Center p="5">
      <Stack w="70vw">
        <Heading>Trello Cards</Heading>
        <Accordion allowMultiple border="1px solid lightgrey" borderRadius="md">
          {cards.map((card: Card) => (
            <AccordionItem>
              <Heading>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {card.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4}>{card.desc}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Center>
  );
};

TrelloCards.getInitialProps = async () => {
  const url = `${apiURL(`/trello/boards/607322ed85f4404e86476b3e/cards`)}`;
  const response = await axios.get(url);
  const cards = response.data;
  return { cards };
};

export default TrelloCards;
