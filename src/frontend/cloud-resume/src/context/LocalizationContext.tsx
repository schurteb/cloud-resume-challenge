// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import { createContext } from "react";

const LocalizationContext = createContext({ setLocalization: (locale: 'utc' | 'de') => {} });

export default LocalizationContext;