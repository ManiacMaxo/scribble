export const sleep = (ms: number, resolver?: (value: unknown) => void) => {
    new Promise((resolve) => setTimeout(resolver ?? resolve, ms))
}
