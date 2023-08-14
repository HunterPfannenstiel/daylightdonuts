import { ComponentPropsWithoutRef, ElementType } from "react";

type AsProp<C extends ElementType> = { as?: C };

type OmitProps<C extends ElementType, Props> = keyof (Props & AsProp<C>);

export type PolymorphicComponent<C extends ElementType, Props = {}> = Omit<
  ComponentPropsWithoutRef<C>,
  OmitProps<C, Props>
> &
  AsProp<C> &
  Props;
