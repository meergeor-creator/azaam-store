import React from 'react'

export default function AnnouncementBoard() {
  return (
    <section className="announcement-board" aria-label="عروض اليوم">
      <div className="announcement-content">
        <div className="announcement-copy">عروض اليوم</div>

        <div className="announcement-badges">
          <span>شحن سريع</span>
          <span aria-hidden="true">|</span>
          <span>دعم مباشر</span>
          <span aria-hidden="true">|</span>
          <span>أسعار مميزة</span>
        </div>

        <div className="announcement-actions">
          <a className="announcement-cta" href="#special-offers">تصفح العروض</a>
        </div>
      </div>
    </section>
  )
}
