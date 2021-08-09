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
    chakra
} from '@chakra-ui/react'  

import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { BsBell } from 'react-icons/bs'
import { BiMoon, BiHelpCircle } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { VscSignOut } from 'react-icons/vsc'

const Topbar = () => {
    return (
        <Flex 
            bgColor="#fff" 
            w="100%" 
            h="90px" 
            p="0 24px" 
            alignItems="center" 
            justifyContent="space-between"
            zIndex="99"
        >
            <Flex>
                <Button>
                    <HiOutlineMenuAlt1 size="20px" />
                </Button>
            </Flex>
            <Flex justifyContent="center" alignItems="center" color="text.primary" >
                <Button mr="1rem">
                    <BiMoon size="26px" />
                </Button>
                <Button mr="1rem">
                    <BsBell size="26px" />
                    <chakra.span 
                        bgColor="red" 
                        w="24px" 
                        h="24px" 
                        borderRadius="50%" 
                        position="absolute"
                        top="-14px"
                        right="-2px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="10px"
                        color="white"
                        fontWeight="700"
                    >99+</chakra.span>
                </Button>

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