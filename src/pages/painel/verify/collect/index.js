import {
    Flex,
    Text,
    Table,
    Tbody,
    Td,
    Button,
    Th,
    Thead,
    Tr,
    Input,
    Badge,
    FormControl,
    Skeleton,
} from '@chakra-ui/react'

import cookie from 'cookie'

import Header from '../../../../components/Header'
import Content from '../../../../components/Content'
import Topbar from '../../../../components/Topbar'
import Sidebar from '../../../../components/Sidebar'

import { FaArrowLeft, FaArrowRight, FaFileDownload } from 'react-icons/fa'

const VerifyCollect = () => {
    return (
        <Content>
            <Header pageTitle="Verificar Coletas"/>
            <Sidebar/>
            <Topbar/>
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="absolute"
                w="100%"
                h="100%"
                paddingLeft="320px"
                top="90px"
                justifyContent="center"
            >
                <Flex 
                    justifyContent="center"  
                    alignItems="flex-start" 
                    flexDir="row" 
                    p="24px" 
                    w="100%" 
                    maxH="400px"
                    maxW="1500px"
                >
                    <Flex w="100%" background="#fff" flexDir="column" boxShadow="md" borderRadius="md">
                        <Flex w="100%" p="12px" flexDir="row" justifyContent="space-between">
                            <Text fontSize="24px" fontWeight="bold" >Pacotes Bipados</Text>

                            <Flex flexDir="column">
                                <Text>Total coletado:</Text>
                                <Badge textAlign="center" variant="solid" colorScheme="yellow">187</Badge>
                            </Flex>

                            <Flex flexDir="column">
                                <Text>Total não coletado:</Text>
                                <Badge textAlign="center" variant="solid" colorScheme="yellow">0</Badge>
                            </Flex>

                            <Flex>
                                <FormControl m="0 0.5rem" maxW="250px" id="date" display="flex" justifyContent="center" flexDir="row">
                                    <Button mr="0.5rem" colorScheme="green" >
                                        <FaFileDownload/>
                                    </Button>
                                    <Input type="date" />
                                </FormControl>

                                <FormControl m="0 0.5rem" maxW="250px" id="find" display="flex" justifyContent="center" flexDir="row">
                                    <Input type="text" placeholder="Procurar..." />
                                </FormControl>
                            </Flex>
                        </Flex>
                        <Flex w="100%" m="0.5rem 0" p="12px">
                            <Button m="0.5rem 0" colorScheme="green">Marcar como coletado</Button>
                            <Button m="0.5rem 0" colorScheme="yellow">Marcar como nao coletado</Button>
                        </Flex>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Pacote</Th>
                                    <Th>Canal de Vendas</Th>
                                    <Th>Coletado</Th>
                                    <Th>Data</Th>
                                    <Th>Ações</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Skeleton height="50px"></Skeleton>
                                    </Td>
                                    <Td>
                                        <Skeleton height="50px"></Skeleton>
                                    </Td>
                                    <Td>
                                        <Skeleton height="50px"></Skeleton>
                                        {/* <Badge variant="solid" colorScheme="green">Coletado</Badge> */}
                                    </Td>
                                    <Td>
                                        <Skeleton height="50px"></Skeleton>
                                    </Td>
                                    <Td display="flex"flexDir="column">
                                        <Skeleton height="50px"></Skeleton>
                                        {/* <Button colorScheme="blue" m="2px 0" >Editar</Button>
                                        <Button colorScheme="red" m="2px 0" >Apagar</Button> */}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        <Flex w="100%" p="12px">
                            <Flex w="100%" justifyContent="center" alignItems="center">
                                <Button>
                                    <FaArrowLeft/>
                                </Button>

                                <Flex maxW="320px">
                                    <Text m="0.5rem">Página</Text>
                                    <Input placeholder="Numéro da página"/>
                                    <Text m="0.5rem" minW="50px">de 150</Text>
                                </Flex>

                                <Button>
                                    <FaArrowRight/>
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Content>
    )
}

export const getServerSideProps = async (context) => {
    let cookies = ''
  
    cookies = context.req.headers.cookie

    cookies = cookie.parse(cookies)
    
    
    if(!cookies.token){
      return {
          redirect: {
              permanent: false,
              destination: '/auth/signin'
            }
        }
    }

    
    //const info = await fetch(config.base_api+'/user/info', {
    //    headers: {
    //        'Authorization': `Bearer ${cookies.token}`
    //    }
    //})
    
    //const json = await info.json()


    //if(json.ok == false) {
    //  return {
    //    redirect: {
    //      permanent: false,
    //      destination: '/auth/signin'
    //    }
    //  }
    //}
  
    return {props: { ok: true }}
}

export default VerifyCollect