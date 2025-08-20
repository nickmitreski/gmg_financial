"use client";

import {useRef} from "react";
import React from "react";

import {motion, useScroll, useTransform, MotionValue} from "framer-motion";

// Types
interface iIPicture {
	src: string;
	scale: MotionValue<number>;
}

interface iImmersiveScrollGalleryProps {
	images?: iIPicture[]; // Optional custom images array
	className?: string; // Optional className for container customization
}

// Constants - Updated with user's uploaded financial/business images
const DEFAULT_IMAGES = [
	{
		src: "/images/111.png",
		scale: null,
	},
	{
		src: "/images/222.png",
		scale: null,
	},
	{
		src: "/images/333.png",
		scale: null,
	},
	{
		src: "/images/444.png",
		scale: null,
	},
	{
		src: "/images/555.png",
		scale: null,
	},
	{
		src: "/images/666.png",
		scale: null,
	},
	{
		src: "/images/111.png", // Reusing first image for the 7th slot
		scale: null,
	},
];

const IMAGE_STYLES = [
	"w-[25vw] h-[25vh]",
	"w-[35vw] h-[30vh] -top-[30vh] left-[5vw]",
	"w-[20vw] h-[55vh] -top-[15vh] -left-[25vw]",
	"w-[25vw] h-[25vh] left-[27.5vw]",
	"w-[20vw] h-[30vh] top-[30vh] left-[5vw]",
	"w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]",
	"w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]",
];

/**
 * ImmersiveScrollGallery Component
 *
 * A scroll-based image zoom effect component that creates a parallax-like experience.
 * Images scale up as the user scrolls, creating an immersive visual effect.
 *
 * @param {ImmersiveScrollGalleryProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ImmersiveScrollGallery: React.FC<iImmersiveScrollGalleryProps> = ({
	images = DEFAULT_IMAGES,
	className = "",
}) => {
	// Refs
	const container = useRef<HTMLDivElement | null>(null);

	// Scroll and transform hooks
	const {scrollYProgress} = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	// Transform values
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
	const opacityImage = useTransform(scrollYProgress, [0, 1], [1, 0]);
	const opacitySection2 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

	// Assign scales to images
	const pictures = images.map((img, index) => {
		return {
			...img,
			scale: [scale4, scale5, scale6, scale5, scale6, scale8, scale9][
				index % 7
			],
		};
	});

	return (
		<div ref={container} className={`relative h-[300vh] ${className}`}>
			<div className="sticky top-0 h-screen overflow-hidden">
				{/* Zooming Images */}
				{pictures.map(({src, scale}, index) => {
					return (
						<motion.div
							key={index}
							style={{scale, opacity: opacityImage}}
							className="absolute flex items-center justify-center w-full h-full top-0"
						>
							<div className={`relative ${IMAGE_STYLES[index]}`}>
								<img
									src={src}
									alt={`Zoom image ${index + 1}`}
									className="object-cover w-full h-full"
								/>
							</div>
						</motion.div>
					);
				})}

				{/* Content Section */}
				<motion.div
					style={{
						opacity: opacitySection2,
						scale: useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1]),
					}}
					className="w-full h-full flex items-center justify-center max-w-6xl mx-auto p-8 relative"
				>
					<div className="text-center">
						<h2 className="text-lg font-semibold text-[#1f2937] tracking-tight mb-6">
							Client Testimonials
						</h2>
						<p className="text-base font-light text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
							This section will showcase real client testimonials with video testimonials and success stories. 
							Below are dummy testimonial cards to demonstrate the layout and design.
						</p>
						
						{/* Dummy Testimonial Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
							{/* Card 1 */}
							<div className="bg-white rounded-lg shadow-card p-6 border border-gray-100">
								<div className="flex items-center mb-4">
									<img 
										src="https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
										alt="Client" 
										className="w-12 h-12 rounded-full object-cover mr-4"
									/>
									<div>
										<h4 className="text-sm font-semibold text-[#1f2937]">Sarah Mitchell</h4>
										<p className="text-xs text-gray-500">Melbourne Business Owner</p>
									</div>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
								</p>
							</div>

							{/* Card 2 */}
							<div className="bg-white rounded-lg shadow-card p-6 border border-gray-100">
								<div className="flex items-center mb-4">
									<img 
										src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
										alt="Client" 
										className="w-12 h-12 rounded-full object-cover mr-4"
									/>
									<div>
										<h4 className="text-sm font-semibold text-[#1f2937]">Michael Chen</h4>
										<p className="text-xs text-gray-500">Melbourne Family</p>
									</div>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
								</p>
							</div>

							{/* Card 3 */}
							<div className="bg-white rounded-lg shadow-card p-6 border border-gray-100">
								<div className="flex items-center mb-4">
									<img 
										src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
										alt="Client" 
										className="w-12 h-12 rounded-full object-cover mr-4"
									/>
									<div>
										<h4 className="text-sm font-semibold text-[#1f2937]">Emma Thompson</h4>
										<p className="text-xs text-gray-500">Melbourne Professional</p>
									</div>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
								</p>
							</div>
						</div>

						<div className="mt-8">
							<button className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium uppercase tracking-wider transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-offset-2">
								Watch Video Testimonials
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ImmersiveScrollGallery; 