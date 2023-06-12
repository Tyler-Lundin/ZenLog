

import Link from "next/link";
import { GiYinYang } from "react-icons/gi"
const Logo = () => (
  <Link href="/dashboard" className={`flex items-center dark:text-white text-black '}`}>
    <h6 className=" text-xl md:text-2xl font-thin">
      <GiYinYang className={`inline-block mb-1 text-xl md:text-2xl`} />
      <span className="font-thin hidden md:inline-block">ZEN</span>
      <span className="font-black hidden md:inline-block">LOG</span>
      <span className="font-thin md:hidden">Z</span>
      <span className="font-bold md:hidden">L</span>
    </h6>
  </Link>
)

export default Logo;
