export const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.slice(0, 16).replace('T', ' ');
  }

export const formatDateOnly = (dateString) => {
  if (!dateString) return '';
  return dateString.slice(0, 10);
　};