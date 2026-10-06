import { useEffect, useState } from "react";
import { request } from "../api/http";

interface ApiState<T> {
    path: string | null;
    data: T | null;
    error: Error | null;
    loading: boolean;
}

export default function useApi<T>(path: string | null) {
    const [state, setState] = useState<ApiState<T>>({
        path: null,
        data: null,
        error: null,
        loading: false,
    });

    useEffect(() => {
        if (path === null) return;

        const controller = new AbortController();

        setState({
            path,
            data: null,
            error: null,
            loading: true,
        });

        request<T>(path, { signal: controller.signal })
            .then((data) => {
                if (controller.signal.aborted) return;

                setState({
                    path,
                    data,
                    error: null,
                    loading: false,
                });
            })
            .catch((cause: unknown) => {
                if (controller.signal.aborted) return;

                setState({
                    path,
                    data: null,
                    error: cause instanceof Error
                        ? cause
                        : new Error("데이터를 불러오지 못했습니다."),
                    loading: false,
                });
            });

        return () => controller.abort();
    }, [path]);

    // 경로 변경 직후 이전 데이터가 잠깐 표시되는 것을 막습니다.
    if (path === null || state.path !== path) {
        return {
            data: null,
            error: null,
            loading: path !== null,
        };
    }

    return {
        data: state.data,
        error: state.error,
        loading: state.loading,
    };
}