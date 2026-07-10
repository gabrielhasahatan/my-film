import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { ErrorResponse, SafeApiRequestContentType, SafeApiResponse } from "./safeApiRequest";

export const safeApiInternalRequest = async <T, E = never>(
  path: string,
  options: RequestInit = {},
  contentType: SafeApiRequestContentType = SafeApiRequestContentType.JSON_BODY,
): Promise<SafeApiResponse<T, E>> => {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   return {
  //     success: false,
  //     redirect: true,
  //     data: { message: "invalid session" },
  //   };
  // }

  let contentTypes = {};
  if (contentType == SafeApiRequestContentType.JSON_BODY) {
    contentTypes = { "Content-Type": "application/json" };
  }

  const response: Response = await fetch(path, {
    ...options,
    headers: {
      ...contentTypes,
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  if (response.status === 401 || response.status === 402) {
    return {
      success: false,
      redirect: true,
      data: { message: "unauthorized access" },
    };
  }

  if (response.ok) {
    const data: T = await response.json();
    return { success: true, data: data };
  } else {
    const data: ErrorResponse<E> = await response.json();
    return { success: false, redirect: false, data: data };
  }
};
