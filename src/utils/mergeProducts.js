const productKey = (product) => `${product.supplierName}:${product.supplierProductId}`

const formatPrice = (price, currency) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: 2,
  }).format(price)

const applyProfitMargin = (price, profitMargin) => {
  const margin = Number(profitMargin) || 0
  return Number((price * (1 + margin)).toFixed(2))
}

const slugify = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const normalizeOptions = (options = [], currency, profitMargin) =>
  options
    .map((option) => {
      const optionPrice = applyProfitMargin(option.price, option.profitMargin ?? profitMargin)

      return {
        ...option,
        price: option.price,
        displayPrice: optionPrice,
        priceLabel: option.priceLabel || formatPrice(optionPrice, option.currency || currency),
        available: option.available !== false,
      }
    })
    .filter((option) => option.available)

export function mergeProducts(supplierProducts, localOverrides = []) {
  const overridesByKey = new Map(localOverrides.map((override) => [productKey(override), override]))

  return supplierProducts
    .map((supplierProduct, supplierIndex) => {
      const override = overridesByKey.get(productKey(supplierProduct)) || {}
      const available = supplierProduct.available !== false
      const visible = override.visible ?? supplierProduct.visible ?? true

      if (!available || visible === false) return null

      const profitMargin = override.profitMargin ?? supplierProduct.profitMargin ?? 0
      const displayPrice = applyProfitMargin(supplierProduct.price, profitMargin)
      const displayName = override.displayName || supplierProduct.displayName || supplierProduct.baseName
      const category = override.category || supplierProduct.category
      const subCategory = override.subCategory || supplierProduct.subCategory
      const sortOrder = override.sortOrder ?? supplierProduct.sortOrder ?? supplierIndex
      const accent = override.accent || override.color || supplierProduct.accent || supplierProduct.color || '#60be7d'
      const slug = override.slug || supplierProduct.slug || slugify(`${supplierProduct.supplierName}-${supplierProduct.supplierProductId}`)
      const options = override.options || supplierProduct.options || []

      return {
        ...supplierProduct,
        ...override,
        id: productKey(supplierProduct),
        slug,
        supplierProductId: supplierProduct.supplierProductId,
        supplierName: supplierProduct.supplierName,
        baseName: supplierProduct.baseName,
        displayName,
        title: displayName,
        subtitle: subCategory || category,
        category,
        subCategory,
        price: supplierProduct.price,
        currency: supplierProduct.currency,
        displayPrice,
        formattedPrice: formatPrice(displayPrice, supplierProduct.currency),
        priceLabel: formatPrice(displayPrice, supplierProduct.currency),
        available,
        visible,
        image: override.image || supplierProduct.image || '',
        description: override.description || supplierProduct.description || '',
        options: normalizeOptions(options, supplierProduct.currency, profitMargin),
        requiredFields: override.requiredFields || supplierProduct.requiredFields || [],
        badge: override.badge || supplierProduct.badge || '',
        sortOrder,
        profitMargin,
        accent,
        metadata: {
          ...(supplierProduct.metadata || {}),
          ...(override.metadata || {}),
        },
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.displayName.localeCompare(b.displayName))
}

export function groupProductsByCategory(products) {
  return products.reduce((groups, product) => {
    if (!groups[product.category]) groups[product.category] = []
    groups[product.category].push(product)
    return groups
  }, {})
}
