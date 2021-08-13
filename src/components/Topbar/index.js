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
    Badge
} from '@chakra-ui/react'  

import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { BiMoon, BiHelpCircle } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { VscSignOut } from 'react-icons/vsc'
import { FaCoins } from 'react-icons/fa'

import Notification from '../Notification'

const Topbar = (props) => {
    return (
        <Flex 
            bgColor="#fff" 
            w="100%" 
            h="90px" 
            p="0 24px" 
            alignItems="center" 
            justifyContent="space-between"
            zIndex="99"
            transition="0.2s"
        >
            <Flex>
                <Button >
                    <HiOutlineMenuAlt1 size="20px" />
                </Button>
            </Flex>
            <Flex justifyContent="center" alignItems="center" color="text.primary" >
                <Button mr="1rem">
                    <BiMoon size="26px" />
                </Button>

                <Notification/>

                <Flex mr="1rem" flexDir="column" justifyContent="center" alignItems="center">
                    <Button color="text.primary" _hover={{ color: "white", background: "green.300" }}>
                        <FaCoins size="20px" />
                        <Text ml="0.5rem">R$ 497.15</Text>
                    </Button>
                </Flex>

                <Menu >
                    <MenuButton cursor="pointer"  as={Avatar} src="https://postaltrack.com.br/img/avatars/avatar1592514063706.png" />
                    <MenuList>
                        <MenuItem>
                            <CgProfile size="20px" />
                            <Text ml="0.6rem">Perfil</Text>
                        </MenuItem>
                        <MenuItem>
                            <BiHelpCircle size="20px" />
                            <Text ml="0.6rem">Ajuda</Text>
                        </MenuItem>
                        <MenuDivider size="20px" />
                        <MenuItem>
                            <VscSignOut size="20px" />
                            <Text ml="0.6rem">Sair</Text>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default Topbar