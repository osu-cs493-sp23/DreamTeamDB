import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Landing from '../pages/main/Landing'
import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'

function App() {
  return (
    <>
      <ColorModeSwitcher />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex pos={'absolute'} top={0} right={0} m={5} zIndex={999}>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <BsMoonStarsFill /> : <BsFillSunFill />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

export default App
