import { Text } from 'react-native-paper'
import { Button, View } from '~/components/styled'
import ActionSheet from '~/components/basic/ActionSheet.tsx'
import React, { useState } from 'react'

function SocialScreen() {
  const [visible, setVisible] = useState(true)
  return (
    <View flex={1}>
      <Text>SocialScreen</Text>
      <Button onPress={() => setVisible(true)}>show</Button>
      {visible && (
        <ActionSheet visible={visible} setVisible={setVisible}>
          <Text>123</Text>
        </ActionSheet>
      )}
    </View>
  )
}

export default SocialScreen
