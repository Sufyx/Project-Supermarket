/**
 * 
 */


import { useState, useEffect } from 'react';
import { Button, Modal, Image, Divider, Tooltip } from 'antd';
import {
    PlusOutlined, MinusOutlined
} from "@ant-design/icons";
import { Product, ChosenProduct } from '../contexts/Types';
import { useProductContext } from '../contexts/ProductContext';
import { useUserContext } from '../contexts/UserContext';




export default function CardModal(
    props: {
        product: Product,
        modalOpen: boolean,
        setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    }) {
    const fallbackImage = "https://media.istockphoto.com/id/1271880340/vector/lost-items-line-vector-icon-unidentified-items-outline-isolated-icon.jpg?s=612x612&w=0&k=20&c=d2kHGEmowThp_UrqIPfhxibstH6Sq5yDZJ41NetzVaA=";

    const { setAddedProduct } = useProductContext();
    const { loggedUser } = useUserContext();

    // useEffect(() => {
    //     console.log("*** CardModal rendered : ", addedProduct);
    // }, [addedProduct])


    async function addProduct(addOrReduce: number) {
        if (!loggedUser) return; 
        const toAdd = { ...props.product, addOrReduce: addOrReduce };
        setAddedProduct(toAdd);
    }


    return (
        <div>
            <Modal
                className='cardModal'
                centered
                open={props.modalOpen}
                onCancel={() => props.setModalOpen(false)}
                style={{
                    fontFamily: "'Lora', serif",
                    background: "#838db3"
                }}
                footer={[
                    <Button key="back" onClick={() => props.setModalOpen(false)}>
                        Close
                    </Button>
                ]}>
                <p style={{
                    fontSize: 20,
                    fontWeight: '800'
                }}>
                    {props.product.name}
                </p>
                <Divider />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Tooltip title={loggedUser ? "Add" : "Please log-in"}>
                        <Button size="large" type="primary" shape="circle"
                            disabled={!loggedUser}
                            icon={<PlusOutlined />}
                            onClick={() => addProduct(1)}
                        />
                    </Tooltip>
                    <Image.PreviewGroup
                        items={props.product.images[0] ?
                            [...props.product.images] : [fallbackImage]}>
                        <Image
                            width={200}
                            src={props.product.images[0] ?
                                props.product.images[0] : fallbackImage}
                        />
                    </Image.PreviewGroup>
                    <Tooltip title={loggedUser ? "Remove" : "Please log-in"}>
                        <Button size="large" type="primary" shape="circle"
                            disabled={!loggedUser}
                            onClick={() => addProduct(-1)}
                            icon={<MinusOutlined />} />
                    </Tooltip>
                </div>
                <Divider />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <p>By {props.product.brand}</p>
                    <p style={{
                        fontSize: 20,
                        fontWeight: '800'
                    }}>
                        ₪&nbsp;{props.product.price}
                    </p>
                </div>
                <Divider />
                <p style={{
                    fontSize: 15,
                    fontWeight: '600'
                }}>
                    {props.product.description}
                </p>
                <Divider />
            </Modal>
        </div>
    )
}
