

const fetchUserWeek = ({ month, day, year }: { month: number, day: number, year: number }) =>
  fetch(`/api/week`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ month, day, year })
  }).then((res) => res.json())

export default fetchUserWeek
