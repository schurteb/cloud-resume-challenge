import { createContext } from "react";

const LocalizationContext = createContext({ setLocalization: (locale: 'utc' | 'de') => {} });

export default LocalizationContext;