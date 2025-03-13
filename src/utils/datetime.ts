const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: { label: string; seconds: number }[] = [
    { label: "y", seconds: 31536000 }, // 1 year
    { label: "w", seconds: 604800 }, // 1 week
    { label: "d", seconds: 86400 }, // 1 day
    { label: "h", seconds: 3600 }, // 1 hour
    { label: "m", seconds: 60 }, // 1 minute
    { label: "s", seconds: 1 }, // 1 second
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label}`;
    }
  }

  return "just now";
};

export default timeAgo;
