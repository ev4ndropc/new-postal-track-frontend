import { 
    Button, 
    Input, 
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    Text, 
    DrawerHeader, 
    DrawerOverlay, 
    useDisclosure, 
    chakra,
    Badge,
    Flex
} from "@chakra-ui/react"
import { useRef } from "react"

import { BsBell, BsCalendar } from 'react-icons/bs'


const Notification = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
  
    return (
      <>
        <Button ref={btnRef} onClick={onOpen}>
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
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader bg="yellow.300" color="white">
                <Text fontSize="15px">Olá! Tudo bem? Noticias atualizadas para vocês :)</Text>
                <Input 
                    mt="0.5rem" 
                    bg="yellow.400" 
                    color="white" 
                    border="none" 
                    placeholder="Pesquisar..."
                    _placeholder={{ color: 'white' }}
                    _focus={{
                        border: 'none'
                    }}
                 />
            </DrawerHeader>
  
            <DrawerBody>
                <Flex 
                  flexDir="column" 
                  p="1rem" 
                  mt="1rem" 
                  cursor="pointer" 
                  borderRadius="sm"
                  _hover={{ background: 'gray.50', boxShadow: 'md' }}
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Badge p="0.2rem 0.3rem" variant="solid" color="#ffd700" background="#ffd70020">Comunicados</Badge>
                        <Flex justifyContent="center" alignItems="center" color="#9f9f9f" fontSize="11px">
                          <Text mr="0.3rem">hoje</Text>
                          <BsCalendar/>
                        </Flex>
                    </Flex>
                    <Flex flexDir="column" mt="1rem">
                        <Text fontWeight="bold">
                          Via Marketplace - Ajustes na importação e cadastro de anúncios
                        </Text>
                        <Text mt="0.2rem" fontSize="14px">
                          Boa tarde, Seller! Fomos informados pelo marketplace Via Marketplace que estão no ar as correções necessárias para os erros que estavam apre...
                        </Text>
                    </Flex>
                    
                </Flex>

                <chakra.hr mt="1rem" />

                <Flex 
                  flexDir="column" 
                  p="1rem" 
                  mt="1rem" 
                  cursor="pointer" 
                  borderRadius="sm"
                  _hover={{ background: 'gray.50', boxShadow: 'md' }}
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Badge p="0.2rem 0.3rem" variant="solid" color="#0000ff" background="#0000ff20">Melhorias</Badge>
                        <Flex justifyContent="center" alignItems="center" color="#9f9f9f" fontSize="11px">
                          <Text mr="0.3rem">hoje</Text>
                          <BsCalendar/>
                        </Flex>
                    </Flex>
                    <Flex flexDir="column" mt="1rem">
                        <Text fontWeight="bold">
                          Declaração de conteúdo na impressora Zebra
                        </Text>
                        <Text mt="0.2rem" fontSize="14px">
                          Bom dia, Sellers! Para vocês que utilizam impressora Zebra para realizar a expedição, a partir de hoje, sempre que um pedido não tiver emiss...
                        </Text>
                    </Flex>
                    
                </Flex>

                <chakra.hr mt="1rem" />

                <Flex 
                  flexDir="column" 
                  p="1rem" 
                  mt="1rem" 
                  cursor="pointer" 
                  borderRadius="sm"
                  _hover={{ background: 'gray.50', boxShadow: 'md' }}
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Badge p="0.2rem 0.3rem" variant="solid" color="#32cd32" background="#32cd3220">Novidades</Badge>
                        <Flex justifyContent="center" alignItems="center" color="#9f9f9f" fontSize="11px">
                          <Text mr="0.3rem">hoje</Text>
                          <BsCalendar/>
                        </Flex>
                    </Flex>
                    <Flex flexDir="column" mt="1rem">
                        <Text fontWeight="bold">
                          Shopee - Nova versão de integração!
                        </Text>
                        <Text mt="0.2rem" fontSize="14px">
                        Olá, Sellers! Tudo bem? A Shopee disponibilizou uma nova versão de integração e nós já corremos nos homologar 🏃 😁  Esta nova versão contem...
                        </Text>
                    </Flex>
                </Flex>

                <chakra.hr mt="1rem" />

                <Flex 
                  flexDir="column" 
                  p="1rem" 
                  mt="1rem" 
                  cursor="pointer" 
                  borderRadius="sm"
                  _hover={{ background: 'gray.50', boxShadow: 'md' }}
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Badge p="0.2rem 0.3rem" variant="solid" color="#32cd32" background="#32cd3220">Novidades</Badge>
                        <Flex justifyContent="center" alignItems="center" color="#9f9f9f" fontSize="11px">
                          <Text mr="0.3rem">hoje</Text>
                          <BsCalendar/>
                        </Flex>
                    </Flex>
                    <Flex flexDir="column" mt="1rem">
                        <Text fontWeight="bold">
                          Shopee - Nova versão de integração!
                        </Text>
                        <Text mt="0.2rem" fontSize="14px">
                        Olá, Sellers! Tudo bem? A Shopee disponibilizou uma nova versão de integração e nós já corremos nos homologar 🏃 😁  Esta nova versão contem...
                        </Text>
                    </Flex>
                </Flex>

            </DrawerBody>
  
          </DrawerContent>
        </Drawer>
      </>
    )
}

export default Notification