import {
    Flex,
    Img,
    Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import cookie from 'cookie'

import Content from '../../../components/Content'


const Home = () => {
    return (
        <Content pageTitle="Dashboard">
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="relative"
                w="100%"
                h="100%"
            >
                <Flex className="container-statistics" justifyContent="center" alignItems="flex-start" flexDir="row" p="24px" w="100%" maxH="400px">
                    
                    <Flex w="100%" className="statistics-items">
                        <Flex 
                            w="50%" 
                            p="12px"
                            bgColor="white" 
                            borderRadius="md" 
                            boxShadow="md"
                            boxShadow="md" 
                            margin="6px"
                            flexDir="column"
                        >
                            <Flex w="100%" fontSize="38px" color="yellow.400">
                                6
                            </Flex>
                            <Flex alignItems="flex-end" justifyContent="space-between">
                                <Text>Pacotes sendo rastreados</Text>
                                <Img w="100px" src="/assets/images/package.png" />
                            </Flex>
                        </Flex>
                        <Flex 
                            w="50%" 
                            p="12px"
                            bgColor="white" 
                            borderRadius="md" 
                            boxShadow="md"
                            boxShadow="md" 
                            margin="6px"
                            flexDir="column"
                        >
                            <Flex w="100%" fontSize="38px" color="yellow.400">
                                50
                            </Flex>
                            <Flex alignItems="flex-end" justifyContent="space-between">
                                <Text>Você pode rastrear até <strong>50</strong> pacotes.</Text>
                                <Img w="100px" src="/assets/images/package-available.png" />
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex w="100%" className="statistics-items">
                        <Flex 
                            w="50%" 
                            p="12px"
                            bgColor="white" 
                            borderRadius="md" 
                            boxShadow="md"
                            boxShadow="md" 
                            margin="6px"
                            flexDir="column"
                        >
                            <Flex w="100%" fontSize="38px" color="yellow.400">
                                22
                            </Flex>
                            <Flex alignItems="flex-end" justifyContent="space-between">
                                <Text><strong>4</strong> pacotes a caminho</Text>
                                <Img w="100px" src="/assets/images/inprogress.png" />
                            </Flex>
                        </Flex>
                        <Flex 
                            w="50%" 
                            p="12px"
                            bgColor="white" 
                            borderRadius="md" 
                            boxShadow="md"
                            boxShadow="md" 
                            margin="6px"
                            flexDir="column"
                        >
                            <Flex w="100%" fontSize="38px" color="yellow.400">
                                17
                            </Flex>
                            <Flex alignItems="flex-end" justifyContent="space-between">
                                <Text><strong>2</strong> pacotes entregues</Text>
                                <Img w="100px" src="/assets/images/finish.png" />
                            </Flex>
                        </Flex>
                    </Flex>

                </Flex>
            </Flex>
        </Content>
    )
}

// export const getServerSideProps = async (context) => {
//     let cookies = ''
  
//     cookies = context.req.headers.cookie

//     try {
//         cookies = cookie.parse(cookies)
//     } catch (error) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: '/auth/signin'
//               }
//           }
//     }
    
    
//     if(!cookies.token){
//       return {
//           redirect: {
//               permanent: false,
//               destination: '/auth/signin'
//             }
//         }
//     }

    
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
  
//     return {props: { ok: true }}
// }

export default Home