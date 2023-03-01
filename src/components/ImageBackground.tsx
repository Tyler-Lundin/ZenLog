import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import bg1 from '../../public/images/1.png';
import bg2 from '../../public/images/2.png';
import bg3 from '../../public/images/3.png';
import bg4 from '../../public/images/4.png';
import bg5 from '../../public/images/5.png';
import bg6 from '../../public/images/6.png';
import bg7 from '../../public/images/7.png';
import bg8 from '../../public/images/8.png';
import bg9 from '../../public/images/9.png';
import bg10 from '../../public/images/10.png';
import bg11 from '../../public/images/11.png';
import bg12 from '../../public/images/12.png';
import bg13 from '../../public/images/13.png';
import bg14 from '../../public/images/14.png';
import bg15 from '../../public/images/15.png';
import bg16 from '../../public/images/16.png';
import bg17 from '../../public/images/17.png';
import bg18 from '../../public/images/18.png';
import bg19 from '../../public/images/19.png';
import bg20 from '../../public/images/20.png';
import bg21 from '../../public/images/21.png';
import bg22 from '../../public/images/22.png';
import bg23 from '../../public/images/23.png';
import bg24 from '../../public/images/24.png';



export default function ImageBackground () {
  const images:StaticImageData[] = [
    bg1, bg2, bg3, bg4, bg5, bg6,
    bg7, bg8, bg9, bg10, bg11, bg12,
    bg13, bg14, bg15, bg16, bg17, bg18,
    bg19, bg20, bg21, bg22, bg23, bg24,
  ]

  const randomSrc:StaticImageData = images[Math.floor(Math.random() * images.length)] as StaticImageData;


  return (
    <Image
      src={randomSrc}
      alt="background"
      quality={100}
      className="w-screen h-screen absolute -z-50 object-cover" 
      placeholder="blur"
      height={1080}
      priority
    />
  )
} 
