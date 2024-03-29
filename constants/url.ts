export const MAIN_URL = (title: string, epNum: number): string =>
  `https://v1flix-v2.netlify.app/series/${title.replaceAll(
    " ",
    "%20"
  )}?ep=${epNum}`;

export const USER_URL = (username: string): string =>
  `https://v1flix-v2.netlify.app/profile/${username}`;

export const AVATAR_DISCORD = (user: any): string =>
  `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
