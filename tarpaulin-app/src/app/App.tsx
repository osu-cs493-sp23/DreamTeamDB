import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Courses from '../pages/Courses'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/main/Dashboard'
import Landing from '../pages/main/Landing'
import { fetchCourses } from '../redux/CourseSlice'
import DetailCourse from '../pages/DetailCourse'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchCourses() as any)
  }, [dispatch])
  
  return (
    <>
      <ColorModeSwitcher />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* {/* <Route path="/dashboard" element={<Content />} /> */}
            {/* 
            <Route path="/dashboard/courses" element={<Content />} />
            <Route path="/dashboard/submissions" element={<Content  />} />
            <Route path="/dashboard/timeline" element={<Content />} />
            <Route path="/dashboard/admin" element={<Content />} /> */}
            <Route path="/dashboard/courses" element={<Courses />} />
            <Route path="/dashboard/courses/:courseId" element={<DetailCourse />} />
          </Route>
        </>
      </Routes>
    </>
  )
}

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex pos={'absolute'} top={2} right={90} zIndex={999}>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <BsMoonStarsFill /> : <BsFillSunFill />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

export default App
