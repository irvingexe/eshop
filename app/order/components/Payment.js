'use client'

import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, ModalFooter, Divider} from "@nextui-org/react";
import SuccessIcon from '@/app/assets/SuccessIcon';

export default function Payment({totals, subtotal, currency, onPaid}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [isPaid, setPaid] = useState(false);
  const discount = subtotal + Number(totals.tax) ?Number(totals.discount).toFixed(2) :(0).toFixed(2);

  const handlePay = () => {
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setPaid(true);
      onOpen();
      onPaid();
    }, 1000);
  }

  return (
    <>
      <div className='w-full font-medium mb-4'>Order summary</div>
      <div className='text-sm flex justify-between flex-col w-full text-zinc-500 font-medium'>
        <div className='flex w-full justify-between'>
          <div>Subtotal</div>
          <div>{`$${subtotal.toFixed(2)} ${currency}`}</div>
        </div>
        <div className='flex w-full justify-between'>
          <div>Tax</div>
          <div>{`$${Number(totals.tax).toFixed(2)} ${currency}`}</div>
        </div>
        <div className='flex w-full justify-between'>
          <div>Discount</div>
          <div>{`$${discount} ${currency}`}</div>
        </div>
      </div>
      <Divider className=' mt-4 mb-4'/>
      <div className='flex w-full justify-between font-medium'>
        <div>Total</div>
        <div>{`$${(subtotal + Number(totals.tax) - discount).toFixed(2)} ${currency}`}</div>
      </div>
      {!isPaid 
        ?<Button color='primary' isDisabled={isPaid} onPress={handlePay} isLoading={isPaymentLoading} className='w-full mt-4'>
          Pay
        </Button> 
        :null}
        
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        backdrop='transparent' 
        placement='bottom'
        classNames={{base: "bg-[#C1E4D0]",}}
      >
          <ModalContent className='flex flex-row items-center'>
            {(onClose) => {
              if (isOpen) setTimeout(() => {onClose()}, 3000); 
              return (<>
                <div className='h-20 w-20 ml-3'>
                  <SuccessIcon/>
                </div>
                <div>
                  <ModalHeader className="flex flex-col gap-1 pb-2">Payment Complete!</ModalHeader>
                  <ModalBody className='mb-2 text-[#385f49] w-max font-medium'>
                    Your order is being prepared.
                  </ModalBody>
                </div>
              </>)}}
          </ModalContent>
      </Modal>
    </>
  );
}
