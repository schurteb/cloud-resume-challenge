import { createContext } from "react";

const ContractContext = createContext({ getContract: (): any => {}, setContract: (): void => {} });

export default ContractContext;