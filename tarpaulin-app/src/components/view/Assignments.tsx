// {
//       assignmentList.map(({ courseId, title, points, due }) => (
//             <chakra.div key={courseId}>
//                   <HStack
//                         p={4}
//                         bg={useColorModeValue('white', 'gray.800')}
//                         rounded="xl"
//                         borderWidth="1px"
//                         borderColor={useColorModeValue('gray.100', 'gray.700')}
//                         w="100%"
//                         h="100%"
//                         textAlign="left"
//                         align="start"
//                         spacing={4}
//                         cursor="pointer"
//                         _hover={{ shadow: 'lg' }}
//                   >
//                         <Image
//                               src={"https://avatars.githubusercontent.com/u/46255836?v=4"}
//                               alt="avatar"
//                               fallbackSrc="https://via.placeholder.com/150"
//                               rounded="full"
//                               w={12}
//                               h={12}
//                               bg="gray.100"
//                               border="1px solid transparent"

//                         />
//                         <VStack align="start" justify="flex-start">
//                               <HStack>
//                                     <Text
//                                           as={Link}
//                                           href="#"
//                                           fontWeight="bold"
//                                           fontSize="md"
//                                           noOfLines={1}
//                                           onClick={(e) => {
//                                                 e.preventDefault();
//                                                 navigate(`/courses/${courseId}`);
//                                           }}
//                                           isExternal
//                                     >
//                                           {title}
//                                     </Text>
//                                     <Tag
//                                           size="sm"
//                                           ml={2}
//                                           colorScheme={due < new Date() ? 'red' : 'green'}
//                                           rounded="full"
//                                           variant="solid"
//                                     >
//                                           Due {due.toLocaleDateString()}
//                                     </Tag>
//                               </HStack>
//                               <Text fontSize="sm" color={textColor}>
//                                     {points} points
//                               </Text>
//                               <VStack mt={4} spacing={2} alignItems="flex-start">
//                                     <Menu isLazy>
//                                           <MenuButton>Assignment Actions</MenuButton>
//                                           <MenuList>
//                                                 {(role === 'instructor' || role === 'admin') ? (
//                                                       <>
//                                                             <MenuItem>Edit</MenuItem>
//                                                             <MenuDivider />
//                                                             <MenuItem>Delete</MenuItem>
//                                                             <MenuDivider />
//                                                             <MenuItem>View Submissions</MenuItem>
//                                                       </>
//                                                 ) : (
//                                                       <>
//                                                             <MenuItem>View</MenuItem>
//                                                             <MenuDivider />
//                                                             <MenuItem>Submit</MenuItem>
//                                                       </>
//                                                 )}
//                                           </MenuList>
//                                     </Menu>
//                               </VStack>
//                         </VStack>
//                   </HStack>
//             </chakra.div>
//       ))
// }