import { Text } from 'react-native-paper'
import { Button, View } from '~/components/styled'
import React, { useState } from 'react'

function SocialScreen() {
  const [visible, setVisible] = useState(true)
  return (
    <View flex={1}>
      <Text>SocialScreen</Text>
      <Button onPress={() => setVisible(true)}>show</Button>
    </View>
  )
}

export default SocialScreen
