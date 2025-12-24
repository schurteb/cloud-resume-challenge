// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

//import React from "react";
import { useTheme } from "@mui/material/styles";
import ReactFullpage from "@fullpage/react-fullpage";
import { CustomTheme } from "../styles/CustomTheme";

import Home from "./sections/Home";
import About from "./sections/About";

import "../styles/fullpage.css";

// NOTE: if using fullpage extensions/plugins put them here and pass it as props
// NOTE #2: After migration from CRA to Vite -> Import the plugin at the top level (side-effect import for window.fp_scrollHorizontallyExtension)
import "./../statics/fullpage.scrollHorizontally.min";

const pluginWrapper = () => {
    // Plugin is already loaded via the import above
};

/*class MySection extends React.Component<{ content: any; theme: CustomTheme }> {
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
}*/

export default function FullPage() {
    const theme = useTheme<CustomTheme>();

    const anchors = ["home", "about", /*"skills", "work", "projects"*/];

    return (
        <div id="fullpage_wrapper_custom">
            <ReactFullpage
                //fullpage options

                pluginWrapper={pluginWrapper}
                // front-end code cannot be completely hidden, however, this doesn't matter in this case
                // as stated in https://alvarotrigo.com/fullPage/help/Where-to-use-fullPage-license/
                licenseKey={"03ML8-KQ6I6-S51KK-P55JK-OXYZO"}
                scrollHorizontally={true} /* Because we are using the extension */
                scrollHorizontallyKey={"UWZjMk5vZFhKMFpXSXVZMmc9Q3BfV2pHYzJOeWIyeHNTRzl5YVhwdmJuUmhiR3g1Zmh6"}
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
                            <Home />

                            <About />

                            {/*<div className="section">
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
                                {
                                //<h3>{this.props.content}</h3>
                                }
                            </div>*/}

                            {/*<MySection content="Section 4" theme={theme} />*/}

                            {theme.palette.mode}
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </div>
    );
}
