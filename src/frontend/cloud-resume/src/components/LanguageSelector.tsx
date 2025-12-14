import * as React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactCountryFlag, { ReactCountryFlagProps } from "react-country-flag";

const CountryFlag = ({ countryCode, ...props }: ReactCountryFlagProps) => {
  return (
    <ReactCountryFlag
      className="countryFlag"
      countryCode={countryCode}
      style={{
        fontSize: "2em",
        lineHeight: "2em",
      }}
      aria-label="Great Britain"
      svg
    />
  );
};

export default function LanguageSelector() {
  const [languageCode, setLanguageCode] = React.useState("en");
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => {
    if (event.target.value !== languageCode) {
      i18n.changeLanguage(event.target.value);
      setLanguageCode(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        //minWidth: '80px',
        alignItems: "center",
        justifyContent: "center",
        //bgcolor: 'background.default',
        color: "text.primary",
        borderRadius: 1,
        //p: 3,
      }}
    >
      <FormControl
        size="small"
        sx={{
          border: "0px",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={languageCode}
          onChange={handleLanguageChange}
          sx={{
            border: "0px",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderColor: "transparent",
            },
            "&.Mui-hovered .MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderColor: "transparent",
            },
          }}
        >
          <MenuItem value={"en"}>
            <CountryFlag countryCode="gb" />
          </MenuItem>

          <MenuItem value={"de"}>
            <CountryFlag countryCode="de" />
          </MenuItem>

          {/*<MenuItem value={'fr'}>
              <CountryFlag countryCode='fr' />
            </MenuItem>

            <MenuItem value={'it'}>
              <CountryFlag countryCode='it' />
            </MenuItem>*/}
        </Select>
      </FormControl>
    </Box>
  );
}
