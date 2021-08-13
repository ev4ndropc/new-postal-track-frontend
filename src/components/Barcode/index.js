import React from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Button, chakra, Flex, Text } from '@chakra-ui/react'

function BarReader(props) {
  return (
    <chakra.div p="24px" w="100%" height="150px" overflow="hidden" display="flex" justifyContent="center" alignItems="center" mt="2rem" >
      <BarcodeScannerComponent
        width={'100%'}
        height={150}
        onUpdate={(err, result) => {
          if (result) {
            props.setData(result.text)
            return props.handleSubmit()
          }
          else null
        }}
      />
    </chakra.div>
  );
}

export default BarReader;