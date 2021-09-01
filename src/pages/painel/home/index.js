import {
    Flex,
    Img,
    Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'


import CountUp from 'react-countup'

import cookie from 'cookie'
import Content from '../../../components/Content'
import useApi from '../../../helpers/Api'


const Home = () => {
    const socket = io('http://localhost:3333', { transports: ['websockets'] })


    const api = useApi()

    const [data, setData] = useState({ info: {
        track_package: 0,
        limit_package: 0,
        on_my_way_package: 0,
        delivered_package: 0
    } })

    useEffect(() => {

        const getData = async () => {
            const res = await api.getPackageInfo()
            setData(res)
        }

        socket.emit('message', 'teste')

        getData()
    },[])
    
    return (
        <Content pageTitle="Dashboard">
            <Flex 
                bgGradient="linear(to-b, #f1f1f1, #fff)"
                position="relative"
                w="100%"
                h="100%"
            >
                <Flex className="container-statistics" justifyContent="flex-start" alignItems="flex-start" flexDir="row" p="24px" w="100%">
                    
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
                            <br/>
                            <Flex w="100%" fontSize="38px" color="yellow.400">
                                <CountUp
                                  start={0}
                                  end={data.info.track_package}
                                  duration={0.3}
                                />
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
                                <CountUp
                                  start={0}
                                  end={data.info.limit_package-data.info.track_package}
                                  duration={0.3}
                                />
                            </Flex>
                            <Flex alignItems="flex-end" justifyContent="space-between">
                                <Text>Você pode rastrear mais <strong>{<CountUp start={0} end={data.info.limit_package-data.info.track_package} duration={0.3} />}</strong> pacotes.</Text>
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
                                <CountUp
                                  start={0}
                                  end={data.info.on_my_way_package}
                                  duration={0.3}
                                />
                            </Flex>
                            <Flex alignItems="flex-end" justifyContent="space-between">
                                <Text><strong>{<CountUp start={0} end={data.info.on_my_way_package} duration={0.3} />}</strong> pacotes a caminho</Text>
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
                                <CountUp
                                  start={0}
                                  end={data.info.delivered_package}
                                  duration={0.3}
                                />
                            </Flex>
                            <Flex alignItems="flex-end" justifyContent="space-between">
                                <Text><strong>{<CountUp start={0} end={data.info.delivered_package} duration={0.3} />}</strong> pacotes entregues</Text>
                                <Img w="100px" src="/assets/images/finish.png" />
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

    try {
        cookies = cookie.parse(cookies)
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: '/auth/signin'
              }
          }
    }
    
    
    if(!cookies.token){
      return {
          redirect: {
              permanent: false,
              destination: '/auth/signin'
            }
        }
    }

    
    // const info = await fetch(config.base_api+'/user/info', {
    //    headers: {
    //        'Authorization': `Bearer ${cookies.token}`
    //    }
    // })
    
    // const json = await info.json()


    // if(json.ok == false) {
    //  return {
    //    redirect: {
    //      permanent: false,
    //      destination: '/auth/signin'
    //    }
    //  }
    // }
  
    return {props: { ok: true }}
}

export default Home