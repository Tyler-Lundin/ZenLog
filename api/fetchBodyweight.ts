import { SleepEntry } from "@prisma/client";


const fetchBodyweight = () =>
  fetch('/api/dashboard', {
    method: 'POST',
    body: JSON.stringify({ SleepEntries }),
  }).then((res) => res.json())

export default fetchBodyweight
