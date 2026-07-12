"use client"
import { Separator } from '@/components/ui/separator'
import useSWRInfinite from 'swr/infinite'
import { Fragment } from 'react/jsx-runtime'
import { Button } from '@/components/ui/button'
import CollectionCommentsItem from './CollectionsCommentsItem'
import { CollectionsCommentsList } from '../../lib/action'
import { CollectionsCommentsResponses } from '../../types/responses'
import { Skeleton } from '@/components/ui/skeleton'

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
  const dataInfo = data?.at(-1)
  console.log({ collectionsCommentsFlat })

  return (
    <div className='w-full'>
      {isLoading ?
        <div className='flex gap-4 flex-col'>
          <Skeleton className='w-full h-30 bg-black/40' />
          <Skeleton className='w-full h-30 bg-black/40' />
          <Skeleton className='w-full h-30 bg-black/40' />
          <Skeleton className='w-full h-30 bg-black/40' />
          <Skeleton className='w-full h-30 bg-black/40' />
        </div>
        :
        <>
          {collectionsCommentsFlat?.map((data, i) => {
            return <Fragment key={i}>
              <CollectionCommentsItem userInfo={data} media_type={data.media_type} media_id={data.media_id} />
              {collectionsCommentsFlat.length - 1 === i ? null : <Separator />}
            </Fragment>
          })
          }
          {
            dataInfo?.has_more ?
              <Button type='button'
                className='text-blue-600'
                onClick={() => {
                  setSize(size + 1)
                }}>Lihat lebih banyak</Button> : null
          }
        </>
      }


    </div>
  )
}

export default CollectionsComments
