// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import { Color, createTheme, PaletteColor, PaletteMode, ThemeOptions } from "@mui/material";
import { CommonColors, PaletteColorOptions, Theme, TypeAction, TypeText } from "@mui/material/styles";
import { PaletteTonalOffset, ColorPartial, PaletteAugmentColorOptions, TypeDivider } from "@mui/material/styles/createPalette";

export interface CustomTheme extends Theme {
    palette: CustomPalette
};

export interface CustomPalette {
    common: CommonColors;
    mode: PaletteMode;
    contrastThreshold: number;
    tonalOffset: PaletteTonalOffset;
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    grey: Color;
    text: TypeText;
    divider: TypeDivider;
    action: TypeAction;
    background: CustomTypeBackground;
    getContrastText: (background: string) => string;
    augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
  }

export interface CustomTypeBackground {
    default: string;
    paper: string;
    elevated: string;
    invertedElevated: string;
}

export interface CustomThemeOptions extends ThemeOptions {
    palette?: CustomPaletteOptions;
}

export interface CustomPaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
    mode?: PaletteMode;
    tonalOffset?: PaletteTonalOffset;
    contrastThreshold?: number;
    common?: Partial<CommonColors>;
    grey?: ColorPartial;
    text?: Partial<TypeText>;
    divider?: string;
    action?: Partial<TypeAction>;
    background?: Partial<CustomTypeBackground>;
    getContrastText?: (background: string) => string;
}

/**
 * Customized variant based on additional properties in 'CustomTheme.ts'
 * 
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createCustomTheme(options?: CustomThemeOptions, ...args: object[]): Theme {
    return createTheme(options, args);
};