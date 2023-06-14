/* eslint-disable react-hooks/rules-of-hooks */
import {
      Avatar,
      Box,
      BoxProps,
      Drawer,
      DrawerContent,
      DrawerOverlay,
      Flex,
      Heading,
      Icon,
      IconButton,
      SimpleGrid,
      Text,
      useColorMode,
      useColorModeValue,
      useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from "react";
import { AiOutlineHome, AiOutlineTeam } from 'react-icons/ai';
import { BsCalendarCheck, BsFolder2 } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { FcReading } from 'react-icons/fc';
import { FiMenu } from 'react-icons/fi';
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AssignmentCard } from "../../components/cards/Assignment";
import CourseCard from '../../components/cards/Course';
import { UserContext } from "../../context/UserContext";
import useCourses from '../../hooks/useCourses';
import { Course } from '../../types';
import AddCourse from '../admin/AddCourse';
import UpdateCourse from '../admin/UpdateCourse';

interface ContentProps {
      role?: string;
}

export const Content: React.FC<ContentProps> = ({ role }) => {

      const location = useLocation();
      const path = location.pathname.split('/dashboard')[1];
      const { colorMode } = useColorMode()
      // const [coursesList, setCoursesList] = React.useState<any[]>([]);

      const { courses, setCourses } = useCourses(1, "", "", "");

      // React.useEffect(() => {
      //       console.log(courses)
      //       setCoursesList(courses);
      // }, [courses])

      const deleteCourse = async (e: React.FormEvent<HTMLButtonElement>) => {
            const token = localStorage.getItem('token')
            e.preventDefault()
            try {
                  const response = await axios.delete(`http://localhost:8000/api/courses/${e.currentTarget.value}`, {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  })

                  if (response.status === 204) {
                        console.log('Course Deleted!')
                        setCourses(courses.filter((course: Course) => course._id !== e.currentTarget.value))
                  } else {
                        console.log('Something Went Wrong Deleting Course!')
                  }

            } catch (error) {
                  console.error(error)
            }
      }


      if (path === '/submissions') {
            return (
                  <>
                        <Heading fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}>{role && role.charAt(0).toUpperCase() + role.slice(1)} Assignments</Heading>
                        {/* <AssignmentCard/> */}
                  </>
            )
      } else if (path === '/courses') {
            const role = localStorage.getItem('role');
            return (
                  <>
                        <Heading fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}>{role && role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
                              {courses?.map((course: Course, index) => {
                                    return (
                                          <Box key={index} zIndex={1}>
                                                <CourseCard key={index} title={course.title} subject={course.subject} number={course.number} term={course.term} instructorId={course.instructorId} _id={course._id} deleteCourse={deleteCourse} />
                                          </Box>
                                    )
                              })}
                        </SimpleGrid>
                  </>
            )
      } else if (path === '/admin') {
            return (
                  <>
                        <Heading fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}>{role && role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
                              <AddCourse />
                              <UpdateCourse />
                        </SimpleGrid>
                  </>
            )

      } else if (path === '/timeline') {
            return (
                  <>
                        <Heading fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}>{role && role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</Heading>
                        <Text>Timeline</Text>
                  </>
            )
      } else {
            return (
                  <>
                        <Heading fontWeight={400} fontSize={{ base: '2xl', md: '4xl' }}>{role && role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
                              {courses?.map((course: Course, index) => {
                                    return (
                                          <Box key={index} zIndex={1}>
                                                <CourseCard key={index} title={course.title} subject={course.subject} number={course.number} term={course.term} instructorId={course.instructorId} _id={course._id} deleteCourse={deleteCourse} />
                                          </Box>
                                    )
                              })}
                        </SimpleGrid>
                  </>
            )
      }

}

const Dashboard: React.FC = () => {
      const { user } = useContext(UserContext);
      const { isOpen, onClose, onOpen } = useDisclosure();

      const role = user?.role;

      return (
            <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
                  <SidebarContent display={{ base: 'none', md: 'unset' }} />
                  <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                        <DrawerOverlay />
                        <DrawerContent>
                              <SidebarContent w="full" borderRight="none" />
                        </DrawerContent>
                  </Drawer>
                  <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                        <Flex
                              as="header"
                              align="center"
                              justify={{ base: 'space-between', md: 'flex-end' }}
                              w="full"
                              px="4"
                              borderBottomWidth="1px"
                              borderColor={useColorModeValue('inherit', 'gray.700')}
                              bg={useColorModeValue('white', 'gray.800')}
                              boxShadow="sm"
                              h="14"
                        >
                              <IconButton
                                    aria-label="Menu"
                                    display={{ base: 'inline-flex', md: 'none' }}
                                    onClick={onOpen}
                                    icon={<FiMenu />}
                                    size="md"
                              />

                              <Flex align="center">
                                    <Icon color="gray.500" as={FaBell} cursor="pointer" />
                                    <Avatar
                                          ml="4"
                                          size="sm"
                                          name="Ahmad"
                                          src="https://avatars.githubusercontent.com/u/46255836?v=4"
                                          cursor="pointer"
                                    />
                              </Flex>
                        </Flex>

                        <Box as="main" p={6} minH="25rem" bg={useColorModeValue('auto', 'gray.800')}>
                              <Outlet />
                        </Box>
                  </Box>
            </Box>
      );
}

const SidebarContent = ({ ...props }: BoxProps) => {

      const navigate = useNavigate();

      const { user, setUser } = useContext(UserContext);

      const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            setUser?.(null);
            navigate('/');
      }

      return (
            <Box
                  as="nav"
                  pos="fixed"
                  top="0"
                  left="0"
                  zIndex="sticky"
                  h="full"
                  pb="10"
                  overflowX="hidden"
                  overflowY="auto"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={useColorModeValue('inherit', 'gray.700')}
                  borderRightWidth="1px"
                  w="60"
                  {...props}
            >
                  <Flex px="4" py="5" align="center">
                        <Icon as={FcReading} h={8} w={8} />
                        <Text
                              fontSize="2xl"
                              ml="2"
                              fontWeight={300}
                              color={useColorModeValue('brand.500', 'white')}
                        >
                              Tarpaulin
                        </Text>
                  </Flex>
                  <Flex direction="column" as="nav" fontSize="md" color="gray.600" aria-label="Main Navigation" lineHeight={1.5} gap={4}>
                        <NavItem onClick={() => navigate('/dashboard')} icon={AiOutlineHome}>Dashboard</NavItem>
                        <NavItem onClick={() => navigate('/dashboard/courses')} icon={AiOutlineTeam}>Course List</NavItem>
                        <NavItem onClick={() => navigate('/dashboard/submissions')} icon={BsFolder2}>Submissions</NavItem>
                        <NavItem onClick={() => navigate('/dashboard/timeline')} icon={BsCalendarCheck}>Timeline View</NavItem>
                        {user?.role === 'admin' && <NavItem onClick={() => navigate('/dashboard/admin')} icon={MdAdminPanelSettings}>Admin</NavItem>}
                        <NavItem onClick={handleLogout} icon={AiOutlineHome}>Logout</NavItem>
                  </Flex>
            </Box>
      );
}

interface NavItemProps {
      icon?: React.ElementType;
      children?: React.ReactNode;
      onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = (props) => {
      const color = useColorModeValue('gray.600', 'gray.300');
      const { icon, children, onClick } = props;
      return (
            <Flex
                  align="center"
                  px="4"
                  onClick={onClick}
                  py="3"
                  cursor="pointer"
                  role="group"
                  fontWeight="semibold"
                  transition=".15s ease"
                  color={useColorModeValue('inherit', 'gray.400')}
                  _hover={{
                        bg: useColorModeValue('gray.100', 'gray.900'),
                        color: useColorModeValue('gray.900', 'gray.200')
                  }}
            >
                  {icon && (
                        <Icon
                              mx="2"
                              boxSize="4"
                              _groupHover={{
                                    color: color
                              }}
                              as={icon}
                        />
                  )}
                  {children}
            </Flex>
      );
};

export default Dashboard;