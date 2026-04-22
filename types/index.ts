export interface User {
    id: string;
    username: string;
    avatar: string;
    followersCount: number;
    followingCount: number;
    postsCount: number;
}

export interface Post {
    id: string;
    user: User;
    imageUrl: string;
    caption: string;
    likes: number;
    likedByMe: boolean;
    commentsCount: number;
    createdAt: string;
}

export interface Comment {
    id: string;
    user: Pick<User, "id" | "username" | "avatar">;
    text: string;
    createdAt: string;
}
