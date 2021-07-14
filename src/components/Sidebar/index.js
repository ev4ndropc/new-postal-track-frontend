import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    Button,
    Flex,
    Img,
    List,
    ListItem,
    Text,
} from '@chakra-ui/react'

import { BiHome } from 'react-icons/bi'
import { FiUsers, FiTruck, FiHelpCircle } from 'react-icons/fi'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { GoPackage } from 'react-icons/go'
import { BsCardChecklist } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'

import { doLogout } from '../../helpers/AuthHandler'

const Sidebar = () => {
    const router = useRouter()

    const handleLogout = () => {
        doLogout()
        router.push('/auth/signin')
    }

    return (
        <Flex 
            w="320px"
            minW="320px"
            h="100vh" 
            borderRightWidth="1px" 
            paddingInlineStart="1.5rem" 
            paddingInlineEnd="1.5rem" 
            paddingTop="2rem"
            paddingBottom="2rem"
            flexDir="column"
            background="white"
            zIndex="99"
        >
            <Flex paddingBottom="2rem" justifyContent="center" alignItems="center">
                <Img maxW="200px" src="/assets/images/logo.png" alt="Postal Track Logo" />
            </Flex>

            <Flex alignItems="flex-start" w="100%" h="100vh" flexDir="column">
                <List spacing={4} w="100%" fontSize="22px" color="text.primary">
                    <Link href="/painel/home">
                        <ListItem 
                            display="Flex"
                            alignItems="center" 
                            w="100%" 
                            cursor="pointer" 
                            p="12px"
                            borderRadius="md"
                            transition="padding .2s ease"
                            background={router.pathname == '/painel/home' ? 'yellow.400' : ''}
                            color={router.pathname == '/painel/home' ? 'white' : ''}
                            _hover={{ paddingLeft: '16px', background: 'yellow.400', color: 'white' }}
                        >
                            <BiHome size="22px" color="yellow.500" />
                            <Text ml="1rem">Inicio</Text>
                        </ListItem>
                    </Link>
                    <Link href="/painel/customers">
                        <ListItem 
                            display="Flex"
                            alignItems="center" 
                            w="100%" 
                            cursor="pointer" 
                            p="12px"
                            borderRadius="md"
                            transition="padding .2s ease"
                            background={router.pathname == '/painel/customers' ? 'yellow.400' : ''}
                            color={router.pathname == '/painel/customers' ? 'white' : ''}
                            _hover={{ paddingLeft: '16px', background: 'yellow.400', color: 'white' }}
                        >
                            <FiUsers size="22px" color="yellow.500" />
                            <Text ml="1rem">Clientes</Text>
                        </ListItem>
                    </Link>
                    <Link href="/painel/list/package">
                        <ListItem 
                            display="Flex"
                            alignItems="center" 
                            w="100%" 
                            cursor="pointer" 
                            p="12px"
                            borderRadius="md"
                            transition="padding .2s ease"
                            background={router.pathname == '/painel/list/package' ? 'yellow.400' : ''}
                            color={router.pathname == '/painel/list/package' ? 'white' : ''}
                            _hover={{ paddingLeft: '16px', background: 'yellow.400', color: 'white' }}
                        >
                            <HiOutlineClipboardList size="22px" color="yellow.500" />
                            <Text ml="1rem">Lista de Pacotes</Text>
                        </ListItem>
                    </Link>
                    <Link href="/painel/add/package">
                        <ListItem 
                            display="Flex"
                            alignItems="center" 
                            w="100%" 
                            cursor="pointer" 
                            p="12px"
                            borderRadius="md"
                            transition="padding .2s ease"
                            background={router.pathname == '/painel/add/package' ? 'yellow.400' : ''}
                            color={router.pathname == '/painel/add/package' ? 'white' : ''}
                            _hover={{ paddingLeft: '16px', background: 'yellow.400', color: 'white' }}
                        >
                            <GoPackage size="22px" color="yellow.500" />
                            <Text ml="1rem">Adicionar Pacote</Text>
                        </ListItem>
                    </Link>
                    <Link href="/painel/register/collect">
                        <ListItem 
                            display="Flex"
                            alignItems="center" 
                            w="100%" 
                            cursor="pointer" 
                            p="12px"
                            borderRadius="md"
                            transition="padding .2s ease"
                            background={router.pathname == '/painel/register/collect' ? 'yellow.400' : ''}
                            color={router.pathname == '/painel/register/collect' ? 'white' : ''}
                            _hover={{ paddingLeft: '16px', background: 'yellow.400', color: 'white' }}
                        >
                            <FiTruck size="22px" color="yellow.500" />
                            <Text ml="1rem">Registrar Coleta</Text>
                        </ListItem>
                    </Link>
                    <Link href="/painel/verify/collect">
                        <ListItem 
                            display="Flex"
                            alignItems="center" 
                            w="100%" 
                            cursor="pointer" 
                            p="12px"
                            borderRadius="md"
                            transition="padding .2s ease"
                            background={router.pathname == '/painel/verify/collect' ? 'yellow.400' : ''}
                            color={router.pathname == '/painel/verify/collect' ? 'white' : ''}
                            _hover={{ paddingLeft: '16px', background: 'yellow.400', color: 'white' }}
                        >
                            <BsCardChecklist size="22px" color="yellow.500" />
                            <Text ml="1rem">Verificar Coletas</Text>
                        </ListItem>
                    </Link>
                    <ListItem 
                        display="Flex"
                        alignItems="center" 
                        w="100%" 
                        cursor="pointer" 
                        p="12px"
                        borderRadius="md"
                        transition="padding .2s ease"
                        _hover={{ paddingLeft: '16px', background: 'yellow.400', color: 'white' }}
                        onClick={handleLogout}
                    >
                        <VscSignOut size="22px" color="yellow.500" />
                        <Text ml="1rem">Sair</Text>
                    </ListItem>
                </List>

                <Flex w="100%" justifyContent="center" mt="3rem">
                    <Button size="lg" leftIcon={<FiHelpCircle/>} colorScheme="yellow" color="white" p="16px 24px">
                        Duvidas?
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Sidebar