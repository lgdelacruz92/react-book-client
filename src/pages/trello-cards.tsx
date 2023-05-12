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
  useState,
  useEffect,
} from "react";
import { useQuery } from "react-query";

type Card = {
  id: string;
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
          {cards.map((card: Card, index: number) => (
            <AccordionRow card={card} key={`accordion-row-index`} />
          ))}
        </Accordion>
      </Stack>
    </Center>
  );
};

TrelloCards.getInitialProps = async () => {
  const url = `${apiURL(`/trello/boards/645bdf89f7dade78f6776005/cards`)}`;
  const response = await axios.get(url);
  const cards = response.data;
  return { cards };
};

export default TrelloCards;

const AccordionRow: React.FC<{ card: Card }> = ({ card }) => {
  const [data, setData] = useState(null);
  const {
    isLoading,
    error,
    data: queryData,
  } = useQuery(["todos", card], async () => {
    const response = await fetch(
      `${process.env.API_URL}/open-ai/chat/completions`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content:
                "Score the following task based on business value, development cost, and  customer value.",
            },
            {
              role: "user",
              content: "include explanations why",
            },
            {
              role: "user",
              content: "Scores are between 1 to 10",
            },
            {
              role: "user",
              content:
                "Give an overall score at the end in the form of `Overall: actual/max`",
            },
            {
              role: "user",
              content: `title: ${card.name}; description: ${card.desc}`,
            },
          ],
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  console.log(data);
  return (
    <AccordionItem>
      <Heading>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {card.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel pb={4}>
        {data && (data as any).choices.length > 0 ? (
          <Content
            contents={(data as any).choices[0].message.content.split("\n")}
          />
        ) : (
          ""
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export const Content: React.FC<{ contents: string[] }> = ({ contents }) => {
  return (
    <div>
      {contents.map((content, index) => (
        <span key={`content-${index}`}>
          {content.length > 0 ? <p>{content}</p> : <br />}
        </span>
      ))}
    </div>
  );
};
