// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomTheme } from "../styles/CustomTheme";

interface ViewCounterProps {
    count: number | null;
}

export default function ViewCounter({ count }: ViewCounterProps) {
    const theme = useTheme<CustomTheme>();

    if (count === null) {
        return null;
    }

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "8px 16px",
                borderRadius: 2,
                backgroundColor: theme.palette.background.elevated,
                opacity: 0.8,
                zIndex: 1000,
            }}
        >
            <VisibilityIcon
                sx={{
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                }}
            />
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                }}
            >
                {count.toLocaleString()}
            </Typography>
        </Box>
    );
}
