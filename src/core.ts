import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export let instance: AxiosInstance = axios.create({

})

export function createRequest({ params, args, route, method }: {
    method: 'get' | 'post'
    route: string
    params: string[]
    args: any[]
}) {

    if (params.length !== args.length) throw new Error('参数数目不对')
    let queryMap: Record<string, string> = {}

    let body: any

    params.forEach((item, i) => {
        let [type, paraName] = item.split('_')
        switch (type) {
            case 'Param':
                route = resolveParams(route, paraName, args[i]); return;
            case 'Query':
                resolveQuery(queryMap, paraName, args[i]); return
            case 'Body':
                body = args[i]
        }
    })

    const url = resolveUrl(route, queryMap)

    return body ? [method, url, body] : [method, url]

}


function resolveUrl(route: string, query: Record<string, string>) {
    route += '?'
    for (let i in query) {
        if (!route.endsWith('?')) route += '&'
        route += `${i}=${query[i]}`
    }
    return route
}


function resolveQuery(query: Record<string, string>, param: string, arg: string,) {
    query[param] = arg
}


export function resolveParams(route: string, param: string, arg: string) {

    return route.replace(`:${param}`, arg)
}

//@ts-ignore
export declare function useRequest<R>(
    p:R,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<Awaited<R>>>

//@ts-ignore
export function useRequest(reqInfo, config) {
    //@ts-ignore
    return instance[reqInfo.shift()](...reqInfo, config);
}

export function toReq<C extends new (p:any) => any>(controller: C):InstanceType<C> {
        //@ts-ignore
    return new controller()
}


export function injectInstance(ins: AxiosInstance) {
    instance = ins
}