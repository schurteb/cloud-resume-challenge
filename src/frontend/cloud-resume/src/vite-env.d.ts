// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
