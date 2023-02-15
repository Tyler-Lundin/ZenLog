
export type Languages = | 'en' | 'es'
export type Unit = | 'metric' | 'imperial'
export type Time = | '12h' | '24h'

export interface IGlobalState {
  settings: ISettings;
}

interface ISettings {
  theme: ITheme;
  language: Languages;
  unit: Unit;
  time: Time;
}

export interface ITheme {
    name: string;
    colors: {
        a: string;
        b: string;
        c: string;
        d: string;
    }
    text: string;
    oT: string;
    background: string;
}
