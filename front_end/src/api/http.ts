const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL ?? ""
).replace(/\/$/, "");

export class ApiError extends Error {
    public readonly status: number;

    constructor(
        message: string,
        status: number,
    ) {
        super(message);

        this.name = "ApiError";
        this.status = status;
    }
}

export async function request<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const headers = new Headers(init.headers);

    headers.set("Accept", "application/json");

    if (init.body != null) {
        headers.set(
            "Content-Type",
            "application/json",
        );
    }

    const response = await fetch(
        `${API_BASE_URL}${path}`,
        {
            ...init,
            headers,
        },
    );

    if (!response.ok) {
        let message =
            `요청에 실패했습니다. (${response.status})`;

        try {
            const problem = await response.json() as {
                detail?: string;
                errors?: Record<string, string>;
            };

            const fieldErrors = Object.values(
                problem.errors ?? {},
            );

            message = fieldErrors.length > 0
                ? fieldErrors.join("\n")
                : problem.detail || message;
        } catch {
            // JSON이 아닌 오류 응답은 기본 메시지를 사용합니다.
        }

        throw new ApiError(
            message,
            response.status,
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}