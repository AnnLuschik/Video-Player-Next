const addZero = (time) => (time < 10 ? `0${time}` : `${time}`);

export const formatTime = (ms) => {
  const sec = Math.floor(ms);
  if (sec / 60 < 1) {
    return `0:${addZero(sec)}`;
  }
  if (sec / 3600 < 1) {
    return `${Math.floor(sec / 60)}:${addZero(sec % 60)}`
  }
  return `${Math.floor(sec / 3600)}:${addZero(Math.floor((sec % 3600) / 60))}:${addZero((sec % 3600) % 60)}`
}
