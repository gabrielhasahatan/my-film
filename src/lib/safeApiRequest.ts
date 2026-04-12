import "server-only";

export type ErrorResponse<E> = {
  message: string;
  detail?: E;
};

export type SafeApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type SafeApiErrorResponse<E> = {
  success: false;
  data: ErrorResponse<E>;
  redirect: boolean;
};

export type SafeApiResponse<T, E = never> =
  | ({} & SafeApiSuccessResponse<T>)
  | SafeApiErrorResponse<E>;

export enum SafeApiRequestContentType {
  JSON_BODY,
  FORM_DATA_BODY,
}

export const safeApiRequest = async <T, E = never>(
  path: string,
  options: RequestInit = {},
  contentType: SafeApiRequestContentType = SafeApiRequestContentType.JSON_BODY,
): Promise<SafeApiResponse<T, E>> => {

  let contentTypes = {};
  if (contentType == SafeApiRequestContentType.JSON_BODY) {
    contentTypes = { "Content-Type": "application/json" };
  }

  const response: Response = await fetch(path, {
    ...options,
    headers: {
      ...contentTypes,
      Authorization: `Bearer ${process.env.API_KEY}`,
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
