'use clinet'
import ReactTimeAgo from 'react-timeago'
const Timer = ({createdAt}:{createdAt:string}) => {
  return (
    <>
    <ReactTimeAgo date={createdAt}/>
    </>
  )
}

export default Timer