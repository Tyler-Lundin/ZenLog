import { atom, useAtom } from 'jotai';
import type { Events } from './useEvents';

const currentEventAtom = atom<Events>('EXERCISE');

export default function useEvent() {

  const [currentEvent, setCurrentEvent] = useAtom(currentEventAtom);

  const handleClick = (newEvent: Events) => setCurrentEvent(newEvent)

  return {
    currentEvent,
    handleClick,
  }
}
