import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import FadeIn from "@/components/FadeIn";

/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>;

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<FadeIn>
				<h2 id="features" className="font-bold-slanted mb-8 scroll-pt-8 text-6xl uppercase md:text-8xl">

					<PrismicText field={slice.primary.heading} />
				</h2>
			</FadeIn>
			<FadeIn targetChildren className="grid grid-cols-1 gap-4 md:grid-cols-6">
				{slice.primary.items.map((item, i) => {
					return (
						<BentoBoxItem item={item} key={i} />
					)
				})}
			</FadeIn>
		</Bounded>
	);
};

export default BentoBox;


function BentoBoxItem({ item }: { item: Content.BentoBoxSliceDefaultPrimaryItemsItem }) {
	return (
		<div className={clsx("relative overflow-hidden rounded-3xl",
			item.size === "small" && "md:col-span-2",
			item.size === "medium" && "md:col-span-3",
			item.size === "Large" && "md:col-span-4",
		)}>
			<div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black">

			</div>
			<PrismicNextImage field={item.image} className="h-full w-full object-cover " quality={96} width={700} />
			<div className="absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white">
				<PrismicRichText field={item.text} />
			</div>

		</div>
	)
}