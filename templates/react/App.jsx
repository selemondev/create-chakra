import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://buttons.github.io/buttons.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box>
      <Flex direction="column">
        <Box as="header" py="16">
          <Heading size="5xl" fontWeight="bold" align="center" mb="6">
            Create Chakra App
          </Heading>
          <Flex direction="row" justify="center" alignItems="center" gap="4">
            <Link
              className="github-button"
              href="https://github.com/vedantnn71/create-chakra-app"
              data-color-scheme="no-preference: dark; light: dark; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star vedantnn71/create-chakra-app on GitHub"
            >
              Star
            </Link>
            <Link
              className="github-button"
              href="https://github.com/vedantnn71/create-chakra-app/discussions"
              data-color-scheme="no-preference: dark; light: dark; dark: dark;"
              data-icon="octicon-comment-discussion"
              data-size="large"
              aria-label="Discuss vedantnn71/create-chakra-app on GitHub"
            >
              Discuss
            </Link>
          </Flex>
        </Box>

        <Flex as="main" grow="1">
          <Box as="section" textAlign="center" alignItems="center">
            <Heading size="3xl" fontWeight="medium">
              Next.js Project Created using{" "} <Link href="https://nextjs.org/docs/api-reference/create-next-app" target="_blank" className="text-indigo-300" >
                create-next-app
              </Link>
            </Heading>
            <Text mb="6">
              Officially maintained by the creators of Next.js
            </Text>
          </Box>
        </Flex>

        <Box as="footer" px="8" py="12" border="2" borderColor="gray.800">
          <Box px="8" fontWeight="medium" textAlign="center">
            <Link href="https://github.com/vedantnn71/create-chakra-app">
              Create Chakra App
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default App;
