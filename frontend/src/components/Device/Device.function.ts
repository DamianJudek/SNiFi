export const mapLabel = (available: boolean, isBlocked: boolean) => {
  if (isBlocked) return "blocked";
  if (available) return "online";
  else return "offline";
};
