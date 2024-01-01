import { DemoDataSource } from "./DemoDataSource";
import { EthereumDataSource } from "./EthereumDataSource";

export const dataSourceFactory = {
    "real": new EthereumDataSource(),
    "demo": new DemoDataSource(),
};