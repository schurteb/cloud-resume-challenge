// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

function isDevelopment() {
  return import.meta.env.DEV;
}

export default isDevelopment;
