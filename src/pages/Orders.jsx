import React from 'react'

const LOCAL_ORDERS_KEY = 'azzamStoreLocalOrders'

const getStoredOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY)) || []
  } catch {
    return []
  }
}

const formatOrderDate = (value) => {
  if (!value) return ''

  return new Intl.DateTimeFormat('ar', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function Orders() {
  const orders = getStoredOrders()

  return (
    <section className="orders-page" dir="rtl">
      <div className="orders-header">
        <div>
          <p className="details-category">حسابي</p>
          <h1>طلباتي</h1>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>لا توجد طلبات حتى الآن</h2>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.orderNumber}>
              <div className="order-card-header">
                <div>
                  <span>رقم الطلب</span>
                  <strong>{order.orderNumber}</strong>
                </div>
                <mark>{order.status}</mark>
              </div>

              <dl className="order-grid">
                <div>
                  <dt>اسم المنتج</dt>
                  <dd>{order.productName}</dd>
                </div>
                <div>
                  <dt>الباقة</dt>
                  <dd>{order.packageLabel}</dd>
                </div>
                <div>
                  <dt>السعر</dt>
                  <dd>{order.price}</dd>
                </div>
                <div>
                  <dt>الحالة</dt>
                  <dd>{order.status}</dd>
                </div>
                <div>
                  <dt>تاريخ الطلب</dt>
                  <dd>{formatOrderDate(order.createdAt)}</dd>
                </div>
              </dl>

              {order.fieldValues && Object.keys(order.fieldValues).length > 0 && (
                <div className="order-fields">
                  <h2>البيانات المدخلة</h2>
                  <dl>
                    {Object.entries(order.fieldValues).map(([name, value]) => (
                      <div key={name}>
                        <dt>{name}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
