import dayjs, { Dayjs } from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/id" // Jika ingin menggunakan Bahasa Indonesia
dayjs.extend(relativeTime)
dayjs.locale("id")

export function getRelativeTime(time: Dayjs | string) {
  return dayjs(time).fromNow()
}
