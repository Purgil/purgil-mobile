import { StackScreenProps } from '@react-navigation/stack'
import { Adventure, Comment } from '~/core/data/adventure.data'

export type RootStackParamList = {
  Home: undefined
  Map: undefined
  Record: undefined
  Social: undefined
  Profile: undefined
  BottomNav: undefined
  Auth: undefined
  Login: undefined
  SignUp: undefined
  AdventureDetail: {
    adventure: Adventure
  }
  CommentDetail: {
    comment: Comment
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
