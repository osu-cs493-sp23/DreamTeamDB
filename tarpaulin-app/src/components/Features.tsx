import {
      Box,
      Button,
      Container,
      Flex,
      Heading,
      Icon,
      Stack,
      Text,
      useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
      FcLock,
      FcCloseUpMode,
      FcDataEncryption,
      FcTodoList,
      FcApprove
} from 'react-icons/fc';

interface CardProps {
      heading: string;
      description: string;
      icon: ReactElement;
}

const Card = ({ heading, description, icon }: CardProps) => {
      return (
            <Box
                  maxW={{ base: 'full', md: '275px' }}
                  bg={useColorModeValue('white', 'gray.800')}
                  w={'full'}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={5}>
                  <Stack align={'start'} spacing={2}>
                        <Flex
                              w={16}
                              h={16}
                              align={'center'}
                              justify={'center'}
                              color={'white'}
                              rounded={'full'}
                              bg={useColorModeValue('gray.100', 'gray.700')}>
                              {icon}
                        </Flex>
                        <Box mt={2}>
                              <Heading size="md" fontWeight={500} color={useColorModeValue('gray.700', 'gray.100')}>{heading}</Heading>
                              <Text mt={2} fontSize={'sm'} fontWeight={300}>
                                    {description}
                              </Text>
                        </Box>
                  </Stack>
            </Box>
      );
};

export default function Features() {
      return (
            <Box p={12}>
                  <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} color={useColorModeValue('gray.700', 'gray.100')}>
                              Why use Tarpaulin?
                        </Heading>
                        <Text color={
                              useColorModeValue('gray.600', 'gray.300')
                        } fontSize={{ base: 'sm', sm: 'lg' }} fontWeight={300}>
                              At Tarpualin, we care deeply about our customers.
                              We offer a wide array of features that will help you wheter you're
                              a student, instructor, or an admin. Trust us, we got you covered!
                        </Text>
                  </Stack>

                  <Container maxW={'5xl'} mt={12}>
                        <Flex flexWrap="wrap" gridGap={6} justify="center">
                              <Card
                                    heading={'Clean and intuitive UI'}
                                    icon={<Icon as={FcCloseUpMode} w={10} h={10} />}
                                    description={
                                          'Tarpaulin\'s user-friendly interface is guarnteed to be smooth--unlike other similar learning management systems.'
                                    }
                              />
                              <Card
                                    heading={'Secure and reliable'}
                                    icon={<Icon as={FcDataEncryption} w={10} h={10} />}
                                    description={
                                          'We offer a robust and secure distributed system which is reliable and can handle a large number of users.'
                                    }
                              />
                              <Card
                                    heading={'Role based access control'}
                                    icon={<Icon as={FcLock} w={10} h={10} />}
                                    description={
                                          'Tarpaulin\'s role-based access control ensures that only authorized users can access certain features.'
                                    }
                              />
                              <Card
                                    heading={'Easy to use'}
                                    icon={<Icon as={FcTodoList} w={10} h={10} />}
                                    description={
                                          'Easy and clean navigation, even for first time users. When we created Tarpaulin, we kept you, the user in mind.'
                                    }
                              />
                              <Card
                                    heading={'Accessible'}
                                    icon={<Icon as={FcApprove} w={10} h={10} />}
                                    description={
                                          'Accessible to all users, whether you are a student, instructor, or an admin. We got you covered!'
                                    }
                              />
                        </Flex>
                  </Container>
            </Box>
      );
}