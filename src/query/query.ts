export const GetInstagram = (): string => {
  return 'match (i:instagram) return i';
};

export const GetFollowingCount = (): string => {
  return 'MATCH (n:instagram {type: "following"}) RETURN count (n)';
};
