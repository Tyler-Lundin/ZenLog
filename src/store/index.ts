import { atom } from 'jotai';

export const 

  /* AUTH FORM STATE */
  usernameAtom = atom(''),
  emailAtom = atom(''),
  passwordAtom = atom(''),
  verifyPasswordAtom = atom(''),

  /* UI STATE */
  isEventsMenuOpenAtom = atom(false),
  isSettingsMenuOpenAtom = atom(false),

  /* EVENT FORM STATE */
  currentEventAtom = atom(null),
  isEventFormOpenAtom = atom(false);
