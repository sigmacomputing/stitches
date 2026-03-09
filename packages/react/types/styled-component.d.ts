import type * as React from 'react'
import type * as Util from './util.js'


export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;

/** Returns a new Styled Component. */
export interface StyledComponent<
	Type = 'span',
	Props = {},
	CSS = {}
> extends React.ForwardRefExoticComponent<
	Util.Assign<
		Type extends IntrinsicElementsKeys | React.ComponentType<any>
			? React.ComponentPropsWithRef<Type>
		: never,
		Props & { css?: CSS }
	>
> {
	(
		props: Util.Assign<
			Type extends IntrinsicElementsKeys | React.ComponentType<any>
				? React.ComponentPropsWithRef<Type>
			: {},
			Props & {
				as?: never,
				css?: CSS
			}
		>
	): React.ReactElement | null

	<
		C extends CSS,
		As extends string | React.ComponentType<any> = Type extends string | React.ComponentType<any> ? Type : any,
		InnerProps = Type extends StyledComponent<any, infer IP, any> ? IP : {},
	>(
		props: Util.Assign<
			React.ComponentPropsWithRef<As extends IntrinsicElementsKeys | React.ComponentType<any> ? As : never>,
			Util.Assign<InnerProps, Props> & {
				as?: As,
				css?: {
					[K in keyof C]: K extends keyof CSS ? CSS[K] : never
				}
			}
		>
	): React.ReactElement | null

	className: string
	selector: string

	[$$StyledComponentType]: Type
	[$$StyledComponentProps]: Props
}

/** Returns a new CSS Component. */
export interface CssComponent<
	Type = 'span',
	Props = {},
	CSS = {}
> {
	(
		props?:
			& {
				css?: CSS
			}
			& {
				[name in number | string]: any
			}
	): string & {
		className: string
		selector: string
		props: {}
	}

	className: string
	selector: string

	[$$StyledComponentType]: Type
	[$$StyledComponentProps]: Props
}

/** Unique symbol used to reference the type of a Styled Component. */
export declare const $$StyledComponentType: unique symbol

/** Unique symbol used to reference the type of a Styled Component. */
export type $$StyledComponentType = typeof $$StyledComponentType

/** Unique symbol used to reference the props of a Styled Component. */
export declare const $$StyledComponentProps: unique symbol

/** Unique symbol used to reference the props of a Styled Component. */
export type $$StyledComponentProps = typeof $$StyledComponentProps

/** Returns a narrowed JSX element from the given tag name. */
type IntrinsicElement<TagName> = TagName extends IntrinsicElementsKeys ? TagName : never

/** Returns a ForwardRef component. */
type ForwardRefExoticComponent<Type, Props> = React.ForwardRefExoticComponent<
	Util.Assign<
		Type extends React.ElementType
			? React.ComponentPropsWithRef<Type>
		: never,
		Props & { as?: Type }
	>
>

/** Returns the first Styled Component type from the given array of compositions. */
export type StyledComponentType<T extends any[]> = (
	T[0] extends never
		? 'span'
	: T[0] extends string
		? T[0]
	: T[0] extends (props: any) => any
		? T[0]
	: T[0] extends { [$$StyledComponentType]: unknown }
		? T[0][$$StyledComponentType]
	: T extends [lead: any, ...tail: infer V]
		? StyledComponentType<V>
	: never
)

/** Returns the cumulative variants from the given array of compositions. */
export type StyledComponentProps<T extends any[]> = (
	& (
		$$StyledComponentProps extends keyof T[0]
			? T[0][$$StyledComponentProps]
		: T[0] extends { variants: { [name: string]: unknown } }
			? {
				[K in keyof T[0]['variants']]?: Util.Widen<keyof T[0]['variants'][K]>
			}
		: {}
	)
	& (
		T extends [lead: any, ...tail: infer V]
			? StyledComponentProps<V>
		: {}
	)
)
