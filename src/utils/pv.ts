export const createHistoryEvent = <T extends keyof History>(type: T) => {
	const origin = history[type] // 获取原始数据
	return function (this: any) {
		// this 是假参数 或者是关闭tsconfig中的"noImplicitThis": false,
		const res = origin.apply(this, arguments)
		/**
		 Event : 创建自定义事件 
		 dispatchEvent 派发事件
		 addEventListener: 监听事件
		 removeEventListener 删除事件
		 发布订阅
		 */
		/** 创建自定义事件，通过dispatch进行派发 addEventListener进行监听 监听什么事件，就是pushState事件 */
		const e = new Event(type)
		window.dispatchEvent(e)
		return res
	}
}
