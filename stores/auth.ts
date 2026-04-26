/**
 * 인증 스토어 (zustand) + 토큰 영속 (expo-secure-store)
 *
 * 책임:
 * - 메모리 내 user/token 상태
 * - SecureStore 동기화 (앱 재시작 시 복구)
 * - login/logout/restore 액션
 *
 * SecureStore 선택 이유:
 * - AsyncStorage는 평문 → JWT 저장 금지
 * - expo-secure-store는 iOS Keychain / Android Keystore 사용
 */
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import {
    login as apiLogin,
    signup as apiSignup,
    fetchMe,
    isTokenExpired,
    type AuthUser,
} from "@/services/mockApi";

const TOKEN_KEY = "auth_token";

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    /**
     * "loading" — 초기 부팅 중 (SecureStore 읽는 중)
     * "authenticated" — 토큰 유효 + user 로드됨
     * "unauthenticated" — 토큰 없음/만료
     */
    status: "loading" | "authenticated" | "unauthenticated";
    error: string | null;

    restore: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    signup: (
        email: string,
        password: string,
        username: string
    ) => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    status: "loading",
    error: null,

    restore: async () => {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (!token || isTokenExpired(token)) {
                if (token) await SecureStore.deleteItemAsync(TOKEN_KEY);
                set({
                    status: "unauthenticated",
                    user: null,
                    token: null,
                });
                return;
            }
            const user = await fetchMe(token);
            set({ status: "authenticated", user, token, error: null });
        } catch (e) {
            // 복구 실패 → 비인증 상태로 폴백
            await SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {});
            set({
                status: "unauthenticated",
                user: null,
                token: null,
                error: e instanceof Error ? e.message : "복구 실패",
            });
        }
    },

    login: async (email, password) => {
        try {
            set({ error: null });
            const { token, user } = await apiLogin(email, password);
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            set({ status: "authenticated", user, token });
        } catch (e) {
            set({ error: e instanceof Error ? e.message : "로그인 실패" });
            throw e;
        }
    },

    signup: async (email, password, username) => {
        try {
            set({ error: null });
            const { token, user } = await apiSignup(email, password, username);
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            set({ status: "authenticated", user, token });
        } catch (e) {
            set({ error: e instanceof Error ? e.message : "회원가입 실패" });
            throw e;
        }
    },

    logout: async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {});
        set({
            status: "unauthenticated",
            user: null,
            token: null,
            error: null,
        });
    },
}));
