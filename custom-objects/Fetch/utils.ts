type APIResponse<T> = APIErrorResponse | APISuccessResponse<T>;

type APIErrorResponse = {
  errorMessage: string;
  success: false;
  data: undefined;
};
type APISuccessResponse<T> = {
  errorMessage: undefined;
  success: true;
  data: T;
};

export const handleResponse = async <T>(
  res: Response
): Promise<APIResponse<T>> => {
  let data: any;
  try {
    const data = await res.json();
    if (!res.ok) return getErrorMessage(res, data);
    return { data, success: true, errorMessage: undefined };
  } catch (error) {
    if (!res.ok) {
      return getErrorMessage(res);
    } else {
      return { success: true, errorMessage: undefined, data };
    }
  }
};

const getErrorMessage = (res: Response, data?: any): APIErrorResponse => {
  if (!data || res.status >= 500) {
    return {
      errorMessage: "Unexpected server error",
      success: false,
      data: undefined,
    };
  } else {
    return { errorMessage: data.message, success: false, data: undefined };
  }
};
