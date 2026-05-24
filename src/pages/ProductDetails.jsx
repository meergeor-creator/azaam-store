import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductBySlug } from '../data/productCatalog'
import { useFavorites } from '../hooks/useFavorites'

const LOCAL_ORDERS_KEY = 'azzamStoreLocalOrders'

const getStoredOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY)) || []
  } catch {
    return []
  }
}

const createOrderNumber = (orderIndex) => `AZ-2025-${String(orderIndex + 1).padStart(4, '0')}`

export default function ProductDetails() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [selectedOptionId, setSelectedOptionId] = useState(() => product?.options?.[0]?.supplierProductId || '')
  const [fieldValues, setFieldValues] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})
  const [showSummary, setShowSummary] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  useEffect(() => {
    setSelectedOptionId(product?.options?.[0]?.supplierProductId || '')
    setFieldValues({})
    setFieldErrors({})
    setShowSummary(false)
    setConfirmedOrder(null)
  }, [product, slug])

  if (!product) {
    return (
      <section className="product-details-page" dir="rtl">
        <div className="details-panel details-empty">
          <h1>المنتج غير متوفر</h1>
          <p>قد يكون المنتج غير متاح من المورد أو تم إخفاؤه من الإدارة.</p>
          <Link className="details-back-link" to="/">العودة للمتجر</Link>
        </div>
      </section>
    )
  }

  const cardAccent = product.accent || '#60be7d'
  const visualStyle = {
    '--product-accent': cardAccent,
    background: product.gradient || `linear-gradient(135deg, ${cardAccent} 0%, rgba(8,12,22,0.92) 72%)`,
  }

  if (product.image) {
    visualStyle.backgroundImage = `linear-gradient(135deg, rgba(8,12,22,0.12), rgba(8,12,22,0.78)), url(${product.image})`
    visualStyle.backgroundSize = 'cover'
    visualStyle.backgroundPosition = 'center'
  }

  const selectedOption = product.options.find((option) => option.supplierProductId === selectedOptionId) || product.options[0]
  const finalPrice = selectedOption?.priceLabel || product.priceLabel
  const selectedPackageLabel = selectedOption?.label || 'المنتج الأساسي'
  const favorite = isFavorite(product.id)

  const handleFieldChange = (fieldName, value) => {
    setFieldValues((current) => ({ ...current, [fieldName]: value }))
    setFieldErrors((current) => ({ ...current, [fieldName]: '' }))
    setShowSummary(false)
    setConfirmedOrder(null)
  }

  const handleContinue = () => {
    const nextErrors = product.requiredFields.reduce((errors, field) => {
      if (field.required && !String(fieldValues[field.name] || '').trim()) {
        return { ...errors, [field.name]: 'هذا الحقل مطلوب' }
      }

      return errors
    }, {})

    setFieldErrors(nextErrors)
    setConfirmedOrder(null)
    setShowSummary(Object.keys(nextErrors).length === 0)
  }

  const handleConfirmOrder = () => {
    const storedOrders = getStoredOrders()
    const order = {
      orderNumber: createOrderNumber(storedOrders.length),
      productName: product.displayName,
      productSlug: product.slug,
      packageLabel: selectedPackageLabel,
      price: finalPrice,
      status: 'بانتظار الدفع',
      fieldValues,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([...storedOrders, order]))
    setConfirmedOrder(order)
    setShowSummary(false)
  }

  return (
    <section className="product-details-page" dir="rtl">
      <Link className="details-back-link" to="/">العودة للمتجر</Link>

      <article className="details-panel">
        <div className="details-visual" style={visualStyle}>
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>

        <div className="details-content">
          <div className="details-heading">
            <div>
              <p className="details-category">{product.category} / {product.subCategory}</p>
              <h1>{product.displayName}</h1>
              <p>{product.subtitle}</p>
            </div>

            <div className="details-price-box">
              <span>{product.priceLabel}</span>
              <small>{product.available ? 'متوفر' : 'غير متوفر'}</small>
            </div>
          </div>

          {product.description && <p className="details-description">{product.description}</p>}

          {product.options.length > 0 && (
            <div className="details-block">
              <h2>الباقات</h2>
              <div className="option-grid">
                {product.options.map((option) => (
                  <button
                    key={option.supplierProductId}
                    type="button"
                    className={`option-card${selectedOptionId === option.supplierProductId ? ' selected' : ''}`}
                    onClick={() => {
                      setSelectedOptionId(option.supplierProductId)
                      setShowSummary(false)
                      setConfirmedOrder(null)
                    }}
                  >
                    <span>{option.label}</span>
                    <small>{option.priceLabel}</small>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.requiredFields.length > 0 && (
            <div className="details-block">
              <h2>بيانات اللاعب</h2>
              <div className="details-fields">
                {product.requiredFields.map((field) => (
                  <label key={field.name} className="details-field">
                    <span>{field.label}</span>
                    <input
                      name={field.name}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={fieldValues[field.name] || ''}
                      onChange={(event) => handleFieldChange(field.name, event.target.value)}
                      aria-invalid={fieldErrors[field.name] ? 'true' : undefined}
                    />
                    {fieldErrors[field.name] && <small>{fieldErrors[field.name]}</small>}
                  </label>
                ))}
              </div>
            </div>
          )}

          <button type="button" className="details-cta" onClick={handleContinue}>
            متابعة الطلب
          </button>

          <button
            type="button"
            className={`details-favorite-btn${favorite ? ' active' : ''}`}
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={favorite}
          >
            {favorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          </button>
        </div>
      </article>

      {showSummary && (
        <aside className="order-summary-panel" aria-live="polite">
          <div className="summary-heading">
            <div>
              <p className="details-category">مراجعة الطلب</p>
              <h2>ملخص الطلب</h2>
            </div>
            <strong>{finalPrice}</strong>
          </div>

          <dl className="summary-list">
            <div>
              <dt>المنتج</dt>
              <dd>{product.displayName}</dd>
            </div>
            <div>
              <dt>الباقة</dt>
              <dd>{selectedPackageLabel}</dd>
            </div>
            <div>
              <dt>السعر</dt>
              <dd>{finalPrice}</dd>
            </div>
            {product.requiredFields.map((field) => (
              <div key={field.name}>
                <dt>{field.label}</dt>
                <dd>{fieldValues[field.name]}</dd>
              </div>
            ))}
          </dl>

          <p className="summary-warning">تأكد من صحة البيانات قبل تأكيد الطلب</p>

          <div className="summary-actions">
            <button type="button" className="summary-secondary" onClick={() => setShowSummary(false)}>
              تعديل البيانات
            </button>
            <button type="button" className="summary-primary" onClick={handleConfirmOrder}>
              تأكيد الطلب
            </button>
          </div>
        </aside>
      )}

      {confirmedOrder && (
        <aside className="order-confirmation-panel" aria-live="polite">
          <div className="confirmation-mark" aria-hidden="true">✓</div>
          <div className="summary-heading">
            <div>
              <p className="details-category">تم إنشاء الطلب</p>
              <h2>تم إنشاء الطلب بنجاح، يرجى متابعة الدفع لاحقاً</h2>
            </div>
            <strong>{confirmedOrder.orderNumber}</strong>
          </div>

          <dl className="summary-list">
            <div>
              <dt>رقم الطلب</dt>
              <dd>{confirmedOrder.orderNumber}</dd>
            </div>
            <div>
              <dt>اسم المنتج</dt>
              <dd>{confirmedOrder.productName}</dd>
            </div>
            <div>
              <dt>الباقة</dt>
              <dd>{confirmedOrder.packageLabel}</dd>
            </div>
            <div>
              <dt>السعر</dt>
              <dd>{confirmedOrder.price}</dd>
            </div>
            {product.requiredFields.map((field) => (
              <div key={field.name}>
                <dt>{field.label}</dt>
                <dd>{confirmedOrder.fieldValues[field.name]}</dd>
              </div>
            ))}
            <div>
              <dt>الحالة</dt>
              <dd>{confirmedOrder.status}</dd>
            </div>
          </dl>

          <div className="summary-actions">
            <Link className="summary-secondary summary-link" to="/">
              العودة للمتجر
            </Link>
            <Link className="summary-primary summary-link" to="/orders">
              عرض طلباتي
            </Link>
          </div>
        </aside>
      )}
    </section>
  )
}
