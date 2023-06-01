import {
      Flex,
      Heading,
      Input,
      Button,
      FormControl,
      FormLabel,
      Switch,
      useColorMode,
      useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
      const { toggleColorMode } = useColorMode();
      const formBackground = useColorModeValue('gray.100', 'gray.700');

      return (
            <Flex h="100vh" alignItems="center" justifyContent="center" flexDir="column">
                  <Heading mb={6}>Welcome Back to Tarpaulin!</Heading>
                  <Flex
                        flexDirection="column"
                        bg={formBackground}
                        p={12}
                        borderRadius={8}
                        boxShadow="lg"
                        minW={{ base: '90%', md: '468px' }}
                  >
                        <Heading mb={6}>Log In</Heading>
                        <Input
                              placeholder="Email"
                              type="email"
                              variant="filled"
                              mb={3}
                        />
                        <Input
                              placeholder="Password"
                              type="password"
                              variant="filled"
                              mb={6}
                        />
                        <Button colorScheme="teal" mb={8}>
                              Log In
                        </Button>
                        <FormControl display="flex" alignItems="center">
                              <FormLabel htmlFor="dark_mode" mb="0">
                                    Enable Dark Mode?
                              </FormLabel>
                              <Switch
                                    id="dark_mode"
                                    colorScheme="teal"
                                    size="lg"
                                    onChange={toggleColorMode}
                              />
                        </FormControl>
                  </Flex>
            </Flex>
      );
};

export default Login;
