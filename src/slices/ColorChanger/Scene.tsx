import { Keyboard } from "@/components/Keyboard"
import { Stage, useTexture } from "@react-three/drei"
import { KEYCAP_TEXTURES } from "."
import * as THREE from "three"
import { useMemo, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

type SceneProps = {
	selectedTextureId: string
	onAnimationComplete: () => void

}
gsap.registerPlugin(useGSAP)

export function Scene({ onAnimationComplete, selectedTextureId }: SceneProps) {
	const keyboardRefs = useRef<THREE.Group>(null)

	const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId)
	useGSAP(() => {
		if (!keyboardRefs.current || selectedTextureId === currentTextureId) return
		const mm = gsap.matchMedia()
		mm.add("(prefers-reduced-motion: no-preference)", () => {
			const keyboard = keyboardRefs.current
			if (!keyboard) return

			const t1 = gsap.timeline({
				onComplete: () => onAnimationComplete()
			})

			t1.to(keyboard.position, {
				y: .3, duration: .4, ease: "power2.out", onComplete: () => {
					setCurrentTextureId(selectedTextureId)
				}
			})
			t1.to(keyboard.position, { y: 0, duration: .6, ease: "elastic.out(1, 0.4)" })
		})

		mm.add("(prefers-reduce-motion: reduce)", () => {
			setCurrentTextureId(selectedTextureId)
			onAnimationComplete()
		})
	}, [selectedTextureId, currentTextureId])

	const texturePaths = KEYCAP_TEXTURES.map(t => t.path)
	const textures = useTexture(texturePaths)
	const materials = useMemo(() => {
		const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {}
		KEYCAP_TEXTURES.forEach((textureConfig, index) => {
			const texture = Array.isArray(textures) ? textures[index] : textures

			if (texture) {
				texture.flipY = false
				texture.colorSpace = THREE.SRGBColorSpace
				materialMap[textureConfig.id] = new THREE.MeshStandardMaterial({
					map: texture,
					roughness: .7
				})
			}
		})
		return materialMap
	}, [textures])


	const currentKnobColor = KEYCAP_TEXTURES.find(t => t.id === selectedTextureId)?.knobColor

	return (
		<Stage environment={"city"} intensity={.0002} shadows="contact">
			<group ref={keyboardRefs}>
				<Keyboard keycapMaterial={materials[currentTextureId]} knobColor={currentKnobColor} />
			</group>
		</Stage>
	)
}