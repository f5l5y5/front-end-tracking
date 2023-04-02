/**
 * @requestUrl 上报接口地址
 * @historyTracker history上报 单页应用的路由
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @sdkVersionsdk版本
 * @extra透传字段 自定义参数上报
 * @jsError js 和 promise 报错异常上报
 */
export interface DefaultOptions {
	uuid: string | undefined
	requestUrl: string | undefined
	historyTracker: boolean
	hashTracker: boolean
	domTracker: boolean
	sdkVersion: string | number
	extra: Record<string, any> | undefined
	jsError: boolean
}

//必传参数 requestUrl
export interface Options extends Partial<DefaultOptions> {
	requestUrl: string
}

//版本
export enum TrackerConfig {
	version = '1.0.0'
}
//上报必传参数
export type reportTrackerData = {
	[key: string]: any
	event: string
	targetKey: string
}
