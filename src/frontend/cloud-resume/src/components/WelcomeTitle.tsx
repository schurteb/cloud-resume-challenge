import * as React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export default function WelcomeTitle(props: any) {
    const { t } = useTranslation();

    const [linkText, setLinkText] = React.useState('');

    React.useEffect(() => {
        if (!props.linkText || props.linkText === "") {
            setLinkText('thirdweb');
            return;
        }

        if (props.linkText !== linkText) {
            setLinkText(props.linkText);
        }

    }, [props, linkText]);

    return (
        <Trans t={t} i18nKey="WelcomeTitle" linkText={linkText}>
            {/*//@ts-ignore*/}
            Welcome to <a href="https://thirdweb.com/">{{linkText}}</a>!
        </Trans>
    );
  }