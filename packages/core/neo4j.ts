import neo4j, { Driver, Session, SessionMode } from "neo4j-driver";

// Environment variables?
const {
    NEO4J_URI,
    NEO4J_USERNAME,
    NEO4J_PASSWORD,
} = import.meta.env

//  Cached driver instance
let cachedDriver: Driver

export async function connectWithEnv() {
    if ( !NEO4J_URI ) {
        throw new Error(`Cannot connect with environment variables. Missing ${NEO4J_URI}. Have you created a .env file?`)
    }

    if ( !NEO4J_USERNAME ) {
        throw new Error(`Cannot connect with environment variables. Missing ${NEO4J_USERNAME}. Have you created a .env file?`)
    }

    if ( !NEO4J_PASSWORD ) {
        throw new Error(`Cannot connect with environment variables. Missing ${NEO4J_PASSWORD}. Have you created a .env file?`)
    }

    cachedDriver = await connect(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD)

    return cachedDriver
}

export async function connect(uri: string, username: string, password: string) {
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
    // Try to connect with .env variables if `connect()` has not been called
    if ( !cachedDriver ) {
        await connectWithEnv()
    }

    return cachedDriver
}


export async function openSession(database: string | undefined = undefined, defaultAccessMode: SessionMode = neo4j.session.READ): Promise<Session> {
    const driver = await getDriver()

    return driver.session({
        database,
        defaultAccessMode,
    })
}
