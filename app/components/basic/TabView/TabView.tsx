import {
  TabBar,
  TabView as RNTabView,
  TabViewProps,
  TabBarProps,
  NavigationState,
} from 'react-native-tab-view'
import React, { useCallback, useState } from 'react'
import { Divider, useTheme } from 'react-native-paper'
import { View } from '~/components/styled'
import { StyleSheet } from 'react-native'

type Props = {
  routes: { key: string; title: string }[]
} & Omit<TabViewProps<any>, 'onIndexChange' | 'navigationState'>

function TabView({ routes, ...props }: Props) {
  const { colors } = useTheme()
  const [tabIndex, setTabIndex] = useState(0)

  const styles = StyleSheet.create({
    indicator: { backgroundColor: colors.onBackground },
    tabBar: { backgroundColor: '' },
    label: { color: colors.onBackground },
  })

  const renderTabBar = useCallback(
    (tabbarProps: TabBarProps<any>) => (
      <View>
        <TabBar
          {...tabbarProps}
          pressColor={colors.surfaceVariant}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
        />
        <Divider />
      </View>
    ),
    [],
  )

  return (
    <RNTabView
      {...props}
      collapsable
      renderTabBar={renderTabBar}
      navigationState={{ index: tabIndex, routes } as NavigationState<any>}
      onIndexChange={setTabIndex}
    />
  )
}

export default React.memo(TabView)
