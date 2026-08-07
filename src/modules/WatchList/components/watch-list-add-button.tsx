"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, Folders } from "lucide-react";
import { cn } from "@/lib/utils";
import { WatchListCreate, WatchListInfo, WatchListRemove, WatchListStatus } from "../libs/action";
import { toast } from "sonner";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { WatchListInfoEntity } from "../types/entity";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-rose-500",
  "bg-purple-500",
  "bg-blue-400",
  "bg-amber-400",
  "bg-fuchsia-500",
];

const COUNT = 12;
const CONFETTI = Array.from({ length: COUNT }, (_, i) => {
  const angle = -160 + (i / (COUNT - 1)) * 140;
  const rad = (angle * Math.PI) / 180;
  const dist = 55 + (i % 3) * 18;
  return {
    id: i,
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist,
    rotate: (i % 2 === 0 ? 1 : -1) * (100 + i * 18),
    color: COLORS[i % COLORS.length],
    w: i % 2 === 0 ? 8 : 6,
    h: i % 3 === 0 ? 6 : 4,
    dur: 0.68 + (i % 4) * 0.07,
  };
});

const SYNC_DELAY = 1000;

type WatchListEntity = {
  infoWatchList: WatchListInfoEntity,
  statusWatchList: boolean
}

export default function WatchListAddButton({ media_id, media_type }: { media_id: string, media_type: string }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [clickKey, setClickKey] = useState(0);

  const { data: user, status } = useSession()
  console.log({ user })

  const desiredLikedRef = useRef(false);
  const confirmedLikedRef = useRef(false);
  const baseCountRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSyncingRef = useRef(false);

  const userFetcher = async (): Promise<WatchListEntity> => {
    const [infoResult, statusResult] = await Promise.all([WatchListInfo({ media_type: media_type, media_id: media_id }), WatchListStatus({ media_type: media_type, media_id: media_id })])
    if (infoResult.success && statusResult.success) {
      return {
        infoWatchList: infoResult.data.data,
        statusWatchList: statusResult.data.message
      }
    } else {
      if (!infoResult.success) toast.error(infoResult.data?.message || "Gagal mengambil data");
      if (!statusResult.success) toast.error(statusResult.data?.message || "Gagal mengambil status");
      toast.error(`Terjadi kesalahan mengambil data watch list`)
      // throw new Error(`Gagal mengambil info watch_lists`)
    }
  }

  const publicFetcher = async (): Promise<WatchListEntity> => {
    const response = await WatchListInfo({ media_type: media_type, media_id: media_id })
    if (response.success) {
      return {
        infoWatchList: response.data.data,
        statusWatchList: false
      }
    } else {
      toast.error(response.data.message)
      throw new Error(response.data.message)
    }
  }

  const fetcher = (): Promise<WatchListEntity> => {
    if (status === "authenticated") {
      return userFetcher()
    } else {
      return publicFetcher()
    }
  }

  const { data, error, mutate, isLoading } = useSWR(`watch_lists_${media_id}_${media_type}_${status}`, fetcher, {
    refreshInterval: 5000
  })

  useEffect(() => {
    if (data) {
      setIsLiked(data.statusWatchList);
      setCount(data.infoWatchList.count);
      desiredLikedRef.current = data.statusWatchList;
      confirmedLikedRef.current = data.statusWatchList;
      baseCountRef.current = data.infoWatchList.count;
    }
  }, [data])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const sendToServer = useCallback((nextLiked: boolean) => {
    if (nextLiked === confirmedLikedRef.current) return;

    if (isSyncingRef.current) return;

    isSyncingRef.current = true;

    startTransition(async () => {
      const action = nextLiked ? WatchListCreate : WatchListRemove;
      const response = await action({ media_id: media_id, media_type: media_type })

      if (response.success) {
        confirmedLikedRef.current = nextLiked;
        mutate()
        toast.success(response.data.message)
      } else {
        setIsLiked(confirmedLikedRef.current);
        setCount(baseCountRef.current);
        desiredLikedRef.current = confirmedLikedRef.current;
        toast.error(response.data.message)
      }

      isSyncingRef.current = false;

      if (desiredLikedRef.current !== confirmedLikedRef.current) {
        sendToServer(desiredLikedRef.current);
      }
    })
  }, [media_id, media_type, mutate])

  const handleClick = () => {
    if (!user) {
      toast.error("Login untuk menambahkan watchlist anda")
      return;
    }

    setClickKey((k) => k + 1);

    const next = !isLiked;
    setIsLiked(next);
    setCount((prev) => (next ? prev + 1 : prev - 1));
    desiredLikedRef.current = next;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      sendToServer(desiredLikedRef.current);
    }, SYNC_DELAY);
  };

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <>
      {
        isLoading ?
          <WatchListSkeleton />
          :
          <div className="relative inline-flex items-center justify-center">
            <AnimatePresence>
              {isLiked &&
                CONFETTI.map((p) => (
                  <motion.span
                    key={`${p.id}-${clickKey}`}
                    className={cn("absolute rounded-sm pointer-events-none", p.color)}
                    style={{
                      width: p.w,
                      height: p.h,
                      left: "50%",
                      top: "50%",
                      marginLeft: -(p.w / 2),
                      marginTop: -(p.h / 2),
                    }}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: p.x,
                      y: [0, p.y * 0.6, p.y],
                      rotate: p.rotate,
                      opacity: [1, 1, 0],
                      scale: 0.7,
                    }}
                    exit={{}}
                    transition={{ duration: p.dur, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
            </AnimatePresence>

            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="relative overflow-hidden inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium select-none cursor-pointer"
            >
              <AnimatePresence initial={false}>
                <motion.span
                  key={clickKey}
                  className="absolute w-5 h-5 rounded-lg bg-purple-700/20 pointer-events-none"
                  style={{ left: 33, top: "50%", marginLeft: -10, marginTop: -10 }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 15, opacity: 0 }}
                  exit={{}}
                  transition={{
                    scale: { duration: 1.1, ease: "easeOut" },
                    opacity: { duration: 1.0, ease: "easeIn", delay: 0.1 },
                  }}
                />
              </AnimatePresence>

              <motion.div
                key={`add-${clickKey}`}
                animate={
                  isLiked ? { scale: [1, 1.5, 0.84, 1.1, 1] } : { scale: [1, 0.84, 1] }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Bookmark
                  className={cn(
                    "size-4 transition-colors duration-300",
                    isLiked ? "text-purple-700" : "text-muted-foreground",
                  )}
                  fill={isLiked ? "currentColor" : "none"}
                  strokeWidth={isLiked ? 0 : 1.75}
                />
              </motion.div>
              <div className="overflow-hidden h-5 flex items-center tabular-nums w-fit min-w-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={clickKey}
                    initial={{ y: isLiked ? 14 : -14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: isLiked ? -14 : 14, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.2, 0, 0.2, 1] }}
                    className="block text-muted-foreground"
                  >
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(count)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
      }
    </>
  );
}


const WatchListSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="space-y-2">
        <Skeleton className="h-10 w-fit min-w-10 ring ring-white flex items-center justify-start px-4 gap-1">
          <Bookmark
            className={cn(
              "size-4 transition-colors duration-500 animate-pulse text-white",
            )}
            strokeWidth={2}
          />
          <div className="text-white text-[11px] font-semibold">Counting...</div>
        </Skeleton>
      </div>
    </div>
  )
}


