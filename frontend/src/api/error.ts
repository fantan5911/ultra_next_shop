

export default class ApiError extends Error {
    static NotFound(response: Response, message: string) {
         if (!response.ok) {
            if (response.status === 404) {
                return new ApiError('404');
            }
            return new ApiError(message);
        }
    }
}