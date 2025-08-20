"use client"

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/Button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  image: string
}

interface LatestNewsSectionProps {
  heading?: string
  demoUrl?: string
  items?: NewsItem[]
}

const LatestNewsSection = ({
  heading = "Latest News",
  demoUrl = "#",
  items = [
    {
      id: "item-1",
      title: "Big 4 Banks Slash Rates Ahead of RBA Decision",
      summary:
        "Major Australian banks have announced significant rate cuts in anticipation of the Reserve Bank's upcoming decision, creating new opportunities for borrowers.",
      url: "#",
      image: "/images/111.png",
    },
    {
      id: "item-2",
      title: "Nine Mortgage Traps That Could Derail Your Property Investment Strategy",
      summary:
        "Discover the common pitfalls that property investors face and learn how to navigate the complex mortgage landscape to protect your investment portfolio.",
      url: "#",
      image: "/images/222.png",
    },
    {
      id: "item-3",
      title: "Melbourne's Property Market Revives",
      summary:
        "The Melbourne property market shows signs of recovery with increased buyer activity and improved market conditions across key suburbs.",
      url: "#",
      image: "/images/333.png",
    },
    {
      id: "item-4",
      title: "Is Now the Right Time to Refinance?",
      summary:
        "With changing market conditions and new loan products available, we analyze whether refinancing could benefit your current financial situation.",
      url: "#",
      image: "/images/444.png",
    },
    {
      id: "item-5",
      title: "5 Key Financial Planning Tips Every First Home Buyer",
      summary:
        "Essential advice for first-time homebuyers to navigate the complex process of purchasing their first property with confidence and financial security.",
      url: "#",
      image: "/images/555.png",
    },
  ],
}: LatestNewsSectionProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }
    updateSelection()
    carouselApi.on("select", updateSelection)
    return () => {
      carouselApi.off("select", updateSelection)
    }
  }, [carouselApi])

  return (
    <section id="latest-news" className="section-padding bg-gray-200">
      <div className="container-custom">
        <motion.div
          className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="section-heading leading-snug mb-6 text-teal-500">
              {heading}
            </h2>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev()
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto border-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext()
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto border-gray-300 hover:bg-gray-100"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <motion.a
                  href={item.id === "item-1" ? "/news/big-4-banks-slash-rates" : item.id === "item-2" ? "/news/nine-mortgage-traps" : item.id === "item-3" ? "/news/melbourne-property-market-revives" : item.id === "item-4" ? "/news/is-now-the-right-time-to-refinance" : item.id === "item-5" ? "/news/5-key-financial-planning-tips-first-home-buyers" : item.url}
                  className="group flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8 line-clamp-2 text-base text-gray-600 md:mb-12 md:text-lg lg:mb-9">
                    {item.title}
                  </div>
                  <div className="flex items-center text-sm text-teal-600 group-hover:text-teal-700 transition-colors">
                    Read more{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export { LatestNewsSection } 