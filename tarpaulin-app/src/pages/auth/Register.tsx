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
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const Register = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [role, setRole] = useState("student");

      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');

      const { toggleColorMode } = useColorMode();
      const formBackground = useColorModeValue('gray.100', 'gray.700');

      const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setLoading(true);
            setMessage('');

            try {
                  const res: AxiosResponse = await axios.post('http://localhost:8000/api/users', {
                        name,
                        email,
                        password,
                        role
                  });

                  if (res.status === 201) {
                        setMessage('User created successfully');
                  } else {
                        setMessage('Something went wrong');
                  }
            } catch (err: any) {
                  setMessage(err.response.data.message);
            }

            setLoading(false);

            setTimeout(() => {
                  setMessage('');
                  setLoading(false);
            });
      };



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
                        <Heading mb={6}>Register an Account</Heading>
                        <Input
                              placeholder="Name"
                              type="email"
                              variant="filled"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              mb={3}
                        />
                        <Input
                              placeholder="Email"
                              type="email"
                              variant="filled"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              mb={3}
                        />
                        <Input
                              placeholder="Password"
                              type="password"
                              variant="filled"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              mb={3}
                        />
                        <Input
                              placeholder="Role"
                              type="text"
                              variant="filled"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              mb={6}
                        />
                        <Button colorScheme="teal" mb={8} isLoading={loading} onClick={handleSubmit}>
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

export default Register;
