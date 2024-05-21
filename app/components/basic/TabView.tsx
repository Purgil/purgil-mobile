import {
  TabBar,
  TabView as RNTabView,
  TabViewProps,
  TabBarProps,
  NavigationState,
} from 'react-native-tab-view'
import React, { useCallback, useMemo, useState } from 'react'
import { Divider, useTheme } from 'react-native-paper'

type Props = {
  routes: { key: string; title: string }[]
} & Omit<TabViewProps<any>, 'onIndexChange' | 'navigationState'>

export default function TabView({ routes, ...props }: Props) {
  const { colors } = useTheme()
  const [tabIndex, setTabIndex] = useState(0)

  const indicatorStyle = useMemo(
    () => ({ backgroundColor: colors.onBackground }),
    [colors],
  )
  const tabBarStyle = useMemo(() => ({ backgroundColor: '' }), [])
  const labelStyle = useMemo(() => ({ color: colors.onBackground }), [colors])
  const renderTabBar = useCallback(
    (tabbarProps: TabBarProps<any>) => (
      <>
        <TabBar
          {...tabbarProps}
          indicatorStyle={indicatorStyle}
          style={tabBarStyle}
          labelStyle={labelStyle}
        />
        <Divider />
      </>
    ),
    [indicatorStyle, labelStyle, tabBarStyle],
  )

  return (
    <RNTabView
      {...props}
      renderTabBar={renderTabBar}
      navigationState={{ index: tabIndex, routes } as NavigationState<any>}
      onIndexChange={setTabIndex}
    />
  )
}
