'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
  name: string
  description: string
  priceText: string
  image: string
  paymentLink: string
}

const ProductCard = ({ name, description, priceText, image, paymentLink }: Props) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-dark-800 shadow-sm overflow-hidden flex flex-col"
    >
      <div className="relative w-full aspect-video">
        <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-4 flex flex-col gap-2 grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{name}</h3>
          <span className="text-primary-600 dark:text-primary-400 font-semibold whitespace-nowrap">{priceText}</span>
        </div>
        <p className="text-sm text-dark-700/80 dark:text-white/80 grow">{description}</p>
        <motion.a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 inline-flex items-center justify-center h-10 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium"
        >
          Satın Al
        </motion.a>
      </div>
    </motion.div>
  )
}

export default ProductCard

