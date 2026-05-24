import { localProductOverrides } from './localProductOverrides'
import { mockSupplierProducts } from './mockSupplierProducts'
import { groupProductsByCategory, mergeProducts } from '../utils/mergeProducts'

export const mergedProducts = mergeProducts(mockSupplierProducts, localProductOverrides)
export const productsByCategory = groupProductsByCategory(mergedProducts)

export function getProductBySlug(slug) {
  return mergedProducts.find((product) => product.slug === slug)
}
