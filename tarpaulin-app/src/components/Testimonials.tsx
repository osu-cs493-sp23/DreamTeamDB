import {
      Avatar,
      Box,
      chakra,
      Container,
      Flex,
      Icon,
      SimpleGrid,
      useColorModeValue,
} from '@chakra-ui/react';


const testimonials = [
      {
            name: 'Dr. Emily P.',
            role: 'Professor of Biology',
            content: "Tarpaulin has revolutionized my online teaching experience. Its user-friendly interface and powerful course creation tools have made managing my courses a breeze. The personalized learning experience it offers has greatly improved student engagement and success. I can't imagine teaching without it!",
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
      },
      {
            name: 'Sophie M.',
            role: 'Major in Computer Science',
            content: "As a computer science student, Tarpaulin has been instrumental in my learning journey. The interactive modules and collaborative features have made complex concepts easy to grasp. The seamless integration of assignments and feedback has enhanced my understanding and skill development. Tarpaulin is an invaluable tool for any aspiring technologist!",
            avatar: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      {
            name: 'Dr. Michael H.',
            role: 'Professor of History',
            content: "Tarpaulin has completely transformed the way I teach history online. Its intuitive interface and advanced customization options have made it effortless for me to create engaging lessons and assessments. The seamless integration of multimedia resources has enriched the learning experience for my students. Tarpaulin is an indispensable asset for educators in the digital age!",
            avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      {
            name: 'Sam W.',
            role: 'Major in English Literature',
            content: "Tarpaulin has been a game-changer for my literature studies. The platform's immersive reading experience and interactive discussions have deepened my understanding of literary works. The ability to collaborate with classmates and receive personalized feedback has enhanced my critical analysis skills. Tarpaulin has ignited my passion for literature!",
            avatar: 'https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJhY2tncm91bmQlMjBwb3N0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
];


const backgrounds = [
      'url("https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMHBvc3R8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")',
      'url("https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZCUyMHBvc3R8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")',
      'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fGJhY2tncm91bmQlMjBwb3N0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")',
      'url("https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJhY2tncm91bmQlMjBwb3N0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")',
]

interface TestimonialCardProps {
      name: string;
      role: string;
      content: string;
      avatar: string;
      index: number;
}

function TestimonialCard(props: TestimonialCardProps) {
      const { name, role, content, avatar, index } = props;
      return (
            <Flex
                  boxShadow={'lg'}
                  maxW={'640px'}
                  direction={{ base: 'column-reverse', md: 'row' }}
                  width={'full'}
                  rounded={'xl'}
                  p={10}
                  justifyContent={'space-between'}
                  position={'relative'}
                  bg={useColorModeValue('white', 'gray.800')}
                  _after={{
                        content: '""',
                        position: 'absolute',
                        height: '21px',
                        width: '29px',
                        left: '35px',
                        top: '-10px',
                        backgroundSize: 'cover',
                        backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
                  }}
                  _before={{
                        content: '""',
                        position: 'absolute',
                        zIndex: '-1',
                        height: 'full',
                        maxW: '640px',
                        width: 'full',
                        filter: 'blur(15px)',
                        transform: 'scale(0.98)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        top: 0,
                        left: 0,
                        backgroundImage: backgrounds[index % 4],
                  }}>
                  <Flex
                        direction={'column'}
                        textAlign={'left'}
                        justifyContent={'space-between'}>
                        <chakra.p
                              fontFamily={'Inter'}
                              fontWeight={'medium'}
                              fontSize={'15px'}
                              pb={4}>
                              {content}
                        </chakra.p>
                        <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
                              {name}
                              <chakra.span
                                    fontFamily={'Inter'}
                                    fontWeight={'medium'}
                                    color={'gray.500'}>
                                    {' '}
                                    - {role}
                              </chakra.span>
                        </chakra.p>
                  </Flex>
                  <Avatar
                        src={avatar}
                        height={'80px'}
                        width={'80px'}
                        alignSelf={'center'}
                        m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
                  />
            </Flex>
      );
}

export default function Testimonials() {
      return (
            <Flex
                  textAlign={'center'}
                  pt={16}
                  justifyContent={'center'}
                  direction={'column'}
                  width={'full'}
                  overflow={'hidden'}>
                  <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                        <chakra.h1
                              py={5}
                              fontSize={48}
                              fontWeight={'bold'}
                              color={useColorModeValue('gray.700', 'gray.50')}>
                              You're in good company.
                        </chakra.h1>
                        <chakra.h3
                              fontWeight={'bold'}
                              fontSize={20}
                              py={2}
                              textTransform={'uppercase'}
                              color={'orange.400'}>
                              Our customers love us
                        </chakra.h3>
                        <chakra.h2
                              margin={'auto'}
                              width={'70%'}
                              fontWeight={'medium'}
                              color={useColorModeValue('gray.500', 'gray.400')}>
                              See why {' '}
                              <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
                                    our customers
                              </chakra.strong>{' '}
                              love using Tarpaulin through their testimonials.
                        </chakra.h2>
                  </Box>
                  <SimpleGrid
                        columns={{ base: 1, xl: 2 }}
                        spacing={'20'}
                        mt={16}
                        mb={16}
                        mx={'auto'}>
                        {testimonials.map((cardInfo, index) => (
                              <TestimonialCard {...cardInfo} index={index} />
                        ))}
                  </SimpleGrid>
            </Flex>
      );
}