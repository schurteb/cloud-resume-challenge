import React from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ReactFullpage from "@fullpage/react-fullpage";
import { CustomTheme } from "../styles/CustomTheme";

import "../styles/fullpage.css";
import { TypeAnimation } from "react-type-animation";

// NOTE: if using fullpage extensions/plugins put them here and pass it as props
const pluginWrapper = () => {
    require("./../statics/fullpage.scrollHorizontally.min");
};

class MySection extends React.Component<{ content: any; theme: CustomTheme }> {
    render() {
        return (
            <div
                className="section"
                style={{
                    backgroundColor: this.props.theme.palette.background.elevated,
                }}
            >
                <h3 style={{ color: this.props.theme.palette.text.primary }}>
                    {this.props.content}
                </h3>
            </div>
        );
    }
}

export default function FullPage() {
    const theme = useTheme<CustomTheme>();
    const { t, i18n } = useTranslation();

    const anchors = ["me", "certs", "skills", "work", "projects"];

    return (
        <div id="fullpage_wrapper_custom">
            <ReactFullpage
                //fullpage options

                pluginWrapper={pluginWrapper}
                // front-end code cannot be completely hidden, however, this doesn't matter in this case
                // as stated in https://alvarotrigo.com/fullPage/help/Where-to-use-fullPage-license/
                licenseKey={"03ML8-KQ6I6-S51KK-P55JK-OXYZO"}
                scrollHorizontally={true} /* Because we are using the extension */
                scrollHorizontallyKey={"14AF79BD-66404988-99E0084F-2D720C26"}
                scrollingSpeed={1000} /* Options here */
                anchors={anchors}
                navigation
                navigationPosition="right"
                navigationTooltips={anchors}
                credits={{
                    enabled: false,
                }}
                //sectionsColor={theme.palette.mode == 'light' ? ["#282c34", "#ff5f45", "#0798ec"] : ["#0798ec", "#ff5f45", "#282c34"]}

                slidesNavigation
                slidesNavPosition="bottom"
                render={({ state, fullpageApi }) => {
                    return (
                        <ReactFullpage.Wrapper>

                            {
                                /**
                                 * Section 1 | Home
                                 */
                            }
                            <div className="section">
                                <div className="desktop-only" style={{position: "absolute", zIndex: -1, opacity: 0.3, top: 100, left: 0, right: 0, height: '70%', width: '100%'}}>
                                    {/* SVG created using https://danmarshall.github.io/google-font-to-svg-path/?font-select=Amiko&font-variant=regular&input-union=false&input-filled=true&input-kerning=false&input-separate=true&input-text=%7B...%7D&input-bezier-accuracy=&dxf-units=cm&input-size=256&input-fill=%23000&input-stroke=%23000000&input-strokeWidth=0.25mm&input-fill-rule=evenodd */}
                                    <svg style={{width: '100%', height: '100%', rotate: '-30deg'}} width="379.904" height="237.573" viewBox="0 0 379.904 237.573" xmlns="http://www.w3.org/2000/svg">
                                        <g id="svgGroup" style={{stroke: theme.palette.background.elevated, strokeWidth: '0.25mm', fill: theme.palette.background.elevated}}>
                                            <path d="M 46.592 154.883 L 46.592 190.723 Q 46.592 201.987 51.456 210.051 A 18.665 18.665 0 0 0 55.23 214.621 A 14.522 14.522 0 0 0 65.024 218.115 L 78.848 218.115 L 78.848 237.571 L 62.72 237.571 Q 51.712 237.571 43.136 231.171 A 40.929 40.929 0 0 1 30.696 215.89 A 48.713 48.713 0 0 1 29.952 214.275 Q 25.344 203.779 25.344 191.491 L 25.344 153.603 A 42.459 42.459 0 0 0 24.727 146.111 Q 23.999 142.057 22.412 138.861 A 19.848 19.848 0 0 0 18.944 133.891 A 20.306 20.306 0 0 0 10.145 128.613 Q 6.887 127.601 2.943 127.332 A 43.279 43.279 0 0 0 0 127.235 L 0 110.595 Q 8.872 110.595 14.671 107.265 A 19.054 19.054 0 0 0 18.944 103.939 A 21.069 21.069 0 0 0 23.719 95.76 Q 25.344 90.806 25.344 84.227 L 25.344 46.083 A 55.896 55.896 0 0 1 28.235 27.976 A 52.215 52.215 0 0 1 30.08 23.299 Q 34.816 12.803 43.392 6.403 Q 51.968 0.003 62.976 0.003 L 78.848 0.003 L 78.848 19.459 L 65.024 19.459 A 14.564 14.564 0 0 0 53.459 24.731 A 20.623 20.623 0 0 0 51.456 27.523 Q 46.592 35.587 46.592 46.851 L 46.592 82.947 A 58.032 58.032 0 0 1 45.476 94.582 A 45.014 45.014 0 0 1 41.984 105.091 A 34.322 34.322 0 0 1 37.072 112.713 A 27.224 27.224 0 0 1 29.184 119.043 Q 37.376 123.139 41.984 132.867 Q 46.592 142.595 46.592 154.883 Z" id="0" />
                                            <path d="M 116.819 209.824 A 18.64 18.64 0 0 0 123.392 210.947 A 22.154 22.154 0 0 0 124.083 210.936 A 16.953 16.953 0 0 0 135.808 206.083 Q 140.8 201.219 140.8 193.283 A 22.68 22.68 0 0 0 140.617 190.357 A 16.288 16.288 0 0 0 135.808 180.483 A 16.672 16.672 0 0 0 129.965 176.742 A 18.64 18.64 0 0 0 123.392 175.619 A 22.154 22.154 0 0 0 122.701 175.629 A 16.953 16.953 0 0 0 110.976 180.483 Q 105.984 185.347 105.984 193.283 A 22.68 22.68 0 0 0 106.167 196.208 A 16.288 16.288 0 0 0 110.976 206.083 A 16.672 16.672 0 0 0 116.819 209.824 Z" id="1" />
                                            <path d="M 183.379 209.824 A 18.64 18.64 0 0 0 189.952 210.947 A 22.154 22.154 0 0 0 190.643 210.936 A 16.953 16.953 0 0 0 202.368 206.083 Q 207.36 201.219 207.36 193.283 A 22.68 22.68 0 0 0 207.177 190.357 A 16.288 16.288 0 0 0 202.368 180.483 A 16.672 16.672 0 0 0 196.525 176.742 A 18.64 18.64 0 0 0 189.952 175.619 A 22.154 22.154 0 0 0 189.261 175.629 A 16.953 16.953 0 0 0 177.536 180.483 Q 172.544 185.347 172.544 193.283 A 22.68 22.68 0 0 0 172.727 196.208 A 16.288 16.288 0 0 0 177.536 206.083 A 16.672 16.672 0 0 0 183.379 209.824 Z" id="2" />
                                            <path d="M 249.939 209.824 A 18.64 18.64 0 0 0 256.512 210.947 A 22.154 22.154 0 0 0 257.203 210.936 A 16.953 16.953 0 0 0 268.928 206.083 Q 273.92 201.219 273.92 193.283 A 22.68 22.68 0 0 0 273.737 190.357 A 16.288 16.288 0 0 0 268.928 180.483 A 16.672 16.672 0 0 0 263.085 176.742 A 18.64 18.64 0 0 0 256.512 175.619 A 22.154 22.154 0 0 0 255.821 175.629 A 16.953 16.953 0 0 0 244.096 180.483 Q 239.104 185.347 239.104 193.283 A 22.68 22.68 0 0 0 239.287 196.208 A 16.288 16.288 0 0 0 244.096 206.083 A 16.672 16.672 0 0 0 249.939 209.824 Z" id="3" />
                                            <path d="M 301.056 237.571 L 301.056 218.115 L 314.88 218.115 A 14.564 14.564 0 0 0 326.445 212.842 A 20.623 20.623 0 0 0 328.448 210.051 Q 333.312 201.987 333.312 190.723 L 333.312 154.883 Q 333.312 142.595 337.92 132.867 Q 342.528 123.139 350.72 119.043 A 28.036 28.036 0 0 1 340.491 109.627 A 36.997 36.997 0 0 1 337.92 105.091 Q 333.312 95.491 333.312 82.947 L 333.312 46.851 Q 333.312 35.587 328.448 27.523 A 18.665 18.665 0 0 0 324.674 22.952 A 14.522 14.522 0 0 0 314.88 19.459 L 301.056 19.459 L 301.056 0.003 L 316.928 0.003 Q 327.936 0.003 336.512 6.403 A 41.817 41.817 0 0 1 348.902 21.367 A 49.853 49.853 0 0 1 349.824 23.299 A 54.299 54.299 0 0 1 354.537 44.364 A 62.809 62.809 0 0 1 354.56 46.083 L 354.56 84.227 A 42.459 42.459 0 0 0 355.177 91.719 Q 355.905 95.773 357.492 98.968 A 19.848 19.848 0 0 0 360.96 103.939 A 20.306 20.306 0 0 0 369.759 109.216 Q 373.017 110.229 376.961 110.497 A 43.279 43.279 0 0 0 379.904 110.595 L 379.904 127.235 Q 371.032 127.235 365.233 130.564 A 19.054 19.054 0 0 0 360.96 133.891 A 21.069 21.069 0 0 0 356.185 142.07 Q 354.56 147.024 354.56 153.603 L 354.56 191.491 Q 354.56 203.779 349.952 214.275 A 42.909 42.909 0 0 1 341.969 226.53 A 39.676 39.676 0 0 1 336.768 231.171 Q 328.192 237.571 317.184 237.571 L 301.056 237.571 Z" id="4" />
                                        </g>
                                    </svg>
                                </div>

                                <div className="mobile-only" style={{position: "absolute", zIndex: -1, opacity: 0.4, top: '30%', left: '-10%', right: 0, height: '50%', width: '120%'}}>
                                    {/* SVG created using https://danmarshall.github.io/google-font-to-svg-path/?font-select=Amiko&font-variant=regular&input-union=false&input-filled=true&input-kerning=false&input-separate=true&input-text=%7B...%7D&input-bezier-accuracy=&dxf-units=cm&input-size=256&input-fill=%23000&input-stroke=%23000000&input-strokeWidth=0.25mm&input-fill-rule=evenodd */}
                                    <svg style={{width: '100%', height: '100%', rotate: '-35deg'}} width="379.904" height="237.573" viewBox="0 0 379.904 237.573" xmlns="http://www.w3.org/2000/svg">
                                        <g id="svgGroup" style={{stroke: theme.palette.background.elevated, strokeWidth: '0.25mm', fill: theme.palette.background.elevated}}>
                                            <path d="M 46.592 154.883 L 46.592 190.723 Q 46.592 201.987 51.456 210.051 A 18.665 18.665 0 0 0 55.23 214.621 A 14.522 14.522 0 0 0 65.024 218.115 L 78.848 218.115 L 78.848 237.571 L 62.72 237.571 Q 51.712 237.571 43.136 231.171 A 40.929 40.929 0 0 1 30.696 215.89 A 48.713 48.713 0 0 1 29.952 214.275 Q 25.344 203.779 25.344 191.491 L 25.344 153.603 A 42.459 42.459 0 0 0 24.727 146.111 Q 23.999 142.057 22.412 138.861 A 19.848 19.848 0 0 0 18.944 133.891 A 20.306 20.306 0 0 0 10.145 128.613 Q 6.887 127.601 2.943 127.332 A 43.279 43.279 0 0 0 0 127.235 L 0 110.595 Q 8.872 110.595 14.671 107.265 A 19.054 19.054 0 0 0 18.944 103.939 A 21.069 21.069 0 0 0 23.719 95.76 Q 25.344 90.806 25.344 84.227 L 25.344 46.083 A 55.896 55.896 0 0 1 28.235 27.976 A 52.215 52.215 0 0 1 30.08 23.299 Q 34.816 12.803 43.392 6.403 Q 51.968 0.003 62.976 0.003 L 78.848 0.003 L 78.848 19.459 L 65.024 19.459 A 14.564 14.564 0 0 0 53.459 24.731 A 20.623 20.623 0 0 0 51.456 27.523 Q 46.592 35.587 46.592 46.851 L 46.592 82.947 A 58.032 58.032 0 0 1 45.476 94.582 A 45.014 45.014 0 0 1 41.984 105.091 A 34.322 34.322 0 0 1 37.072 112.713 A 27.224 27.224 0 0 1 29.184 119.043 Q 37.376 123.139 41.984 132.867 Q 46.592 142.595 46.592 154.883 Z" id="0" />
                                            <path d="M 116.819 209.824 A 18.64 18.64 0 0 0 123.392 210.947 A 22.154 22.154 0 0 0 124.083 210.936 A 16.953 16.953 0 0 0 135.808 206.083 Q 140.8 201.219 140.8 193.283 A 22.68 22.68 0 0 0 140.617 190.357 A 16.288 16.288 0 0 0 135.808 180.483 A 16.672 16.672 0 0 0 129.965 176.742 A 18.64 18.64 0 0 0 123.392 175.619 A 22.154 22.154 0 0 0 122.701 175.629 A 16.953 16.953 0 0 0 110.976 180.483 Q 105.984 185.347 105.984 193.283 A 22.68 22.68 0 0 0 106.167 196.208 A 16.288 16.288 0 0 0 110.976 206.083 A 16.672 16.672 0 0 0 116.819 209.824 Z" id="1" />
                                            <path d="M 183.379 209.824 A 18.64 18.64 0 0 0 189.952 210.947 A 22.154 22.154 0 0 0 190.643 210.936 A 16.953 16.953 0 0 0 202.368 206.083 Q 207.36 201.219 207.36 193.283 A 22.68 22.68 0 0 0 207.177 190.357 A 16.288 16.288 0 0 0 202.368 180.483 A 16.672 16.672 0 0 0 196.525 176.742 A 18.64 18.64 0 0 0 189.952 175.619 A 22.154 22.154 0 0 0 189.261 175.629 A 16.953 16.953 0 0 0 177.536 180.483 Q 172.544 185.347 172.544 193.283 A 22.68 22.68 0 0 0 172.727 196.208 A 16.288 16.288 0 0 0 177.536 206.083 A 16.672 16.672 0 0 0 183.379 209.824 Z" id="2" />
                                            <path d="M 249.939 209.824 A 18.64 18.64 0 0 0 256.512 210.947 A 22.154 22.154 0 0 0 257.203 210.936 A 16.953 16.953 0 0 0 268.928 206.083 Q 273.92 201.219 273.92 193.283 A 22.68 22.68 0 0 0 273.737 190.357 A 16.288 16.288 0 0 0 268.928 180.483 A 16.672 16.672 0 0 0 263.085 176.742 A 18.64 18.64 0 0 0 256.512 175.619 A 22.154 22.154 0 0 0 255.821 175.629 A 16.953 16.953 0 0 0 244.096 180.483 Q 239.104 185.347 239.104 193.283 A 22.68 22.68 0 0 0 239.287 196.208 A 16.288 16.288 0 0 0 244.096 206.083 A 16.672 16.672 0 0 0 249.939 209.824 Z" id="3" />
                                            <path d="M 301.056 237.571 L 301.056 218.115 L 314.88 218.115 A 14.564 14.564 0 0 0 326.445 212.842 A 20.623 20.623 0 0 0 328.448 210.051 Q 333.312 201.987 333.312 190.723 L 333.312 154.883 Q 333.312 142.595 337.92 132.867 Q 342.528 123.139 350.72 119.043 A 28.036 28.036 0 0 1 340.491 109.627 A 36.997 36.997 0 0 1 337.92 105.091 Q 333.312 95.491 333.312 82.947 L 333.312 46.851 Q 333.312 35.587 328.448 27.523 A 18.665 18.665 0 0 0 324.674 22.952 A 14.522 14.522 0 0 0 314.88 19.459 L 301.056 19.459 L 301.056 0.003 L 316.928 0.003 Q 327.936 0.003 336.512 6.403 A 41.817 41.817 0 0 1 348.902 21.367 A 49.853 49.853 0 0 1 349.824 23.299 A 54.299 54.299 0 0 1 354.537 44.364 A 62.809 62.809 0 0 1 354.56 46.083 L 354.56 84.227 A 42.459 42.459 0 0 0 355.177 91.719 Q 355.905 95.773 357.492 98.968 A 19.848 19.848 0 0 0 360.96 103.939 A 20.306 20.306 0 0 0 369.759 109.216 Q 373.017 110.229 376.961 110.497 A 43.279 43.279 0 0 0 379.904 110.595 L 379.904 127.235 Q 371.032 127.235 365.233 130.564 A 19.054 19.054 0 0 0 360.96 133.891 A 21.069 21.069 0 0 0 356.185 142.07 Q 354.56 147.024 354.56 153.603 L 354.56 191.491 Q 354.56 203.779 349.952 214.275 A 42.909 42.909 0 0 1 341.969 226.53 A 39.676 39.676 0 0 1 336.768 231.171 Q 328.192 237.571 317.184 237.571 L 301.056 237.571 Z" id="4" />
                                        </g>
                                    </svg>
                                </div>

                                <p style={{color: theme.palette.text.primary}}>{t("IntroGreeting") + " " + t("IntroText") + " "}</p>

                                <h1 style={{marginLeft: 50, marginRight: 50, color: theme.palette.primary.main}}>
                                    {t("About.Name")}
                                </h1>

                                <br />

                                <p style={{ color: theme.palette.text.primary }}>
                                    {t("IntroDescription") + " "}
                                    <TypeAnimation
                                        key={i18n.language + theme.palette.mode}
                                        sequence={[
                                            // Same substring at the start will only be typed out once, initially
                                            t("IntroDescriptionKeys.Developer").toString() + ".",
                                            1500, // wait 1s before replacing "Mice" with "Hamsters"
                                            t("IntroDescriptionKeys.Motorcyclist").toString() + ".",
                                            1500,
                                            t("IntroDescriptionKeys.CarEnthusiast").toString() + ".",
                                            1500,
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        style={{ display: "inline-block", color: theme.palette.text.primary, textDecoration: 'underline', textDecorationColor: theme.palette.primary.main, fontWeight: 'bold' }}
                                        repeat={Infinity}
                                    />
                                </p>
                            </div>
                            {
                                /**
                                 * End of section 1 | Home
                                 */
                            }

                            {
                                /**
                                 * Section 2 | About me
                                 */
                            }
                            <div className="section">
                                <h2 style={{marginLeft: 50, marginRight: 50, color: theme.palette.primary.main}}>
                                    {t("About.Title")}
                                </h2>

                                <table style={{ textAlign: 'start', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <colgroup>
                                        <col width={125} style={{color: theme.palette.text.primary}} />
                                        <col style={{color: theme.palette.text.primary}} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b>{t("About.Keys.Name")}</b>
                                            </td>

                                            <td>
                                                {t("About.Name")}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <b>{t("About.Keys.Location")}</b>
                                            </td>

                                            <td>
                                                {t("About.Location") + ", " + t("About.Country")}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <b>{t("About.Keys.Email")}</b>
                                            </td>

                                            <td>
                                                {t("About.Email")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                
                            </div>
                            {
                                /**
                                 * End of section 2 | About me
                                 */
                            }

                            <div className="section">
                                <div
                                    className="slide"
                                    onClick={() => fullpageApi.moveSlideRight()}
                                >
                                    Slide 3.1
                                    <p>employment-history works!</p>
                                </div>

                                <div className="slide">
                                    Slide 3.2
                                    <p>employment-history works (again)!</p>
                                </div>

                                <div className="slide">
                                    Slide 3.3
                                    <p>Yet another employment-history!</p>
                                </div>
                                {/*<h3>{this.props.content}</h3>*/}
                            </div>

                            <MySection content="Section 4" theme={theme} />

                            {theme.palette.mode}
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </div>
    );
}