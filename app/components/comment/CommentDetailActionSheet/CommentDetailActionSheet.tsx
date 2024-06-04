import { ActionSheetProps } from '~/components/basic/ActionSheet/ActionSheet.tsx'
import { Comment as CommentT } from '~/core/data/adventure.data'

type Props = {
  comment: CommentT
} & ActionSheetProps

export default function CommentDetailActionSheet({ comment, ...props }: Props) {
  return <></>
}
