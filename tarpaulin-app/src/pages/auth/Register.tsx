/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
      Flex,
      Heading,
      Input,
      Button,
      FormControl,
      FormLabel,
      useColorModeValue,
      Select,
      Text,
} from '@chakra-ui/react';
import { useState, useMemo, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { User } from "../../types"
import { MdArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

const Register = () => {
      const roles = useMemo(
            () => ["admin", "instructor", "student"],
            []
      );


      const [user, setUser] = useState<User>({
            name: "",
            email: "",
            password: "",
            role: "student", // Set a default value, e.g., "student"
      });

      const handleRoleChange = useCallback(
            (event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedRole = event.target.value;
                  setUser((prevUser: User) => ({
                        ...prevUser,
                        role: selectedRole as User["role"],
                  }));
            },
            []
      );

      const renderedOptions = useMemo(
            () =>
                  roles.map((role) => (
                        <option key={role} value={role}>
                              {role}
                        </option>
                  )),
            [roles]
      );


      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');
      const navigate = useNavigate();
      const formBackground = useColorModeValue('gray.100', 'gray.700');

      const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
            event.preventDefault();
            setLoading(true);
            setMessage('');
            try {
                  const res: AxiosResponse = await axios.post('http://localhost:8000/api/users', { ...user });
                  if (res.status === 201) {
                        setTimeout(() => {
                              setMessage('User created successfully');
                              navigate('/login');
                        }, 2000);
                  } else {
                        setTimeout(() => {
                              setMessage(res.data.message);
                        }, 2000);
                  }
            } catch (err: AxiosResponse | any) {
                  setTimeout(() => {
                        setMessage(err.response.data.message);
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
            <Flex alignItems="center" justifyContent="center" flexDir="column" p={12}>
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
                        <Heading textAlign={"center"} mb={6} fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}> Register </Heading>
                        {message ? (
                              <Text color={message === 'User created successfully' ? 'green.400' : 'red.400'} textAlign={"center"} mb={6} fontWeight={400}>
                                    {message}
                              </Text>
                        ) : null}
                        <FormControl mb={3} onSubmit={handleSubmit} isRequired as="form" id="register-form">
                              <FormLabel htmlFor="name">Name</FormLabel>
                              <Input
                                    id="name"
                                    placeholder="Name"
                                    variant="filled"
                                    autoComplete="true"
                                    border={{ base: 'none', md: '0.5px solid' }}
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    mb={3}
                              />
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <Input
                                    id="email"
                                    placeholder="Email"
                                    variant="filled"
                                    autoComplete="true"
                                    border={{ base: 'none', md: '0.5px solid' }}
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
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
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    mb={3}
                              />
                              <FormLabel htmlFor="role">Role</FormLabel>
                              <Select
                                    placeholder="Select a role"
                                    icon={<MdArrowDropDown />}
                                    variant="filled"
                                    border={{ base: 'none', md: '0.5px solid' }}
                                    value={user.role}
                                    onChange={handleRoleChange}
                              >
                                    {renderedOptions}
                              </Select>
                        </FormControl>
                        <Button colorScheme="teal" mt={8} isLoading={loading} onClick={(e) => handleSubmit(e as any)}>
                              Register
                        </Button>
                        <Button variant={'link'} size={'sm'} mt={6} onClick={() => navigate('/login')}>
                              Already have an account?
                        </Button>
                  </Flex>
            </Flex>
      );
};

export default Register;
