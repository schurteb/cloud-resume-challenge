// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import * as React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export default function WelcomeTitle(props: any) {
    const { t } = useTranslation();

    const [linkText, setLinkText] = React.useState('');

    React.useEffect(() => {
        if (!props.linkText || props.linkText === "") {
            setLinkText('Cloud Resume Challenge');
            return;
        }

        if (props.linkText !== linkText) {
            setLinkText(props.linkText);
        }

    }, [props, linkText]);

    return (
        <Trans t={t} i18nKey="WelcomeTitle" linkText={linkText}>
            {/*//@ts-ignore*/}
            Welcome to <a href="https://resume.schurteb.ch/">{{linkText}}</a>!
        </Trans>
    );
  }