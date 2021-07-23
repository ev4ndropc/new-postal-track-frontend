import { Flex } from "@chakra-ui/react"

const Led = (props) => {
    return (
        <Flex 
            w="18px" 
            h="18px"
            borderRadius="50%"
            boxShadow="md"
            boxShadow={props.type == 'success' ? 'rgb(0 0 0 / 20%) 0 -1px 7px 1px, inset #1BC91B 0 -1px 9px, rgb(11 163 6 / 50%) 0 2px 12px' : props.type == 'danger' ? 'rgb(0 0 0 / 20%) 0 -1px 7px 1px, inset #F00000 0 -1px 9px, rgb(255 0 0 / 50%) 0 2px 12px' : 'rgb(0 0 0 / 20%) 0 -1px 7px 1px, inset #fbb032 0 -1px 9px, rgb(251 158 45 / 50%) 0 2px 12px'}
            bgColor={props.type == 'success' ? '#1BC91B' : props.type == 'danger' ? '#F00000' : '#fbb032' }>

        </Flex>
    )
}

export default Led