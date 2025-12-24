// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import { createContext } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default ColorModeContext;