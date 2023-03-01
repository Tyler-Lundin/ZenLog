import { IoBarbell, IoWater } from 'react-icons/io5';
import { FaAppleAlt } from 'react-icons/fa';
import { AiFillSmile } from 'react-icons/ai';
import { GiBed, GiBodyBalance, GiMeditation } from 'react-icons/gi';
import { BsBookFill } from 'react-icons/bs';

export type Events = |
  'EXERCISE' |
  'FOOD' |
  'SLEEP' |
  'WATER' |
  'JOURNAL' |
  'MEDITATION' |
  'MOOD' |
  'STRETCH'

const EVENTS = [
  {
    name: 'EXERCISE',
    icon: <IoBarbell />,
  },
  {
    name: 'FOOD',
    icon: <FaAppleAlt />,
  },
  {
    name: 'SLEEP',
    icon: <GiBed />,
  },
  {
    name: 'WATER',
    icon: <IoWater />,
  },
  {
    name: 'JOURNAL',
    icon: <BsBookFill />,
  },
  {
    name: 'MEDITATION',
    icon: <GiMeditation />,
  },
  {
    name: 'MOOD',
    icon: <AiFillSmile />,
  },
  {
    name: 'STRETCH',
    icon: <GiBodyBalance />,
  }
]

export default EVENTS;
