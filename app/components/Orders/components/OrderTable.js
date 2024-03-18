'use client'

import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import formatDate from "@/app/utils/formatDate";
import styles from '../styles.module.scss'

export default function OrderTable({orders}) {
  const router = useRouter();
  const [selected, setSelected] = useState();
  const paymentColor = {
    pending: 'warning',
    paid: 'success',
  };
  const fulfillmentColor = {
    unfulfilled: 'warning',
    fulfilled: 'success',
  };

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <Table 
        isHeaderSticky
        removeWrapper 
        color={'default'}
        selectionMode="single" 
        aria-label="Example static collection table"
        onRowAction={(i)=>{router.push(`order?id=${orders[i].id}`)}}
        classNames={{
          base: "max-h-full overflow-auto",
          table: "min-h-full",
          thead: "[&>tr]:first:rounded-none [&>tr]:first:shadow-[0 0px 0px 0 rgb(0 0 0 / 0.05)]",
          th: "bg-[#EBEBEB] text-zink-300",
          tr: "border-b-1 border-solid border-zinc-300 rounded-none"
        }}
        className={styles["order-table"]}
      >
        <TableHeader>
          <TableColumn className='h-32'>DATE</TableColumn>
          <TableColumn className='h-32'>TIME</TableColumn>
          <TableColumn className='h-32'>PAYMENT</TableColumn>
          <TableColumn className='h-32'>FULFILLMENT</TableColumn>
          <TableColumn className='h-32'></TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {orders.map((order, i) => (
            <TableRow className='cursor-pointer h-14' key={i} onClick={()=>setSelected(i)}>
              <TableCell>{formatDate(order.dates.createdAt).date}</TableCell>
              <TableCell>{formatDate(order.dates.createdAt).time}</TableCell>
              <TableCell>
                <Chip color={paymentColor[order.status.ecartapi]} variant="flat" className="capitalize">
                  {order.status.ecartapi}
                </Chip>
              </TableCell>
              <TableCell className="w-40">
                <Chip color={fulfillmentColor[order.fulfillmentStatus.ecartapi]} variant="flat" className="capitalize">
                  {order.fulfillmentStatus.ecartapi}
                </Chip>
              </TableCell>
              <TableCell className="w-20">
                {selected === i ?<Spinner /> :null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
