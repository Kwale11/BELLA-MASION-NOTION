import {
    useState,
    type MouseEvent,
} from "react";

import type {
    ProductDetailImage,
    ProductZoomState,
} from "../types/productDetail";

import "./css/ProductGallery.css";

interface ProductGalleryProps {
    images: ProductDetailImage[];
    onZoomChange: (zoom: ProductZoomState) => void;
}

interface LensPosition {
    x: number;
    y: number;
}

const initialLensPosition: LensPosition = {
    x: 50,
    y: 50,
};

function clamp(value: number): number {
    return Math.min(100, Math.max(0, value));
}

export default function ProductGallery({
                                           images,
                                           onZoomChange,
                                       }: ProductGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] =
        useState(0);

    const [isHovering, setIsHovering] =
        useState(false);

    const [lensPosition, setLensPosition] =
        useState<LensPosition>(initialLensPosition);

    const selectedImage = images[selectedImageIndex];

    const handleMouseMove = (
        event: MouseEvent<HTMLDivElement>,
    ) => {
        const imageArea =
            event.currentTarget.getBoundingClientRect();

        const positionX = clamp(
            ((event.clientX - imageArea.left) /
                imageArea.width) *
            100,
        );

        const positionY = clamp(
            ((event.clientY - imageArea.top) /
                imageArea.height) *
            100,
        );

        setLensPosition({
            x: positionX,
            y: positionY,
        });

        setIsHovering(true);

        onZoomChange({
            isActive: true,
            imageUrl: selectedImage.imageUrl,
            positionX,
            positionY,
        });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);

        onZoomChange({
            isActive: false,
            imageUrl: selectedImage.imageUrl,
            positionX: 50,
            positionY: 50,
        });
    };

    const selectImage = (imageIndex: number) => {
        setSelectedImageIndex(imageIndex);
        setIsHovering(false);

        onZoomChange({
            isActive: false,
            imageUrl: images[imageIndex].imageUrl,
            positionX: 50,
            positionY: 50,
        });
    };

    return (
        <div className="product-gallery">
            <div
                className="product-gallery__main"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.imageAlt}
                    width={1200}
                    height={1200}
                    fetchPriority="high"
                />

                <div
                    className={`product-gallery__lens ${
                        isHovering
                            ? "product-gallery__lens--visible"
                            : ""
                    }`}
                    style={{
                        left: `${lensPosition.x}%`,
                        top: `${lensPosition.y}%`,
                    }}
                    aria-hidden="true"
                />
            </div>

            <div
                className="product-gallery__thumbnails"
                aria-label="제품 이미지 선택"
            >
                {images.map((image, imageIndex) => {
                    const isSelected =
                        selectedImageIndex === imageIndex;

                    return (
                        <button
                            key={image.id}
                            type="button"
                            className={`product-gallery__thumbnail ${
                                isSelected
                                    ? "product-gallery__thumbnail--selected"
                                    : ""
                            }`}
                            aria-label={`${imageIndex + 1}번째 제품 이미지 보기`}
                            aria-pressed={isSelected}
                            onClick={() => {
                                selectImage(imageIndex);
                            }}
                        >
                            <img
                                src={image.imageUrl}
                                alt=""
                                width={160}
                                height={160}
                                loading="lazy"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}