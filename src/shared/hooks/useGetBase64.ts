// "use server"
// import { getPlaiceholder } from "plaiceholder"
//
// export const useGetBase64 = async (imageUrl: string) => {
//   try {
//     const res = await fetch(imageUrl)
//     if (!res.ok) {
//       throw new Error(`Failed to fetch image : ${res.status} ${res.statusText}`)
//     }
//
//     const buffer = await res.arrayBuffer()
//
//     const { base64 } = await getPlaiceholder(Buffer.from(buffer))
//     console.log({ base64 })
//
//     return base64
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.stack)
//     }
//   }
// }
