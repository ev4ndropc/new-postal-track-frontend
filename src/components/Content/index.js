import { useRouter } from 'next/router'
import {
    Flex
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'


import Header from '../Header'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

const Content = (props) => {
    const router = useRouter()
    const [close, setClose] = useState(false)

    return (
        <>
            <Header pageTitle={props.pageTitle} />
            {router.pathname.includes('painel') &&
                <>
                    <Sidebar close={close} setClose={setClose} />
                    <Topbar close={close} setClose={setClose} />
                    <Flex
                        m="0"
                        p="0"
                        w="100%"
                        bgColor="gray.100"
                        h="100vh"
                        transition="0.2s"
                        className={`content ${close ? 'close' : 'open overlay'}`}
                    >
                        {props.children}
                    </Flex>
                </>
            }
            {!router.pathname.includes('painel') &&
                <Flex
                    m="0"
                    p="0"
                    w="100%"
                    bgColor="gray.100"
                    h="100vh"
                    transition="0.2s"
                    className={`content`}
                >
                    {props.children}
                </Flex>
            }
        </>
    )
}

export default Content
