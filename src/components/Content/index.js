import {
    Flex
} from '@chakra-ui/react'

const Content = ({ children }) => {
    return (
        <Flex m="0" p="0" maxW="100%" bgColor="gray.100" w="100%" h="100vh">
            {children}
        </Flex>
    )
}

export default Content