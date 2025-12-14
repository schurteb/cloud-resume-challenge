import React from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { CustomTheme } from "../../styles/CustomTheme";

import "../../styles/fullpage.css";

export default function About() {
  const theme = useTheme<CustomTheme>();
  const { t } = useTranslation();

  return (
    <div className="section">
      <h2
        style={{
          marginLeft: 50,
          marginRight: 50,
          color: theme.palette.primary.main,
        }}
      >
        {t("About.Title")}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <img
          src="profile_pic.jpg"
          alt="portrait of benjamin"
          style={{
            width: "30%",
            minWidth: 150,
            borderRadius: "50%",
            boxShadow: "0px 0px 25px grey",
            marginTop: 30,
            marginBottom: 30,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <table
          style={{
            textAlign: "start",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <colgroup>
            <col width={125} style={{ color: theme.palette.text.primary }} />
            <col style={{ color: theme.palette.text.primary }} />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <b>{t("About.Keys.Name")}</b>
              </td>

              <td>{t("About.Name")}</td>
            </tr>

            <tr>
              <td>
                <b>{t("About.Keys.Location")}</b>
              </td>

              <td>{t("About.Location") + ", " + t("About.Country")}</td>
            </tr>

            <tr>
              <td style={{ verticalAlign: "top" }}>
                <b>{t("About.Keys.Email")}</b>
              </td>

              <td>
                {/*t("About.Email")*/}
                {/*<br />*/}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://flowcrypt.com/me/benjaminschurtenberger"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t("About.EmailFlowCryptIntro")}
                </a>
              </td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top" }}>
                <b>{t("About.Keys.OpenPGPKey")}</b>
              </td>

              <td>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="./openpgp-public-key.txt"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t("About.ViewKey")}
                </a>
                <br />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="./openpgp-public-key.asc"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t("About.DownloadKey")}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
