import { createStitches } from '../src/index.js'

describe('Issue #519', () => {
	test('locally scoped token works 1 time', () => {
		const { css, getCssText } = createStitches({ prefix: 'fusion' })

		css({
			$$syntax: 'red',

			h1: {
				color: '$$syntax',
			},
		})()

		expect(getCssText()).toBe(
			`--sxs{--sxs:2 fusion-c-fjkySu}` +
			`@media{` +
				`.fusion-c-fjkySu{--fusion-sxs-syntax:red}` +
				`.fusion-c-fjkySu h1{color:var(--fusion-sxs-syntax)}` +
			`}`
		)
	})

	test('locally scoped prefix-free token works 1 time', () => {
		const { css, getCssText } = createStitches()

		css({
			$$syntax: 'red',

			h1: {
				color: '$$syntax',
			},
		})()

		expect(getCssText()).toBe(
			`--sxs{--sxs:2 c-fjkySu}` +
			`@media{` +
				`.c-fjkySu{--sxs-syntax:red}` +
				`.c-fjkySu h1{color:var(--sxs-syntax)}` +
			`}`
		)
	})

	test('locally scoped token works 2 times', () => {
		const { css, getCssText } = createStitches({ prefix: 'fusion' })

		css({
			$$syntax: 'red',

			h1: {
				color: '$$syntax',
			},

			h2: {
				color: '$$syntax',
			},
		})()

		expect(getCssText()).toBe(
			`--sxs{--sxs:2 fusion-c-lkpaIy}` +
			`@media{` +
				`.fusion-c-lkpaIy{--fusion-sxs-syntax:red}` +
				`.fusion-c-lkpaIy h1{color:var(--fusion-sxs-syntax)}` +
				`.fusion-c-lkpaIy h2{color:var(--fusion-sxs-syntax)}` +
			`}`
		)
	})

	test('locally scoped prefix-free token works 2 times', () => {
		const { css, getCssText } = createStitches()

		css({
			$$syntax: 'red',

			h1: {
				color: '$$syntax',
			},

			h2: {
				color: '$$syntax',
			},
		})()

		expect(getCssText()).toBe(
			`--sxs{--sxs:2 c-lkpaIy}` +
			`@media{` +
				`.c-lkpaIy{--sxs-syntax:red}` +
				`.c-lkpaIy h1{color:var(--sxs-syntax)}` +
				`.c-lkpaIy h2{color:var(--sxs-syntax)}` +
			`}`
		)
	})

	test('locally scoped token works 3 times', () => {
		const { css, getCssText } = createStitches({ prefix: 'fusion' })

		css({
			$$syntax: 'red',

			h1: {
				color: '$$syntax',
			},

			h2: {
				color: '$$syntax',
			},

			h3: {
				color: '$$syntax',
			},
		})()

		expect(getCssText()).toBe(
			`--sxs{--sxs:2 fusion-c-kbkiiL}` +
			`@media{` +
				`.fusion-c-kbkiiL{--fusion-sxs-syntax:red}` +
				`.fusion-c-kbkiiL h1{color:var(--fusion-sxs-syntax)}` +
				`.fusion-c-kbkiiL h2{color:var(--fusion-sxs-syntax)}` +
				`.fusion-c-kbkiiL h3{color:var(--fusion-sxs-syntax)}` +
			`}`
		)
	})

	test('locally scoped prefix-free token works 3 times', () => {
		const { css, getCssText } = createStitches()

		css({
			$$syntax: 'red',

			h1: {
				color: '$$syntax',
			},

			h2: {
				color: '$$syntax',
			},

			h3: {
				color: '$$syntax',
			},
		})()

		expect(getCssText()).toBe(
			`--sxs{--sxs:2 c-kbkiiL}` +
			`@media{` +
				`.c-kbkiiL{--sxs-syntax:red}` +
				`.c-kbkiiL h1{color:var(--sxs-syntax)}` +
				`.c-kbkiiL h2{color:var(--sxs-syntax)}` +
				`.c-kbkiiL h3{color:var(--sxs-syntax)}` +
			`}`
		)
	})
})
