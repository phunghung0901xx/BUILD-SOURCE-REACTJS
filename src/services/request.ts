import axios from 'axios'
import { HOST } from './../constants/url'
import { getQueryString } from '../helper/common'
import addKeyLocalStorage from '../helper/localStorage';
import { requestModel } from '../models/requestModels';


const send = ({
    method = 'get', path, data = null, query = null, headers = {}, newUrl
}: requestModel) => {
    return new Promise((resolve) => {
        let url = HOST + `${path}${getQueryString(query)}`
        if (newUrl) {
            url = `${newUrl}${getQueryString(query)}`
        }
        const dataString = window.localStorage.getItem(addKeyLocalStorage('data'))
        if (dataString) {
            const newData = JSON.parse(dataString)
            headers.authorization = `Bearer ${newData.token}`
        }
        axios({
            method, url, data, headers,
        })
            .then((result) => {
                const data = result.data
                return resolve(data)
            })
            .catch((error) => {
                const { response = {} } = error

                const result = response.data ? response.data : null
                if (!result) {

                }
                else {
                    const { statusCode, message: data } = result

                    if (statusCode === 401) {
                        // message.warn(data || "Somethig was wrong")
                        setTimeout(() => {
                            window.localStorage.clear()
                            window.location.href = '/'
                        }, 1000)

                    }
                    else if (
                        (statusCode === 401 && data === 'Unauthorized') || (statusCode === 403 && data === 'InvalidToken')) {
                        window.localStorage.clear()
                        window.location.href = '/'
                    }
                    else if (statusCode === 505) {
                        window.localStorage.clear()
                        window.location.href = '/'
                    }
                    else if (statusCode === 500) {
                        return resolve(result)
                    }
                    else {
                        return resolve(result)
                    }
                }
            })
    })
}

export default {
    send
}