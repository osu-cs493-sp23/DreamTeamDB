import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Landing from '../pages/main/Landing'
import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import Dashboard, { Content } from '../pages/main/Dashboard'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function App() {
  // const { user } = useContext(UserContext);
  // const role = user?.role;
  return (
    <>
      <ColorModeSwitcher />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<Content />} />
            <Route path="/dashboard/courses" element={<Content />} />
            <Route path="/dashboard/submissions" element={<Content  />} />
            <Route path="/dashboard/timeline" element={<Content />} />
            <Route path="/dashboard/admin" element={<Content />} />
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
