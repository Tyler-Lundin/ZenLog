"use client";
import { useState, useEffect, useRef } from "react";


  
  const DEFAULT_MOUTH = "M33.47,12.79A16.735,16.735,0,0,1,0,12.79C0,8.215,33.47,8.122,33.47,12.79Z"
  const HAPPY_MOUTH = DEFAULT_MOUTH.replace('12.79', '20.79') 
  const SAD_MOUTH = "M33.47,12.79A16.735,16.735,0,0,1,0,12.79C0,8.215,33.47,8.122,33.47,12.79Z" 
  const DEFAULT_LEFT_EYE = "M16.735,9.324A8.368,8.368,0,1,1,0,9.324C0,4.7,16.735,4.7,16.735,9.324Z"
  const DEFAULT_RIGHT_EYE = "M16.735,9.324A8.368,8.368,0,1,1,0,9.324C0,4.7,16.735,4.7,16.735,9.324Z"
  const TRANSITION = 'transition-colors duration-500 ease-in-out';
  

const Smiley = ({fill = '#eee', bg = '#111', scale = 1,}:{fill?:string, bg?: string, scale?:number }) => {

  const [mouth, setMouth] = useState({x:17.141, y:25.951})  
  const [leftEye, setLeftEye] = useState({x:34.832, y:15.275}) 
  const [rightEye, setRightEye] = useState({x:32.919, y:32.01}) 

  const smileyRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const offsets = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      }
      setMouth({x: 17.141 + offsets.x / 100, y: 25.951 + offsets.y / 100})
      setLeftEye({x: 34.832 + offsets.x / 100, y: 15.275 + offsets.y / 100})
      setRightEye({x: 32.919 + offsets.x / 100, y: 32.01 + offsets.y / 100})
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
  <>
    <svg  ref={smileyRef} id='smiley' xmlns="http://www.w3.org/2000/svg" width={67.751 * scale} height="67.751" viewBox="0 0 67.751 67.751">
      <path className={TRANSITION}  id="Path_14" data-name="Face" d="M33.876,0A33.876,33.876,0,1,1,0,33.876,33.876,33.876,0,0,1,33.876,0Z" fill={bg}/>
      <path className={TRANSITION} id="Path_15" data-name="Mouth" d={DEFAULT_MOUTH} transform={`translate(${mouth.x} ${mouth.y})`} fill={fill}/>
      <path className={TRANSITION} id="Path_16" data-name="Left Eye" d={DEFAULT_LEFT_EYE} transform={`translate(${leftEye.x} ${leftEye.y}) rotate(90)`} fill={fill} />
      <path className={TRANSITION} id="Path_17" data-name="Right Eye" d={DEFAULT_RIGHT_EYE} transform={`translate(${rightEye.x} ${ rightEye.y || 32.01}) rotate(-90)`} fill={fill}/>
    </svg>
  </>
  )
}

export default Smiley;
