"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetSingleProduct } from "@/hooks/products";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  Trash,
  EditIcon,
} from "lucide-react";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);

  const params = useParams();
  const productId = params.id as string;

  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetSingleProduct(productId);
  console.log("data", data);

  if (isLoading) return <p className="font-raleway text-center">loading...</p>;
  if (error)
    return <p className="font-raleway text-center">error {error.message}</p>;
  if (!data)
    return <p className="font-raleway text-center">no product found</p>;

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === data.images.length - 1 ? 0 : prev + 1,
    );
  };
  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? data.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className="font-raleway mx-5 md:mx-12">
      <div className="gap-6 pt-6 pb-6 md:flex md:gap-12 md:pt-16 md:pb-10">
        <div className="flex w-full flex-col items-center md:w-1/2">
          <div className="relative h-[150px] w-[150px] md:h-[350px] md:w-[350px]">
            <Image
              src={data.images[selectedImage]}
              alt={data.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <div className="mt-4 flex items-center">
            <button
              onClick={prevImage}
              className="mr-2 rounded-full px-3 py-2 text-lg md:mr-5"
            >
              <ArrowLeftCircleIcon className="size-4 md:size-7" />
            </button>
            <div className="flex flex-wrap justify-center gap-4">
              {data.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-12 w-14 cursor-pointer rounded border md:h-24 md:w-28 md:rounded-2xl ${
                    idx === selectedImage ? "border-black" : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    fill
                    className="rounded-md object-contain px-1 py-1 md:px-2 md:py-2"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={nextImage}
              className=";x-3 ml-2 rounded-full py-2 text-lg md:ml-5"
            >
              <ArrowRightCircleIcon className="size-4 md:size-7" />
            </button>
          </div>
        </div>
        <div className="mt-10 w-full md:mt-5 md:w-1/2">
          <h5 className="mb-1 text-lg font-bold tracking-widest capitalize md:mb-3 md:text-3xl">
            {data.name}
          </h5>
          <span className="bg-primary rounded-sm px-2 py-1 text-[10px] md:text-xs">
            {data.category}
          </span>

          <h5 className="mt-3 text-xs tracking-wider md:mt-6 md:w-3/4 md:text-sm">
            {data.description}
          </h5>

          <h5 className="font- mt-2 text-sm font-semibold tracking-wider md:mt-4 md:text-xl">
            Ksh {Number(data.price).toLocaleString()}
          </h5>

          <p className="mt-0.5 text-[6px] font-semibold tracking-wider text-blue-500 md:text-xs">
            price is exclusive of vat
          </p>
          <div className="mt-5 flex justify-start gap-4">
            <span className="bg-primary hover:bg-accent flex gap-1 rounded-full px-4 py-2 hover:cursor-pointer hover:text-black">
              <Trash className="size-4 text-red-600 md:size-4" />
              <p className="text-[10px] md:text-xs">delete</p>
            </span>
            <Link href={`/manage-product/${data.id}`}>
              <span className="bg-primary hover:bg-accent flex gap-1 rounded-full px-4 py-2 hover:cursor-pointer hover:text-black">
                <EditIcon className="size-4 text-green-600 hover:cursor-pointer md:size-4" />
                <p className="text-[10px] md:text-xs">edit</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
