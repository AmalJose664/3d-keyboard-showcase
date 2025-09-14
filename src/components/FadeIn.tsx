"use client"
import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { ReactNode, useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type FadeInProps = {
	children: ReactNode
	vars?: gsap.TweenVars
	start?: string
	className?: string
	targetChildren?: boolean
}
const FadeIn = ({ children, className, start = "top 50%", targetChildren = false, vars = {} }: FadeInProps) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const target = targetChildren ? containerRef.current?.children : containerRef.current

		if (!target) return

		const mm = gsap.matchMedia()

		mm.add("(prefers-reduced-motion: no-preference)", () => {

			gsap.to(target, {
				duration: .8, opacity: 1, ease: "power3.inOut", y: 0,
				stagger: .2, ...vars,
				scrollTrigger: {
					trigger: containerRef.current,
					start
				}
			})
			gsap.set(target, { opacity: 0, y: 60, })
		})

	}, [])

	return (
		<div ref={containerRef} className={clsx(className)}>{children}</div>
	)
}
export default FadeIn