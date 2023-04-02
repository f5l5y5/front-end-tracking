import { DefaultOptions, TrackerConfig, Options } from '../types/index'
import { createHistoryEvent } from '../utils/pv'

const MouseEventList: string[] = [
	'click',
	'dblclick',
	'contextmenu',
	'mousedown',
	'mouseup',
	'mouseenter',
	'mouseout',
	'mouseover'
]
export default class Tracker {
	public data: Options
	// 用户传入配置项
	constructor(options: Options) {
		this.data = Object.assign(this.initDef(), options)
		this.installTracker()
	}

	private initDef(): DefaultOptions {
		// 重写pushState事件的方法
		window.history['pushState'] = createHistoryEvent('pushState')
		window.history['replaceState'] = createHistoryEvent('replaceState')
		return <DefaultOptions>{
			sdkVersion: TrackerConfig.version,
			historyTracker: false,
			hashTracker: false,
			domTracker: false,
			jsError: false
		}
	}
	// 透传字段
	public setUserId<T extends DefaultOptions['uuid']>(uuid: T) {
		this.data.uuid = uuid
	}

	public setExtra<T extends DefaultOptions['extra']>(extra: T) {
		this.data.extra = extra
	}

	/**
	 * @description 事件捕获器
	 * @param mouseEventListener 事件类型
	 * @param targetKey 上传的名称，后端约定
	 * @param data
	 */
	private captureEvents<T>(mouseEventListener: string[], targetKey: string, data?: T) {
		mouseEventListener.forEach(event => {
			window.addEventListener(event, () => {
				console.log(event, '监听到了')
				// 进行上报
				this.reportTracker({
					event,
					targetKey,
					data
				})
			})
		})
	}
	/** 是否开启hash/history */
	private installTracker() {
		if (this.data.historyTracker) {
			this.captureEvents(['pushState', 'replaceState', 'popstate'], 'history-pv')
		}
		if (this.data.hashTracker) {
			this.captureEvents(['hashchange'], 'hash-pv')
		}
		if (this.data.domTracker) {
			this.targetKeyReport()
		}
		if (this.data.jsError) {
			console.log('打印***111', 111)
			this.jsError()
		}
	}

	/** dom上报 */
	private targetKeyReport() {
		MouseEventList.forEach(ev => {
			window.addEventListener(ev, e => {
				const target = e.target as HTMLElement
				const targetKey = target.getAttribute('target-key')
				if (targetKey) {
					this.reportTracker({
						event: ev,
						targetKey
					})
				}
			})
		})
	}
	/** js错误上报 */
	private errorEvent() {
		window.addEventListener('error', event => {
			console.log('打印***error', event)
			this.reportTracker({
				event: 'error',
				targetKey: 'message',
				message: event.message
			})
		})
	}

	/** promise错误上报 */
	private promiseEvent() {
		window.addEventListener('unhandledrejection', event => {
			event.promise.catch(error => {
				this.reportTracker({
					event: 'promise',
					targetKey: 'message',
					message: error
				})
			})
		})
	}

	/** jsError */
	private jsError() {
		this.errorEvent()
		this.promiseEvent()
	}

	/** 手动上报 */
	public sendTracker<T>(data: T) {
		this.reportTracker(data)
	}

	/** 上报 */
	private reportTracker<T>(data: T) {
		const params = Object.assign(this.data, data, { time: new Date().getTime() })
		let headers = {
			type: 'application/x-www-form-urlencoded'
		}
		let blob = new Blob([JSON.stringify(params)], headers)
		// 不能传JSON
		navigator.sendBeacon(this.data.requestUrl, blob)
	}
}
