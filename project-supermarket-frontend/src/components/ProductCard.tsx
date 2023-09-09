/**
 * 
 */

import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Product } from '../contexts/Types';
import CardModal from './CardModal';

const { Meta } = Card;

export default function ProductCard(props: { product: Product }) {

    const fallbackImage = "https://media.istockphoto.com/id/1271880340/vector/lost-items-line-vector-icon-unidentified-items-outline-isolated-icon.jpg?s=612x612&w=0&k=20&c=d2kHGEmowThp_UrqIPfhxibstH6Sq5yDZJ41NetzVaA=";

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);


    return (
        <div className="productCard">
            <Card
                onClick={() => setModalOpen((prev) => !prev)}
                style={{
                    boxShadow: "0 0 3px 3px #8eb1b0",
                    width: "150px",
                }}
                hoverable
                // className="productCard"
                cover={
                    <img
                        alt={props.product.name}
                        onError={() => setImageError(true)}
                        style={{
                            height: "130px",
                            width: "auto",
                            aspectRatio: "1/1"
                        }}
                        src={props.product.images[0] ?
                            props.product.images[0] : fallbackImage}
                    />
                }
            >
                <Meta
                    style={{
                        whiteSpace: "normal"
                    }}
                    title={props.product.name}
                    description={props.product.brand}
                />
            </Card>
            <CardModal product={props.product}
                modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div >
    )
}
