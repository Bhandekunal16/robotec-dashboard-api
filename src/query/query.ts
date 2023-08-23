export const GetInstagram = (): string => {
  return `match (i:instagram) return i`;
};

export const GetFollowingCount = (): string => {
  return `MATCH (n:instagram {type: "following"}) RETURN count (n)`;
};

export const GetFollowerCount = (): string => {
  return `MATCH (n:instagram {type: "follower"}) RETURN count (n)`;
};

export const GetProject = (): string => {
  return `match (p:project) return p`;
};

export const GetProjectCount = (): string => {
  return ` MATCH (n:project) return count(n)`;
};

export const GetYoutube = (): string => {
  return `match (p:youtube {type:"vedio"}) return p`;
};

export const GetYoutubeVedioCount = (): string => {
  return ` MATCH (n:youtube {type: "vedio"}) RETURN count(n)`;
};
