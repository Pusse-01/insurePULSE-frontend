const { DefaultAzureCredential } = require("@azure/identity");
const { DataLakeServiceClient } = require("@azure/storage-file-datalake");

const accountName = "ipulsedatalake";
const accountUrl = "https://ipulsedatalake.dfs.core.windows.net/";
const accountKey = "AB15bNbplHUkpRKD/iaPCpcNfICjZVMcYC6vZdwrrF2G2SsVcXd46fdVJj5drzQ8nB5059/YNxGu+AStAICMKg==";
const containerName = "fairfirst";

const defaultAzureCredential = new DefaultAzureCredential();
const dataLakeServiceClient = new DataLakeServiceClient(accountUrl, defaultAzureCredential);

export async function getDirectories() {
    const fileSystemClient = dataLakeServiceClient.getFileSystemClient(containerName);
    const paths = fileSystemClient.listPaths();

    const directories = [];
    for await (const path of paths) {
        if (path.isDirectory) {
            directories.push({
                name: path.name,
                lastUpdated: path.lastModified
            });
        }
    }

    return directories;
}

