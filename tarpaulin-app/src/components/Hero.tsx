import {
      Box,
      Heading,
      Container,
      Text,
      Button,
      Stack,
      useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
      const navigate = useNavigate();
      return (
            <>
                  <Container maxW={'3xl'}>
                        <Stack
                              as={Box}
                              textAlign={'center'}
                              spacing={{ base: 8, md: 14 }}
                              py={{ base: 20, md: 28 }}>
                              <Stack spacing={5}>
                                    <Heading
                                          fontWeight={400}
                                          fontSize={{ base: '2xl', sm: '4xl', md: '6xl', lg: '6xl' }}
                                          lineHeight={'110%'}>
                                          Welcome To
                                          <Text as={'span'} color={'orange.400'}>
                                                {" "} Tarpaulin
                                          </Text>
                                    </Heading>
                                    <Heading
                                          fontWeight={300}
                                          fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: "2xl" }}>
                                          The
                                          <Text as={'i'} color={'orange.400'}>
                                                {" "}better
                                          </Text> Canvas
                                          <Text as={'span'} color={'orange.400'}>
                                                {" "} alternative.
                                          </Text>
                                    </Heading>
                              </Stack>
                              <Text color={useColorModeValue('gray.800', 'gray.200')} maxW={'3xl'} fontSize={{ base: 'sm', md: 'lg', lg: "2xl" }} fontWeight={300} mx={'auto'} lineHeight={'150%'}>
                                    <Text color={useColorModeValue('gray.800', 'gray.200')} fontSize={{ base: 'sm', md: 'lg', lg: "2xl" }} mx={'auto'} fontWeight={500}>
                                          Are you tired of the limitations and frustrations that come with Canvas? </Text> <br /><br /> Look no further, Tarpaulin is here to transform your online learning experience.
                                    Say goodbye to the outdated and clunky interface of CanvasLMS and embrace a more efficient, user-friendly, and powerful alternative.
                              </Text>
                              <Stack
                                    direction={'column'}
                                    spacing={3}
                                    align={'center'}
                                    alignSelf={'center'}
                                    position={'relative'}>
                                    <Button
                                          colorScheme={'green'}
                                          bg={'orange.400'}
                                          rounded={'full'}
                                          px={6}
                                          _hover={{
                                                bg: 'orange.500',
                                          }}
                                          onClick={() => navigate('/register')}
                                    >
                                          Get Started Today
                                    </Button>
                                    <Button variant={'link'} size={'sm'}>
                                          Learn more
                                    </Button>
                              </Stack>
                        </Stack>
                  </Container>
            </>
      );
}

