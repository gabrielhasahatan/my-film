"use client"
import { Separator } from '@/components/ui/separator'
import useSWRInfinite from 'swr/infinite'
import { Fragment } from 'react/jsx-runtime'
import { Button } from '@/components/ui/button'
import CollectionCommentsItem from './collections-comments-item'
import { collectionsCommentsList } from '../lib/action'
import { CollectionsCommentsResponses } from '../types/responses'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

const CollectionsComments = () => {

  const fetcher = async (key: string) => {
    const cursor = key.split('_').at(-1)
    const result = await collectionsCommentsList({ cursor: cursor == "0" ? undefined : cursor })
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

  const { data, setSize, size, error, isLoading } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })


  if (error) {
    return <div className='text-white'>{error.message}</div>
  }

  const collectionsCommentsFlat = data?.flatMap(data => data.data)
  const dataInfo = data?.at(-1)

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
        collectionsCommentsFlat && collectionsCommentsFlat.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {collectionsCommentsFlat.map((item, i) => (
              <Fragment key={item.id ?? i}>
                <CollectionCommentsItem commentInfo={item} media_type={item.media_type} media_id={item.media_id} />
                {collectionsCommentsFlat.length - 1 === i ? null : <Separator className="bg-neutral-800" />}
              </Fragment>
            ))}
            {dataInfo?.has_more ? (
              <div className="pt-2 flex justify-center">
                <Button
                  type='button'
                  variant="outline"
                  size="sm"
                  className='text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                  onClick={() => setSize(size + 1)}
                >
                  Lihat lebih banyak
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 text-center text-neutral-400">
            <MessageSquare className="mx-auto mb-3 h-8 w-8 text-neutral-500" />
            <p className="text-base font-medium text-neutral-200">Belum ada komentar atau ulasan</p>
            <p className="mt-1 text-sm text-neutral-400">
              Tulis komentar pada film atau serial TV yang sudah Anda tonton.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Jelajahi film &rarr;
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default CollectionsComments
