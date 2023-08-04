export const asyncTimeout = async (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}