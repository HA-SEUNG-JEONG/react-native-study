import { Post, User } from "@/types";

export const MOCK_ME: User = {
    id: "0",
    username: "haseung",
    avatar: "https://picsum.photos/seed/haseung/200/200",
    followersCount: 128,
    followingCount: 64,
    postsCount: 12,
};

const CAPTIONS = [
    "오늘도 좋은 하루 ☀️",
    "새로운 시작 🚀",
    "코딩하는 날들 💻",
    "개발자의 하루",
    "React Native 재밌다!",
    "Expo 최고야 📱",
    "모바일 개발 입문 중",
    "커피 한 잔이면 충분해 ☕",
    "오늘도 배운다",
    "성장하는 중 🌱",
];

export const MOCK_POSTS: Post[] = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    user: {
        id: String(i + 1),
        username: `user_${i + 1}`,
        avatar: `https://picsum.photos/seed/avatar${i}/200/200`,
        followersCount: (i + 1) * 37,
        followingCount: (i + 1) * 12,
        postsCount: i + 3,
    },
    imageUrl: `https://picsum.photos/seed/post${i + 10}/600/600`,
    caption: CAPTIONS[i],
    likes: (i + 1) * 11,
    likedByMe: i % 3 === 0,
    commentsCount: i * 2 + 1,
    createdAt: new Date(Date.now() - i * 3_600_000).toISOString(),
}));

export const MOCK_COMMENTS = [
    { id: "1", username: "alice", text: "너무 좋다! 🔥" },
    { id: "2", username: "bob", text: "완전 공감" },
    { id: "3", username: "carol", text: "멋있어요!" },
    { id: "4", username: "dave", text: "나도 따라해봐야겠다" },
];
