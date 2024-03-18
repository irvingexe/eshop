import React from 'react'
import Items from './components/Items'
import { getOrder } from '../services/orders';
import formatDate from '../utils/formatDate';
import styles  from './styles.module.scss';
import { Chip } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Back from './components/Back';

export default async function Order({searchParams}) {
  let order = await getOrder(searchParams.id);
  const fulfillmentColor = {
    unfulfilled: 'warning',
    fulfilled: 'success',
  };

  return (
    <div className={`relative flex w-full justify-between mt-28 gap-20 ${styles.order}`}>
      <Back/>
      <div className={styles.detail}>
        <div className='flex justify-between w-full mb-10'>
          <h1 className='text-5xl font-medium'>Order {order.number}</h1>
          <Chip color={fulfillmentColor[order.fulfillmentStatus.ecartapi]} variant="flat" className="capitalize">
            {order.fulfillmentStatus.ecartapi}
          </Chip>
        </div>
        <div className={`grid gap-4 ${styles.delivery}`}>
          {order.dates.createdAt
            ? <div>
                <div className='mb-2 text-sm text-zinc-500 font-medium'>Delivered at</div>
                <div>{`${formatDate(order.dates.createdAt).date} ${formatDate(order.dates.createdAt).time}`}</div>
              </div>
            : <div>
                <div className='mb-2 text-sm text-zinc-500 font-medium'>Arriving at</div>
                <div>{`${formatDate(order.dates.estimatedDeliveryIn).date}`}</div>
          </div>}
          <div>
            <div className='mb-2 text-sm text-zinc-500 font-medium'>Shipping Address</div>
              <div>
                {`${order.shippingAddress.address1}, 
                  ${order.shippingAddress.city}, 
                  ${order.shippingAddress.state?.name}.`}
              </div>
              <div>{`${order.shippingAddress.firstName} ${order?.shippingAddress.lastName}`}
            </div>
          </div>
          <div>
            <div className='mb-2 text-sm text-zinc-500 font-medium'>Phone</div>
            <div>{order.shippingAddress.phone}</div>
          </div>
          <div>
            <div className='mb-2 text-sm text-zinc-500 font-medium'>Note</div>
            <div>{order.note}</div>
          </div>
        </div>
      </div>
      <Items order={order}/>
    </div>
  )
}
