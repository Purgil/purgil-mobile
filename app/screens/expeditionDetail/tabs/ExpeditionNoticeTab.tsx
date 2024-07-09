import { Button, Text, View } from '~/components/styled'
import { memo, useCallback } from 'react'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'
import { useTheme } from 'react-native-paper'
import { FlatList } from 'react-native'
import { notices } from '~/screens/expeditionDetail/consts.ts'
import { ExpeditionNoticeData } from '~/core/dto/expedition/expedition.data'
import ExpeditionNoticeItem from '~/screens/expeditionDetail/components/ExpeditionNoticeItem.tsx'

type Props = {
  id: number
}

function ExpeditionNoticeTab({ id }: Props) {
  const { colors } = useTheme()

  const renderNoticeItem = useCallback(
    ({ item }: { item: ExpeditionNoticeData }) => (
      <ExpeditionNoticeItem notice={item} />
    ),
    [],
  )

  return (
    <View justifyContent='space-between' flex={1}>
      <View>
        <ListSubheader>
          공지{' '}
          <Text color={colors.outline} fontSize={13}>
            5
          </Text>
        </ListSubheader>

        <FlatList
          keyExtractor={item => item.id.toString()}
          data={notices}
          renderItem={renderNoticeItem}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      </View>

      <View p={12}>
        <Button mode='contained-tonal' onPress={() => {}}>
          공지 등록
        </Button>
      </View>
    </View>
  )
}

export default memo(ExpeditionNoticeTab)
