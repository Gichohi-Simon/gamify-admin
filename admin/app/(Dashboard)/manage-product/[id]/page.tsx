"use client";

import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import { useGetSingleProduct, useUpdateProduct } from "@/hooks/products";
import { CreateProductFormValues } from "@/types/types";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data, isLoading } = useGetSingleProduct(productId);
  const { mutateAsync } = useUpdateProduct();

  const initialValues: CreateProductFormValues = {
    name: data?.name || "",
    price: data?.price !== undefined ? String(data.price) : "",
    description: data?.description || "",
    category: data?.category || "",
    images: [] as File[],
  };

  const images = data?.images;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      price: Yup.number()
        .typeError("price must be a number")
        .required("price is required"),
      description: Yup.string().required("description is required"),
      category: Yup.string().required("category is required"),
      images: Yup.array().max(3, "you can upload a max of 3 images"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("category", values.category);

        values.images.forEach((file) => {
          formData.append("images", file);
        });

        await mutateAsync({ id: productId, formData: formData });

        toast.success("product updated successfully");
        router.push("/products");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "failed to update product";
        toast.error(message);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="font-raleway flex min-h-screen items-center justify-center bg-gray-100 px-5 py-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full rounded-xl bg-white px-4 py-6 md:w-3/4 md:px-8"
      >
        <p className="text-center text-2xl font-semibold capitalize">
          edit product
        </p>

        <div className="mt-5">
          <label className="text-xs font-semibold md:text-sm">name</label>
          <input
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">price</label>
          <input
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">category</label>
          <input
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">
            description
          </label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
        </div>

        {images && images.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold md:text-sm">existing images</p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-24 w-full overflow-hidden rounded-md border"
                >
                  <Image
                    src={img}
                    alt="product"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">
            add new images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.currentTarget.files || []);
              const combined = [...formik.values.images, ...files].slice(0, 3);
              formik.setFieldValue("images", combined);
              e.currentTarget.value = "";
            }}
            className="mt-2 w-full text-xs md:text-sm"
          />

          {formik.values.images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {formik.values.images?.map((file, index) => (
                <div
                  key={index}
                  className="relative h-24 w-full overflow-hidden rounded-md border"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      formik.setFieldValue(
                        "images",
                        formik.values.images?.filter((_, i) => i !== index),
                      )
                    }
                    className="absolute top-1 right-1 rounded-full bg-black/70 px-2 text-xs text-white"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-primary mt-8 w-full rounded-md py-2 text-xs font-semibold"
        >
          {formik.isSubmitting ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            "update product"
          )}
        </button>
      </form>
    </div>
  );
}
