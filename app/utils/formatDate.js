function formatDate(dateStr) {
  const dateObj = new Date(dateStr);

  const date = {
    date: dateObj.toLocaleDateString('es-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
  };

  return date;
}

export default formatDate;