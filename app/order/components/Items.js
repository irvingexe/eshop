'use client'

import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, CardBody, Divider, CardFooter} from "@nextui-org/react";
import NewItem from "./NewItem";
import Payment from "./Payment";
import { DeleteIcon } from "@/app/assets/DeleteIcon";
import styles  from "../styles.module.scss"

export default function Items({order}) {
  const [itemsList, setItems] = useState(order.items);
  const [isPaid, setPaid] = useState();

  const removeItem = (i) => {
    setItems(itemsList.filter((_, index) => i !== index));
  }

  return (
    <Card className={`max-w-[min(500px, 100%)] w-[520px] pl-2 pr-2 mb-20 ${styles.items}`}>
      <CardBody>
        <div className='w-full font-semibold mb-6 mt-2 text-xl'>Products</div>
        <div className="flex flex-col gap-3">
          <Table 
            removeWrapper 
            color={'default'}
            selectionMode="single" 
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>SKU</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>QUANTITY</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
              {itemsList.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium break-words break-word">{item.sku}</TableCell>
                  <TableCell className="font-medium break-words break-word">{item.name}</TableCell>
                  <TableCell className="font-medium break-words break-word">{item.quantity}</TableCell>
                  <TableCell className="font-medium break-words break-word">{`$${(Number(item.price) * Number(item.quantity)).toFixed(2)}`}</TableCell>
                  <TableCell>
                    {!isPaid ? <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={()=>removeItem(i)}>
                    <DeleteIcon />
                    </span> : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!isPaid ?<NewItem onNewItem= {(e) => setItems([...itemsList, e])}/> : null}
        </div>
      </CardBody>
      <Divider/>
      <CardFooter className="flex-col flex-start mb-2">
        <Payment 
          totals={order.totals} 
          subtotal={itemsList.reduce((accumulator, currentItem) => accumulator + Number(currentItem.price) * Number(currentItem.quantity), 0)} 
          currency={order.currency} 
          onPaid={()=>setPaid('paid')}
        />
      </CardFooter>
    </Card>
  );
}
