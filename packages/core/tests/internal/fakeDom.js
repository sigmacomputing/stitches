/**
 * Minimal in-memory CSSOM/DOM mocks that exercise sheet.js's browser-dependent branches
 * (constructable stylesheets, and the classic <style>-element fallback) without a real
 * browser — jsdom doesn't implement constructable stylesheets, so it can't be used here.
 */

class FakeCSSMediaGroupRule {
	constructor() {
		this.type = 4
		this.cssRules = []
	}
	get cssText() {
		return `@media{${this.cssRules.map((rule) => rule.cssText).join('')}}`
	}
	insertRule(cssText, index) {
		this.cssRules.splice(index, 0, { type: 1, cssText })
	}
	deleteRule(index) {
		this.cssRules.splice(index, 1)
	}
}

/**
 * Reformats a `--sxs{--sxs:N}` marker into the spaced-out shape a real browser's CSSOM
 * serializer returns for a simple style rule (`selector { prop: value; }`), since sheet.js's
 * hydration scan parses that exact shape back out via `cssText.slice(14, -3)`.
 */
const formatMarkerRuleCssText = (/** @type {string} */ insertedCssText) => {
	const index = insertedCssText.slice('--sxs{--sxs:'.length, -1)
	return `--sxs { --sxs: ${index}; }`
}

export class FakeCSSStyleSheet {
	constructor() {
		this.cssRules = []
	}
	insertRule(cssText, index) {
		const rule = cssText === '@media{}' ? new FakeCSSMediaGroupRule() : { type: 1, cssText: formatMarkerRuleCssText(cssText) }
		this.cssRules.splice(index, 0, rule)
		return index
	}
	deleteRule(index) {
		this.cssRules.splice(index, 1)
	}
}
// only needs to exist for sheet.js's `'replaceSync' in CSSStyleSheet.prototype` feature-detection
FakeCSSStyleSheet.prototype.replaceSync = function replaceSync() {}

/** A fake `DocumentOrShadowRoot`: enough surface for sheet.js — `styleSheets`, `adoptedStyleSheets`, `head.appendChild`. */
export const createFakeRoot = () => {
	const root = {
		styleSheets: [],
		adoptedStyleSheets: [],
		head: {
			appendChild(styleEl) {
				styleEl.sheet = new FakeCSSStyleSheet()
				root.styleSheets.push(styleEl.sheet)
				return styleEl
			},
		},
	}
	return root
}

/**
 * Installs the globals sheet.js's code reads directly: `CSSStyleSheet` (feature-detection +
 * construction), and `document`/`window` for the `<style>`-element fallback path
 * (`document.createElement`, `getNonce`). The test runner executes every test file in one
 * shared Node process, so these must be restored afterwards or they'd leak into unrelated
 * test files — e.g. making `createStitches()` elsewhere pick up a fake `root` by default.
 * Returns a restore function; call it once all assertions for this file have run.
 */
export const installFakeGlobals = () => {
	const previous = {
		CSSStyleSheet: globalThis.CSSStyleSheet,
		window: globalThis.window,
		document: globalThis.document,
	}

	globalThis.CSSStyleSheet = FakeCSSStyleSheet
	globalThis.window = {}
	globalThis.document = {
		createElement: (tagName) => ({
			tagName,
			attributes: {},
			setAttribute(name, value) {
				this.attributes[name] = value
			},
		}),
	}

	return () => {
		globalThis.CSSStyleSheet = previous.CSSStyleSheet
		globalThis.window = previous.window
		globalThis.document = previous.document
	}
}
