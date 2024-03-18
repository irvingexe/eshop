'use server'

import React from 'react'
import OrderTable from './components/OrderTable'
import { getOrders } from '@/app/services/orders';
import styles from  './styles.module.scss'

export default async function Orders() {

  const orders = await getOrders();

  return (
    <div className={`grid ${styles.orders}`}>
      <h1 className="text-5xl self-end font-medium">Orders</h1>
      <OrderTable orders={orders} />
    </div>
  )
}
