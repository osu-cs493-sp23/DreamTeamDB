import {
      chakra,
      Box,
      Stack,
      Text,
      Image,
      Container,
      Button,
      useColorModeValue,
      CloseButton
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface CourseProps {
      title: string;
      subject: string;
      number: number;
      instructorId?: string;
      term: string;
}

const Course: React.FC<CourseProps> = ({ title, subject, number, instructorId, term }) => {
      return (
            <Container maxW="container.xl">
                  <Box
                        borderWidth="1px"
                        rounded="lg"
                        shadow="lg"
                        position="relative"
                        overflow="hidden"
                        bg={useColorModeValue('white', 'gray.800')}
                  >
                        <CloseButton position="absolute" right="8px" top="8px" />
                        <Image
                              src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
                              objectFit="cover"
                              w="100%"
                        />
                        <Box maxW="xl" mx="auto" px={{ base: 4, lg: 8 }} py={{ base: 3, lg: 6 }} zIndex={1}>
                              <Box mb={{ base: 4, md: 8 }}>
                                    <chakra.h3
                                          fontSize={{ base: 'lg', sm: '2xl' }}
                                          fontWeight="bold"
                                          lineHeight="1.2"
                                          mb={2}
                                    >
                                          {subject + number} - {term}
                                    </chakra.h3>
                                    <Text fontSize={{ base: 'md', sm: 'lg' }} noOfLines={2}>
                                          {title}
                                    </Text>
                              </Box>
                              <Stack
                                    justify="space-between"
                                    direction={{ base: 'column', sm: 'row' }}
                                    spacing={{ base: 2, sm: 0 }}
                              >
                                    <Button
                                          as="a"
                                          href="#"
                                          size="sm"
                                          fontSize="sm"
                                          fontWeight="bold"
                                          px="4"
                                          h="auto"
                                    >
                                          View
                                    </Button>
                                    <Button
                                          as="a"
                                          href="#"
                                          size="sm"
                                          fontSize="sm"
                                          fontWeight="bold"
                                          px="4"
                                          h="auto"
                                    >
                                          Edit
                                    </Button>
                              </Stack>
                        </Box>
                  </Box>
            </Container>
      );
};


export default Course;