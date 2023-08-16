

const fetchUserWeek = async (month: number, day: number, year: number) => {
  console.log("fetching user week")
  return fetch(`/api/week`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ month, day, year })
  }).then((res) => res.json())
}

export default fetchUserWeek
