import { createSheet, names } from '../src/sheet.js'
import { createFakeRoot, FakeCSSStyleSheet, installFakeGlobals } from './internal/fakeDom.js'

// sheet.js reads `CSSStyleSheet`/`document`/`window` as ambient globals, so they're faked here.
// restoreGlobals() runs synchronously right after describe() below — every test() body in this
// file is itself synchronous, so by the time describe()'s own internal `await call()` yields,
// all assertions below have already executed and it's safe to restore the real globals before
// the test runner moves on to the next file (it shares one Node process across all test files).
const restoreGlobals = installFakeGlobals()

describe('sheet.js — constructable stylesheets', () => {
	test('uses adoptedStyleSheets when supported, and never appends a <style> element', () => {
		const root = createFakeRoot()

		const groupSheet = createSheet(root)

		expect(root.adoptedStyleSheets.length).toBe(1)
		expect(groupSheet.sheet).toBe(root.adoptedStyleSheets[0])
		expect(root.adoptedStyleSheets[0]).toBeInstanceOf(FakeCSSStyleSheet)
		expect(root.styleSheets.length).toBe(0)
	})

	test('applies and serializes rules through the adopted stylesheet', () => {
		const root = createFakeRoot()
		const groupSheet = createSheet(root)

		groupSheet.rules.styled.apply('.a{color:red}')

		expect(groupSheet.toString()).toBe('--sxs{--sxs:2}@media{.a{color:red}}')
	})

	test('reset() rehydrates from the adopted stylesheet instead of re-adopting or duplicating groups', () => {
		const root = createFakeRoot()
		const groupSheet = createSheet(root)

		groupSheet.rules.styled.apply('.a{color:red}')
		groupSheet.reset()

		// must not have adopted a second stylesheet
		expect(root.adoptedStyleSheets.length).toBe(1)

		// the rule applied before reset() must still be there
		expect(groupSheet.toString()).toBe('--sxs{--sxs:2}@media{.a{color:red}}')

		// applying after reset() must append to the rehydrated group, not a duplicate one
		groupSheet.rules.styled.apply('.b{color:blue}')
		expect(groupSheet.toString()).toBe('--sxs{--sxs:2}@media{.a{color:red}.b{color:blue}}')

		// every group's marker/media pair must appear exactly once, not duplicated by the rescan
		const markerRuleCount = root.adoptedStyleSheets[0].cssRules.filter((rule) => rule.cssText.startsWith('--sxs')).length
		expect(markerRuleCount).toBe(names.length)

		groupSheet.reset()
		expect(root.adoptedStyleSheets.length).toBe(1)
	})

	test('falls back to a <style> element when constructable stylesheets are unsupported', () => {
		const originalReplaceSync = FakeCSSStyleSheet.prototype.replaceSync
		delete FakeCSSStyleSheet.prototype.replaceSync

		try {
			const root = createFakeRoot()
			const groupSheet = createSheet(root)

			expect(root.adoptedStyleSheets.length).toBe(0)
			expect(root.styleSheets.length).toBe(1)

			groupSheet.rules.styled.apply('.c{color:green}')
			expect(groupSheet.toString()).toBe('--sxs{--sxs:2}@media{.c{color:green}}')
		} finally {
			FakeCSSStyleSheet.prototype.replaceSync = originalReplaceSync
		}
	})
})

restoreGlobals()
