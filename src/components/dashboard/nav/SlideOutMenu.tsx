import EVENTS from '../../../hooks/useEvents';
import useTheme from '../../../hooks/useTheme';
import EventButton from '../EventButton';
import CloseButton from './CloseButton';



export default function SlideOutMenu ( ) {
  const { theme } = useTheme();

  const 
    POS = 'top-0 -left-full z-50 fixed',
    SIZE = 'w-screen h-screen',
    GRID = 'grid place-items-center gap-4 pt-20',
    TRANSITION = 'transition-all duration-500 ease-in-out',
    MENU = [POS, SIZE, GRID, TRANSITION ].join(' ');  

  return (
    <aside className={MENU}>
      <CloseButton />
      <div>
        {EVENTS.map((event) => (
          <EventButton 
            key={event.name} 
            name={event.name} 
            icon={event.icon} 
            theme={theme}
          />
        ))} 
      </div>
    </aside>
  )
}
