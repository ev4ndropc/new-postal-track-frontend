import {
    Flex,
    Img,
    Text,
} from '@chakra-ui/react'

import cookie from 'cookie'

import Header from '../../../components/Header'
import Content from '../../../components/Content'
import Topbar from '../../../components/Topbar'
import Sidebar from '../../../components/Sidebar'

const Home = () => {
    return (
        <Content>
            <Header pageTitle="Dashboard"/>
            <Sidebar/>
            <Topbar/>
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="absolute"
                w="100%"
                h="100%"
                paddingLeft="320px"
                top="90px"
            >
                <Flex justifyContent="center" alignItems="flex-start" flexDir="row" p="24px" w="100%" maxH="400px">
                    <Flex 
                        w="25%" 
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
                        w="25%" 
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
                    <Flex 
                        w="25%" 
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
                        w="25%" 
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

export default Home