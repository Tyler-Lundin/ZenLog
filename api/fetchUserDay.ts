interface IFetchDate {
  month: number
  day: number
  year: number
}

const fetchuserDay = ({ month, day, year }: IFetchDate) =>
  fetch('/api/user/day', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ month, day, year }),
  }).then((res) => res.json())

export default fetchuserDay
