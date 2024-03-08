import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import WelcomeTitle from "../components/WelcomeTitle";
import isDevelopment from "../isDevelopment";
import { CustomTheme } from "../styles/CustomTheme";

export default function CrowdfundingIndexPage() {
    const theme = useTheme<CustomTheme>();

    return (
        <div className="container">
            <main className="main">
                <h1 className="title">
                    <WelcomeTitle linkText={"Crowdfunding Page"} />
                </h1>

                <p className="description">
                    Get started by configuring your desired network in{" "}
                    <code className="code">src/index.tsx</code>, then modify the{" "}
                    <code className="code">src/App.tsx</code> file!
                </p>

                {isDevelopment() ?
                <>
                    <Button>
                        <Link to="create">Create</Link>
                    </Button>

                    <Button>
                        <Link to="manage/0x4d5aCc4b1D19D969023918CF37572889d35d51Ea">Manage</Link>
                    </Button>
                </>
                 : <></>}

                <div className="grid">
                    <Link to="create" className="card"
                        style={{
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.elevated
                        }}
                    >
                        <h2>Create &rarr;</h2>
                        <p>
                            Create a new crowdfunding campaign to raise funds for your next project.
                        </p>
                    </Link>

                    <Link to="manage" className="card"
                        style={{
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.elevated
                        }}
                    >
                        <h2>Manage &rarr;</h2>
                        <p>
                            Manage, update, transfer ownership of, or cancel an existing crowdfunding campaign.
                        </p>
                    </Link>
                </div>
            </main>
    </div>
    );
}