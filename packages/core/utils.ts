import { isDate, isDateTime, isDuration, isInt, isLocalDateTime, isLocalTime, isTime } from "neo4j-driver"

// tag::toNativeTypes[]
/**
 * Convert Neo4j Properties back into JavaScript types
 *
 * @param {Record<string, any>} properties
 * @return {Record<string, any>}
 */
export function toNativeTypes<T = any>(properties: Record<string, any>) {
    return Object.fromEntries(Object.keys(properties).map((key) => {
        let value = valueToNativeType(properties[key])

        return [key, value]
    })) as T
}

/**
 * Convert an individual value to its JavaScript equivalent
 *
 * @param {any} value
 * @returns {any}
 */
function valueToNativeType(value: any) {
    if (Array.isArray(value)) {
        value = value.map(innerValue => valueToNativeType(innerValue))
    }
    else if (isInt(value)) {
        value = value.toNumber()
    }
    else if (
        isDate(value) ||
        isDateTime(value) ||
        isTime(value) ||
        isLocalDateTime(value) ||
        isLocalTime(value) ||
        isDuration(value)
    ) {
        value = value.toString()
    }
    else if (typeof value === 'object' && value !== undefined && value !== null) {
        value = toNativeTypes(value)
    }

    return value
}
// end::toNativeTypes[]
