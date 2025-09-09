export const toPolyfilledValue = {
	// prefixed properties
	appearance: (d) => ({ WebkitAppearance: d, appearance: d }),
	backfaceVisibility: (d) => ({ WebkitBackfaceVisibility: d, backfaceVisibility: d }),
	backdropFilter: (d) => ({ WebkitBackdropFilter: d, backdropFilter: d }),
	backgroundClip: (d) => ({ WebkitBackgroundClip: d, backgroundClip: d }),
	boxDecorationBreak: (d) => ({ WebkitBoxDecorationBreak: d, boxDecorationBreak: d }),
	clipPath: (d) => ({ WebkitClipPath: d, clipPath: d }),
	content: (d) => ({ content: d.includes('"') || d.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(d) ? d : `"${d}"` }),
	hyphens: (d) => ({ WebkitHyphens: d, hyphens: d }),
	maskImage: (d) => ({ WebkitMaskImage: d, maskImage: d }),
	maskSize: (d) => ({ WebkitMaskSize: d, maskSize: d }),
	textSizeAdjust: (d) => ({ WebkitTextSizeAdjust: d, textSizeAdjust: d }),
	userSelect: (d) => ({ WebkitUserSelect: d, userSelect: d }),
}
