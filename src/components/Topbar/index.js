import Link from 'next/link'
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
import { useSelector } from 'react-redux'

import CountUp from 'react-countup'


import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { BiMoon, BiHelpCircle } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { VscSignOut } from 'react-icons/vsc'
import { FaCoins } from 'react-icons/fa'

import Notification from '../Notification'

const Topbar = (props) => {
    const avatar = useSelector(state => state.user.avatar)
    const balance = useSelector(state => state.user.balance)
    return (
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

                <Notification/>

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
                    <MenuButton cursor="pointer" size="md"  as={Avatar} src={`/assets/images/avatar/${avatar}`} />
                    <MenuList>
                        <MenuItem>
                            <Link href="/painel/profile">
                                <>
                                    <CgProfile size="20px" />
                                    <Text ml="0.6rem">Perfil</Text>
                                </>
                            </Link>
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