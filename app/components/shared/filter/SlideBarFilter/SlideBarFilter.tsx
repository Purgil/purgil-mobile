import { SlideBarProps } from '~/components/shared/SlideBar/SlideBar.tsx'
import React, { memo } from 'react'
import { View } from '~/components/styled'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'
import { SlideBar } from '~/components/shared'

type Props = {
  title: string
} & SlideBarProps

function SlideBarFilter({ title, ...props }: Props) {
  return (
    <View py={10}>
      <ListSubheader>{title}</ListSubheader>
      <SlideBar {...props} />
    </View>
  )
}

export default memo(SlideBarFilter)
