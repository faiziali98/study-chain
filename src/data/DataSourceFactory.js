import { EthereumDataSource } from "./EthereumDataSource";

export const dataSourceFactory = {
    "real": new EthereumDataSource()
};