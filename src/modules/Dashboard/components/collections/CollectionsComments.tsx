"use client"
import { Separator } from '@/components/ui/separator'
import useSWRInfinite from 'swr/infinite'
import { Fragment } from 'react/jsx-runtime'
import { Button } from '@/components/ui/button'
import CollectionCommentsItem from './CollectionsCommentsItem'
import { CollectionsCommentsList } from '../../lib/action'
import { CollectionsCommentsResponses } from '../../types/responses'

const CollectionsComments = () => {
  const fetcher = async (key: string) => {
    const cursor = key.split('_').at(-1)
    const result = await CollectionsCommentsList({ cursor: cursor == "0" ? undefined : cursor })
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.data.message)
    }

  }

  const getKey = (pageIndex: number, pageData: CollectionsCommentsResponses) => {
    if (pageData && !pageData.has_more) return null

    if (pageIndex === 0) {
      return `collections_comments_0`
    }
    return `collection_comments_${pageData.next_cursor}`
  }

  const { data, setSize, size, error, mutate, isLoading } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })

  console.log({ data })

  if (error) {
    return <div className='text-white'>{error.message}</div>
  }

  const collectionsCommentsFlat = data?.flatMap(data => data.data)
  console.log({ collectionsCommentsFlat })

  return (
    <div className='text-white rounded-2xl w-full'>
      {collectionsCommentsFlat?.map((data, i) => {
        return <Fragment key={i}>
          <CollectionCommentsItem userInfo={data} media_type={data.media_type} media_id={data.media_id} />
          {collectionsCommentsFlat.length - 1 === i ? null : <Separator />}
        </Fragment>

      })}
      <Button type='button' onClick={() => {
        setSize(size + 1)
      }}>see more</Button>
    </div>
  )
}

export default CollectionsComments
