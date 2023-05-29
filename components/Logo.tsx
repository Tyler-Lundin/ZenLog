

import Link from "next/link";
import { GiYinYang } from "react-icons/gi"
const Logo = () => (
  <Link href="/dashboard" className={`flex items-center dark:text-white text-black'}`}>
    <h6 className=" text-2xl font-thin">
      <GiYinYang className={`inline-block mb-1 text-2xl`} />
      <span className="font-thin">ZEN</span>
      <span className="font-black">LOG</span>
    </h6>
  </Link>
)

export default Logo;
