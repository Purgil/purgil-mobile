import { Button, View } from '~/components/styled'
import { Appbar } from 'react-native-paper'
import { RootScreenProps } from '~/navigation/types.ts'

export default function CreateActivityScreen({
  navigation,
}: RootScreenProps<'CreateActivity'>) {
  /** state */
  // const [step, setStep] = useState(0)

  return (
    <View flex={1} justifyContent='space-between'>
      <View>
        <Appbar.Header>
          <Appbar.Action icon='close' onPress={navigation.goBack} />
          {/*<Appbar.Content title='액티비티 생성' />*/}
        </Appbar.Header>
      </View>
      <View flexDirection='row' justifyContent='space-between' gap={10} pb={2}>
        <Button flex={1}>이전</Button>
        <Button flex={1} mode='contained'>
          다음
        </Button>
      </View>
    </View>
  )
}
