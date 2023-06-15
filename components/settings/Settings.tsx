'use client';

import { KeyboardEvent, useState } from "react";
import DashboardBlock from "../dashboard/DashboardBlock";
import { Slider } from "../ui/slider";


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

  return (
    <DashboardBlock>
      <div className="grid gap-4">
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

  return (
    <div
      className="w-full text-black dark:text-white flex border bg-gray-800 border-gray-200 dark:border-gray-800 rounded-xl p-4"
    >
      <div className="grid gap-4 w-1/2">
        <h1 className="tracking-wider font-black underline underline-offset-4 decoration-1">{setting.title}</h1>
        <p className="text-xs">{setting.description}</p>
      </div>
      <div className="grid place-content-center w-1/2">
        <Slider
          onClick={onClick}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => onKeyUp(e, 0)}
          tabIndex={i} // Add tabIndex to make the div focusable
          max={1}
          min={0}
          step={1}
          className="w-[100px]"
          value={[on ? 1 : 0]}
          thumbClass="h-10 w-10 border border-gray-200"
          thumbColor={on ? "bg-green-500" : "bg-red-500"}
          trackClass="bg-gray-500 h-6 my-6"
        />
      </div>
    </div>
  );
}
