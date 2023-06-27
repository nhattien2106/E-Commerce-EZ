"use client";
import ProductImage from "@/app/components/ProductImage";
import { Dialog } from "@headlessui/react";
import { StarIcon as StarIconOutLine } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import React from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const id = useParams().id;
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();

      setProduct(product);
    }

    fetchProduct();
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black-30" aria-hidden="true" />
      <div className="flex inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-10">
            <div className="flex gap-x-8 h-96">
              {product?.image && (
                <div className="relative w-72 h-full hidden md:inline ">
                  <ProductImage product={product} fill />
                </div>
              )}
              <div>
                <div>
                  <h4 className="font-semibold">{product?.title}</h4>
                  <p className="font-medium text-sm">${product?.price}</p>
                  <div>
                    <p>{product?.rating.rate}</p>
                    {product?.rating.rate && (
                      <div className="flex items-center ml-2 mr-6">
                        {Array.from(
                          { length: Math.floor(product.rating.rate) },
                          (_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
