import { createStitches } from '../src/index.js'

describe('Logical Properties', () => {
	test('marginBlock', () => {
		const { globalCss, toString } = createStitches()

		globalCss({
			'x-element': {
				marginBlock: 0,
			},
			'y-element': {
				marginBlock: '10px !important',
			},
			'z-element': {
				marginBlock: '5px 10px',
			},
		})()

		expect(toString()).toBe(
			`--sxs{--sxs:1 fXyjwi}@media{` +
				`x-element{margin-block:0}` +
				`y-element{margin-block:10px !important}` +
				`z-element{margin-block:5px 10px}` +
			`}`
		)
	})

	test('marginInline', () => {
		const { globalCss, toString } = createStitches()

		globalCss({
			'x-element': {
				marginInline: 0,
			},
			'y-element': {
				marginInline: '10px !important',
			},
			'z-element': {
				marginInline: '5px 10px',
			},
		})()

		expect(toString()).toBe(
			`--sxs{--sxs:1 ghnYnm}@media{` +
				`x-element{margin-inline:0}` +
				`y-element{margin-inline:10px !important}` +
				`z-element{margin-inline:5px 10px}` +
			`}`
		)
	})

	test('paddingBlock', () => {
		const { globalCss, toString } = createStitches()

		globalCss({
			'x-element': {
				paddingBlock: 0,
			},
			'y-element': {
				paddingBlock: '10px !important',
			},
			'z-element': {
				paddingBlock: '5px 10px',
			},
		})()

		expect(toString()).toBe(
			`--sxs{--sxs:1 gDAiNt}@media{` +
				`x-element{padding-block:0}` +
				`y-element{padding-block:10px !important}` +
				`z-element{padding-block:5px 10px}` +
			`}`
		)
	})

	test('paddingInline', () => {
		const { globalCss, toString } = createStitches()

		globalCss({
			'x-element': {
				paddingInline: 0,
			},
			'y-element': {
				paddingInline: '10px !important',
			},
			'z-element': {
				paddingInline: '5px 10px',
			},
		})()

		expect(toString()).toBe(
			`--sxs{--sxs:1 geOKtd}@media{` +
				`x-element{padding-inline:0}` +
				`y-element{padding-inline:10px !important}` +
				`z-element{padding-inline:5px 10px}` +
			`}`
		)
	})
})
