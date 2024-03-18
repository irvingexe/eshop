import { Button } from '@nextui-org/react'
import { Modal } from '@nextui-org/react'
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react'

export default function NewItem({onNewItem}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const emptyItem = {sku:'', name:'', quantity:'', price:''};
  const [item,  setItem] = useState(emptyItem);
  const [isErrorVisible, setErrorVisible] =  useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    onNewItem(item);
    setItem(emptyItem);
  }

  return (
    <>
      <Button color='primary' variant='faded' onPress={onOpen}>Add Item</Button>
      <Modal isOpen={isOpen} onOpenChange={() => {setItem(emptyItem); setErrorVisible(false); onOpenChange()}}>
        <ModalContent>
          {(onClose) => (
              <form onSubmit={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">New Item</ModalHeader>
                <ModalBody>
                    <Input 
                      type="text" 
                      variant={'faded'} 
                      label="SKU" 
                      value={item.sku}
                      onValueChange= {e=>setItem({...item, sku: e})}
                      isRequired 
                      isInvalid={isErrorVisible && !item.sku}
                      errorMessage={isErrorVisible && !item.sku && "This field is required"}
                    />
                    <Input 
                      type="text" 
                      variant={'faded'} 
                      label="Name" 
                      value={item.name}
                      onValueChange= {e=>setItem({...item, name: e})}
                      isRequired
                      isInvalid={isErrorVisible && !item.name}
                      errorMessage={isErrorVisible && !item.name && "This field is required"}
                    />
                    <Input 
                      type="number" 
                      variant={'faded'} 
                      label="Quantity" 
                      value={item.quantity}
                      onValueChange= {e=>setItem({...item, quantity: Number(e)})}
                      isRequired
                      isInvalid={isErrorVisible && !item.quantity}
                      errorMessage={isErrorVisible && !item.quantity && "This field is required"}
                    />
                    <Input 
                      type="number" 
                      variant={'faded'} 
                      label="Price" 
                      value={item.price}
                      onValueChange= {e=>setItem({...item, price: Number(e)})}
                      isRequired
                      isInvalid={isErrorVisible && !item.price}
                      errorMessage={isErrorVisible && !item.price && "This field is required"}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                    />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button 
                    type='submit'
                    color="primary" 
                    onPress={() => {if (!Object.values(item).some(e => !e)) {onClose()} else {setErrorVisible(true)}}} 
                  >
                    Add Item
                  </Button>
                </ModalFooter>
              </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
