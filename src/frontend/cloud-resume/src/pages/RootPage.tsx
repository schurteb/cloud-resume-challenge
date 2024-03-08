import { useTheme } from "@mui/material/styles";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useTranslation } from "react-i18next";
import WelcomeTitle from "../components/WelcomeTitle";

export default function RootPage() {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <div className="container">
            <main className="main">
                <h1 className="title">
                    <WelcomeTitle linkText={"thirdweb"} />
                </h1>

                <p className="description">
                    {t('Welcome to React')}
                    Get started by configuring your desired network in{" "}
                    <code className="code">src/index.tsx</code>, then modify the{" "}
                    <code className="code">src/App.tsx</code> file!
                </p>

                <small>You are running this application in <b>{process.env.REACT_APP_ENV_NAME}</b> mode.</small>
                <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>

                <div className="connect">
                    <ConnectWallet colorMode={theme.palette.mode === 'dark' ? 'light' : 'dark'} />
                </div>

                <div className="grid">
                    <a href="https://portal.thirdweb.com/" className="card">
                        <h2>Portal &rarr;</h2>
                        <p>
                            Guides, references and resources that will help you build with
                            thirdweb.
                        </p>
                    </a>

                    <a href="https://thirdweb.com/dashboard" className="card">
                        <h2>Dashboard &rarr;</h2>
                        <p>
                            Deploy, configure and manage your smart contracts from the
                            dashboard.
                        </p>
                    </a>

                    <a href="https://portal.thirdweb.com/templates" className="card">
                        <h2>Templates &rarr;</h2>
                        <p>
                            Discover and clone template projects showcasing thirdweb features.
                        </p>
                    </a>
                </div>
            </main>
        </div>
    );
}