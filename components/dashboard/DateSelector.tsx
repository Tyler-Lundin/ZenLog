'use client'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux';
import { decrementDate, incrementDate, resetDate } from '@/_store/slices/dashboardSlice';
import useUserDay from '@/hooks/useUserDay';



export default function DateSelector() {
  const dispatch = useDispatch()
  const { userDay } = useUserDay()
  if (!userDay) return null
  const { month, day, year } = userDay
  return (
    <div className='relative grid grid-cols-5 grid-flow-row'>
      <Button
        size='mdSquare'
        variant='ghost'
        onClick={() => dispatch(decrementDate())}
        className='col-span-1'>
        <AiOutlineLeft />
      </Button>
      <div className='col-span-3 grid place-items-center'>
        <Button
          variant='default'
          size='sm'
          onClick={() => dispatch(resetDate())}
          className='col-span-1'>
          {month}/{day}/{year}
        </Button>
      </div>
      <Button
        size='mdSquare'
        variant='ghost'
        onClick={() => dispatch(incrementDate())}
        className='col-span-1'>
        <AiOutlineRight />
      </Button>
    </div>
  )
}
