import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikeState {
  likedRecruitments: number[];
  toggleLike: (recruitmentId: number) => void;
  isLiked: (recruitmentId: number) => boolean;
}

export const useLikeStore = create<LikeState>()(
  persist(
    (set, get) => ({
      likedRecruitments: [],

      toggleLike: (recruitmentId: number) => {
        const { likedRecruitments } = get();
        const isCurrentlyLiked = likedRecruitments.includes(recruitmentId);

        set({
          likedRecruitments: isCurrentlyLiked
            ? likedRecruitments.filter(id => id !== recruitmentId)
            : [...likedRecruitments, recruitmentId],
        });
      },

      isLiked: (recruitmentId: number) => {
        return get().likedRecruitments.includes(recruitmentId);
      },
    }),
    {
      name: 'recruitment-likes',
    },
  ),
);
