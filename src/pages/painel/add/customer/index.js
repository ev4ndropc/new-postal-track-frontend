import {
    Flex,
    Img,
    Text,
} from '@chakra-ui/react'

import cookie from 'cookie'

import Header from '../../../../components/Header'
import Content from '../../../../components/Content'
import Topbar from '../../../../components/Topbar'
import Sidebar from '../../../../components/Sidebar'

const Customer = () => {
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
                left="320px"
                top="90px"
            >
                
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

export default Customer