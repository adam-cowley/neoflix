import neo4j, { Driver } from "neo4j-driver";

let cachedDriver: Driver

export async function connect(uri: string, username: string, password: string): Promise<Driver> {
    if ( cachedDriver ) {
        return Promise.resolve(cachedDriver)
    }

    // Create driver instance
    const driver = neo4j.driver(
        uri,
        neo4j.auth.basic(username, password)
    )

    // Verify Connectivity
    await driver.verifyConnectivity()

    return driver
}

export async function getDriver(): Promise<Driver> {
    if ( !cachedDriver ) {
        throw new Error('No cached driver instance, have you called `connect()` ?')
    }

    return cachedDriver
}
