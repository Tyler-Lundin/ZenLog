'use client';
import { KeyboardEvent, useState } from "react";
import DashboardBlock from "../dashboard/DashboardBlock";
import { Slider } from "../ui/slider";
import { BsQuestionCircle } from "react-icons/bs";
import { Button } from "../ui/button";
import { AiOutlineClose } from "react-icons/ai";


type ToggleSetting = { title: string, description: string, on: boolean }

type ToggleSettingProps = {
  setting: ToggleSetting;
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>, i: number) => void;
  onClick: () => void;
  i: number;
};

export default function Settings() {
  const [isOn, setIsOn] = useState({
    0: false,
    1: false,
    2: false,
  });

  const toggle = (i: number) => {
    setIsOn({ ...isOn, [i]: !isOn[i as keyof typeof isOn] });
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Enter") {
      toggle(i);
    }
  };

  const TOGGLE_SETTINGS: ToggleSetting[] = [
    {
      title: "Enable Cookies",
      description:
        "Enable cookies to store your settings and information on your device, enhancing your browsing experience. Please be cautious as cookies can be compromised on any device.",
      on: isOn[0]
    },
    {
      title: "Dark Mode",
      description: "Enjoy a visually appealing dark color scheme that reduces eye strain and enhances readability, especially in low-light environments.",
      on: isOn[1]
    },
    {
      title: "Notifications",
      description: "Stay informed with important updates, announcements, and relevant information from our website. Receive timely alerts directly to your device, ensuring you never miss out on the latest updates",
      on: isOn[2]
    },
  ];

  useEffect(() => {
    if (isOn[0]) {
      document.cookie = "cookies=true; path=/";
    }
  }, [isOn])

  return (
    <DashboardBlock>
      <div className="flex flex-wrap gap-4">
        {TOGGLE_SETTINGS.map((setting, i) => (
          <ToggleSetting
            key={i}
            setting={setting}
            onKeyUp={(e) => onKeyUp(e, i)}
            onClick={() => toggle(i)}
            i={i}
          />
        ))}
      </div>
    </DashboardBlock>
  );
}

export function ToggleSetting(props: ToggleSettingProps) {
  const { setting, onKeyUp, onClick, i } = props;
  const { on } = setting;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div
      className="w-full lg:w-72 relative text-black dark:text-white grid place-content-center border border-black dark:border-white rounded-xl p-4 py-8"
    >
      <Button size="sm" className={` right-2 absolute top-2 rounded-md`} variant={isDetailsOpen ? "destructive" : "ghost"} onClick={() => setIsDetailsOpen((p) => !p)}>  {isDetailsOpen ? <AiOutlineClose /> : <BsQuestionCircle />}  </Button>
      <h1 className="tracking-wider font-black text-2xl">{setting.title}</h1>
      {isDetailsOpen && (<p className="text-xs">{setting.description}</p>)}

      <div className="grid place-content-center ">
        <Slider
          onClick={onClick}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => onKeyUp(e, 0)}
          tabIndex={i} // Add tabIndex to make the div focusable
          max={1}
          min={0}
          step={1}
          className="w-20"
          value={[on ? 1 : 0]}
          thumbClass="h-12 w-12 border border-gray-200"
          thumbColor={on ? "bg-green-400" : "bg-green-800"}
          trackClass="bg-gray-500 h-8 my-6 border-black dark:border-white border"
        />
      </div>
    </div>
  );
}
