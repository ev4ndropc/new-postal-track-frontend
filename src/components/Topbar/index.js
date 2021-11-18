import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Avatar,
  Flex,
  Button,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  chakra,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CountUp from 'react-countup'


import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { BiMoon, BiHelpCircle } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { VscSignOut } from 'react-icons/vsc'
import { FaCoins } from 'react-icons/fa'

import Notification from '../Notification'

import { doLogout } from '../../helpers/AuthHandler'
import useApi from '../../helpers/Api'


const Topbar = (props) => {
  const router = useRouter()
  const api = useApi()
  const toast = useToast()
  const dispatch = useDispatch()


  const { isOpen, onOpen, onClose } = useDisclosure()

  const avatar = useSelector(state => state.user.avatar)
  const balance = useSelector(state => state.user.balance)
  const store_name = useSelector(state => state.user.storeName)

  const [storeName, setStoreName] = useState('')


  const handleLogout = () => {
    doLogout()
    router.push('/auth/signin')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(storeName.trim() == ''){
      toast({
        title: "Preencha todos os campos.",
        description: "Digite o nome da loja e tente novamente.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const res = await api.updateStoreName(storeName)
    if(res.ok){
      toast({
        title: "Nome definido",
        description: "O nome da loja foi definido com sucesso, você pode altera-lo a qualquer momento no seu perfil.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      dispatch({
        type: 'SET_STORE_NAME',
        payload: { storeName: storeName}
      })

      onClose()
      return
    }else if(res.message.includes('error occurred')){
      toast({
        title: "Erro!",
        description: "Ocorreu algum erro, entre em contato com o suporte.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }else{
      toast({
        title: "Atenção!",
        description: "Preencha o campo do nome da loja corretamente.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })
      return
    }
  }

  const showModalToSetStoreName = () => {
    onOpen()
  }


  useEffect(() => {
    if (!store_name) showModalToSetStoreName()
  }, [])

  return (
    <>
      <Flex
        bgColor="#fff"
        w="100%"
        h="90px"
        p="0 24px"
        alignItems="center"
        justifyContent="space-between"
        zIndex="9"
        transition="0.2s"
        top="0px"
        pl="344px"
        className={`topbar ${props.close ? 'close' : 'open'}`}
      >
        <Flex>
          <Button className="close-topbar" onClick={() => props.setClose(!props.close)}>
            <HiOutlineMenuAlt1 size="20px" />
          </Button>
        </Flex>
        <Flex justifyContent="center" alignItems="center" color="text.primary" >
          <Button>
            <BiMoon size="26px" />
          </Button>

          <Notification />

          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Button color="text.primary" _hover={{ color: "white", background: "green.300" }}>
              <FaCoins size="20px" />
              <Text ml="0.5rem">
                <CountUp
                  start={0.00}
                  end={balance}
                  duration={0.3}
                  decimals={2}
                  prefix="R$ "
                />
              </Text>
            </Button>
          </Flex>

          <Menu >
            <MenuButton cursor="pointer" size="md" as={Avatar} src={`/assets/images/avatar/${avatar}`} />
            <MenuList>
              <Link href="/painel/profile">
                <MenuItem>
                  <CgProfile size="20px" />
                  <Text ml="0.6rem">Perfil</Text>
                </MenuItem>
              </Link>
              <MenuItem onClick={() => window.open('https://api.whatsapp.com/send/?phone=5522999039468&text=Ol%C3%A1,%20preciso%20de%20ajuda%20na%20postaltrack.com.br&app_absent=0', '_bank')}>
                <BiHelpCircle size="20px" />
                <Text ml="0.6rem">Ajuda</Text>
              </MenuItem>
              <MenuDivider size="20px" />
              <MenuItem onClick={handleLogout}>
                <VscSignOut size="20px" />
                <Text ml="0.6rem">Sair</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <chakra.form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Defina o nome do seu estabelecimento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="store_name">
                <Input value={storeName} onChange={e => setStoreName(e.target.value)} type="text" placeholder="Minha loja"/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Fechar
              </Button>
              <Button type="submit" colorScheme="yellow" >Salvar</Button>
            </ModalFooter>
          </ModalContent>
        </chakra.form>
      </Modal>
    </>
  )
}

export default Topbar
