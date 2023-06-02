/* eslint-disable @typescript-eslint/no-explicit-any */
import {
      Flex,
      Heading,
      Input,
      Button,
      FormControl,
      FormLabel,
      useColorModeValue,
      Text,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import axios, { AxiosResponse } from 'axios';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { UserContext } from '../../context/UserContext';

const Login = () => {
      const navigate = useNavigate();
      const formBackground = useColorModeValue('gray.100', 'gray.700');
      const [user, setUser] = useState<User>({
            email: '',
            password: '',
      });
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');
      const { setUser: setter } = useContext(UserContext);

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
            try {
                  const response: AxiosResponse = await axios.post('http://localhost:8000/api/users/login', { ...user });
                  if (response.status === 200) {
                        setTimeout(() => {
                              setMessage('Login successful');
                              setTimeout(() => {
                                    localStorage.setItem('token', response.data.token);
                                    localStorage.setItem('id', response.data.id);
                                    localStorage.setItem('role', response.data.role);
                                    setter?.(response.data);
                                    navigate('/dashboard');
                              }, 2000);
                        }, 2000);
                  } else {
                        setTimeout(() => {
                              setMessage(response.data.message);
                        }, 2000);
                  }
            } catch (error: AxiosResponse | any) {
                  setTimeout(() => {
                        setMessage('Login failed');
                        setLoading(false);
                  }, 2000);
            }
            setTimeout(() => {
                  setTimeout(() => {
                        setMessage('');
                  }, 5000);
                  setLoading(false);
            }, 2000);
      };

      return (
            <Flex alignItems="center" justifyContent="center" flexDir="column" pt={32} px={12}>
                  <Heading mb={6} fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}> Tarpaulin </Heading>
                  <Flex alignItems="center" justifyContent="center" flexDir="row" mb={2}>
                        <Button
                              variant={'link'}
                              size={'lg'}
                              onClick={() => navigate('/')}
                              leftIcon={<IoChevronBackCircleSharp />}
                        />
                        <Text fontWeight={400} fontSize={{ base: 'md', md: 'xl' }}> Go Back To Landing </Text>
                  </Flex>
                  <Flex
                        flexDirection="column"
                        bg={formBackground}
                        p={12}
                        borderRadius={8}
                        boxShadow="lg"
                        minW={{ base: '90%', md: '468px' }}
                  >
                        <Heading textAlign={"center"} mb={6} fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}> Login </Heading>
                        {message ? (
                              <Text color={message === 'Login successful' ? 'green.400' : 'red.400'} textAlign={"center"} mb={6} fontWeight={400}>
                                    {message}
                              </Text>
                        ) : null}
                        <FormControl onSubmit={handleSubmit as any} isRequired as="form" id="register-form">
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <Input
                                    id="email"
                                    placeholder="Email"
                                    variant="filled"
                                    autoComplete="true"
                                    border={{ base: 'none', md: '0.5px solid' }}
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as any)}
                                    mb={3}
                              />
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <Input
                                    id="password"
                                    placeholder="Password"
                                    autoComplete="true"
                                    type="password"
                                    variant="filled"
                                    border={{ base: 'none', md: '0.5px solid' }}
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as any)}
                              />
                        </FormControl>
                        <Button colorScheme="teal" mt={8} isLoading={loading} onClick={(e) => handleSubmit(e as any)}>
                              Log In
                        </Button>
                        <Button variant={'link'} size={'sm'} mt={6} onClick={() => navigate('/register')}>
                              Don't have an account?
                        </Button>
                  </Flex>
            </Flex>
      );
};

export default Login;
