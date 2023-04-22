import { useColorMode, Switch, Box, Heading, Text } from '@chakra-ui/react';

function IndexPage() {
  const { toggleColorMode } = useColorMode();
  return (
    <div>
      <Box ml="1rem" mt="1rem">
        <Switch onChange={toggleColorMode}>Dark mode</Switch>
      </Box>
      <Box>
        <Heading as="h2" mt="1rem">Chapter 1.1: React's History - An Unexpected Adventure</Heading>
        <Heading as="h3" mt="2rem" size="lg">Introduction</Heading>
        <Text mt="1rem">Gather 'round, folks! It's time for a tale of epic proportions, filled with twists, turns, and the unforeseen rise of a true web development hero. This is the story of React, the brave UI champion that took the frontend world by storm and continues to do so to this day.</Text>
        <Heading as="h3" mt="2rem" size="lg">A Quest for Simplicity</Heading>
        <Text mt="1rem">Once upon a time, in the faraway land of Facebook, a band of developers found themselves grappling with a monstrous codebase, a byproduct of their ever-growing and increasingly complex user interface. They realized they needed a powerful weapon to defeat the beast and restore order to their kingdom.</Text>
        <Text mt="1rem"> Under the guidance of Jordan Walke, a wise and daring developer, the team drew inspiration from the mysterious XHP, a mythical creature that brought HTML components to the PHP world. With this newfound knowledge, they embarked on a quest to create React, a savior that would vanquish the chaos that had enveloped their realm.</Text>
        <Heading as="h3" mt="2rem" size="lg">Enter the Hero: React</Heading>
        <Text mt="1rem">React burst onto the scene at JSConf US in May 2013, introduced to the world by Tom Occhino and Jordan Walke. At first, many developers raised a skeptical eyebrow at this newcomer, with its peculiar JSX syntax and unconventional ideas. But soon enough, the masses began to recognize the extraordinary power that React possessed.</Text>
        <Heading as="h3" mt="2rem" size="lg">React's Adventure Goes Open Source</Heading>
        <Text mt="1rem">In December 2013, React was set free, released into the open-source wilderness for developers worldwide to tame, harness, and contribute to its ever-growing prowess. As the frontend realm basked in the glory of a new era of organized, component-based architecture, the days of unruly spaghetti code were numbered.</Text>
        <Heading as="h3" mt="2rem" size="lg">The Magical Powers of React</Heading>
        <Text mt="1rem">React's true magic comes from its uncanny ability to create highly interactive and efficient user interfaces. With its enchanted bag of tricks, including a virtual DOM, reusable components, and unidirectional data flow, React has earned its place in the pantheon of frontend legends.</Text>
        <Heading as="h3" mt="2rem" size="lg">In Conclusion</Heading>
        <Text mt="1rem">And so, dear reader, that is the tale of React, a humble hero born from the need to conquer the monstrous codebase and bring peace and order to the world of web development. The adventure continues, as React constantly evolves and shapes the ever-changing landscape of frontend technology.</Text>
      </Box>

    </div>
  )
}

export default IndexPage