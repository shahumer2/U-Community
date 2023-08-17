// it is here to check if the access token is present or not



export const getAccessToken = () => {
    return (
        sessionStorage.getItem("accessToken")
    )
}
export const eliptsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str
}
export const getType = (value, body) => {
    if (value.params) {
        return {
            params: body
        }
    }
    else if (value.query) {
        if (typeof body === "object")
            return { query: body._id }
        else {
            return { query: body }
        }

    }
    return {}

}

