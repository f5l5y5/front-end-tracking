# front-end-tracking

A front-end tracking sdk.

## Usage

```js
npm install @taoismcn/front-end-tracking --save

```

## Usage:

```js
import Tracker from 'zmy-tracker'

const tr = new Tracker(options)

const tr = new Tracker({
	requestUrl: 'xxxxxx'
})
```

## options

```js
/**
 * @requestUrl request url
 * @historyTracker history router
 * @hashTracker hash router
 * @domTracker Tracker-key dom event report
 * @historyTracker sdkVersion
 * @historyTracker extra field
 * @jsError js and promise error
 */
export interface DefaultOptons {
	uuid: string | undefined;
	requestUrl: string | undefined;
	historyTracker: boolean;
	hashTracker: boolean;
	domTracker: boolean;
	sdkVersion: string | number;
	extra: Record<string, any> | undefined;
	jsError: boolean;
}
```
