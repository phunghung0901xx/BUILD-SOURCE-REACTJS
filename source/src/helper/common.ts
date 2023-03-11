
import queryString from 'query-string'



export const getQueryString = (query: any) => {
    const result = queryString.stringify(query)

    if (!result) return ''
    return `?${result}`
}