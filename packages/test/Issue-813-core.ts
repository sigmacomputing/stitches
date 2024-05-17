// https://github.com/stitchesjs/stitches/issues/813
import { createStitches } from '@sigmacomputing/stitches-core'
import * as Stitches from '@sigmacomputing/stitches-core'

export const { config, css } = createStitches({
	theme: {
		colors: {
			primary: 'transparent'
		}
	},
	utils: {
		bg: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
			color: value
		}),
		c: (value: Stitches.ScaleValue<'colors'>) => ({
			color: value
		}),
	}
})

// ensure `PropertyValue` accepts a valid CSS Color
export const colorValue1: Stitches.PropertyValue<'backgroundColor', typeof config> = "RebeccaPurple"
// ensure `PropertyValue` accepts a valid token
export const colorValue2: Stitches.PropertyValue<'backgroundColor', typeof config> = "$primary"

// ensure `ScaleValue` accepts a valid token
export const colorToken: Stitches.ScaleValue<'colors', typeof config> = "$primary"

export const box = css({
	// ensure `bg` accepts a valid CSS Color
	bg: 'RebeccaPurple',
	// ensure `bg` accepts a valid token
	'&': { bg: '$primary' },
	// ensure `c` accepts a valid token
	c: '$primary',
})