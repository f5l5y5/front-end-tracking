import path from 'path'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

import { fileURLToPath } from 'url'
const metaUrl = fileURLToPath(import.meta.url)
const dirName = path.dirname(metaUrl)

export default [
	{
		input: './src/core/index.ts',
		output: [
			{
				file: path.resolve(dirName, './dist/index.esm.js'),
				format: 'es'
			},
			{
				file: path.resolve(__dirname, './dist/index.cjs.js'),
				format: 'cjs'
			},
			{
				file: path.resolve(__dirname, './dist/index.js'),
				format: 'umd', // 同时支持 可以注入到全局amd cmd
				name: 'tracker'
			}
		],
		plugins: [ts()]
	},
	{
		input: './src/core/index.ts',
		output: {
			file: path.resolve(__dirname, './dist/index.d.ts'),
			format: 'es'
		},
		plugins: [dts()]
	}
]
