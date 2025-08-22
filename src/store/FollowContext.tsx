'use client';

import React, {createContext, useContext, useState, ReactNode} from 'react';

type FollowMap = Record<number, boolean>;

interface FollowContextProps {
  followMap: FollowMap;
  updateFollowStatus: (userId: number, isFollowing: boolean) => void;
}

const FollowContext = createContext<FollowContextProps | undefined>(undefined);

export const FollowProvider = ({children}: { children: ReactNode }) => {
  const [followMap, setFollowMap] = useState<FollowMap>({});

  const updateFollowStatus = (userId: number, isFollowing: boolean) => {
    setFollowMap(prev => ({
      ...prev,
      [userId]: isFollowing
    }));
  };

  return (
    <FollowContext.Provider value={{followMap, updateFollowStatus}}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollowContext = (): FollowContextProps => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollowContext must be used within a FollowProvider');
  }
  return context;
};
