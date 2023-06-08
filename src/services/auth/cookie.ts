export const getCookieValueByName = (name: string) => {
  const cookieStr = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  if (!cookieStr) return null;

  return JSON.parse(cookieStr);
};
