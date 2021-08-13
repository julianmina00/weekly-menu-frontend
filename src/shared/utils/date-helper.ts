export const weekday = (date: Date = new Date()): string => {
  const day = date.toLocaleString('es-es', {  weekday: 'long' });
  return `${day.charAt(0).toLocaleUpperCase()}${day.substr(1).toLowerCase()}`
}

export const localDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString();
}