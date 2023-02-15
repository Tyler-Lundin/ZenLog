'use client';
import { useAtom } from "jotai"
import { currentEventAtom } from "../../hooks/useDashboard"
import useTheme from "../../hooks/useTheme"

  
  const POS = 'absolute top-2 left-1/2 transform -translate-x-1/2'
  const TITLE = `${POS} `

const CurrentPageTitle = () => {
  const [currentEvent, setCurrentEvent] = useAtom(currentEventAtom) 
  const { theme } = useTheme();
  return (
      <h1 className={TITLE} style={{color:theme.text}}>{currentEvent}</h1>
  )
}


export default CurrentPageTitle;
