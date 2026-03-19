import { toTailDashed } from './toTailDashed.js'

export const NAMESPACE = 'sxs'

/** Returns a declaration value with transformed token values. */
export const toTokenizedValue = (
	/** @type {string} */
	value,
	/** @type {string} */
	prefix,
	/** @type {string} */
	scale,
) => value.replace(
	// https://regex101.com/r/fKmHGL/1
	/(\$|--)([$\w-]+)/g,
	(match, separator, token) => {
		// Bare `--token` references are passed through unchanged.
		if (separator === '--') return match

		const isNamespaceToken = token.startsWith('$');

		// $token → prefix + scale + namespace + token, collapsing inner `$` into `-`
		const varName = toTailDashed(prefix).concat(
			(!token.includes('$') ? toTailDashed(scale) : ''),
			isNamespaceToken ? toTailDashed(NAMESPACE) : '',
			(isNamespaceToken ? token.slice(1) : token).replace(/\$/g, '-')
		);

		return `var(--${varName})`
	},
)
