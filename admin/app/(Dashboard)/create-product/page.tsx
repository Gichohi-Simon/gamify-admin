"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CreateProductFormValues } from "@/types/types";
import { useCreateProduct } from "@/hooks/products";
import Image from "next/image";

export default function AddProduct() {
  const router = useRouter();
  const { mutateAsync } = useCreateProduct();

  const initialValues: CreateProductFormValues = {
    name: "",
    price: "",
    description: "",
    category: "",
    images: [] as File[],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      price: Yup.number()
        .typeError("price must be a number")
        .required("price is required"),
      description: Yup.string().required("description is required"),
      images: Yup.array()
        .min(1, "at least one image is required")
        .max(3, "you can upload a max of 3 images")
        .required("images are required"),
      category: Yup.string().required("category is required"),
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
        await mutateAsync(formData);
        toast.success("product created successfully");
        formik.resetForm();
        router.push("/products");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error?.message : "failed to create product";
        toast.error(message);
      }
    },
  });

  return (
    <div className="font-raleway flex min-h-screen items-center justify-center bg-gray-100 px-5 py-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full rounded-xl bg-white px-4 py-6 md:w-3/4 md:px-8"
      >
        <p className="text-center text-2xl font-semibold tracking-wider capitalize">
          create product
        </p>
        <div className="mt-5">
          <label className="text-xs font-semibold md:text-sm">name</label>
          <input
            name="name"
            type="text"
            placeholder="product name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.name}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">price</label>
          <input
            name="price"
            type="text"
            placeholder="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.price}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">category</label>
          <input
            name="category"
            type="text"
            placeholder="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
          {formik.touched.category && formik.errors.category && (
            <p className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.category}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">
            description
          </label>
          <textarea
            name="description"
            placeholder="product description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-2 w-full rounded-md border px-2 py-2 text-xs md:text-sm"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.description}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-xs font-semibold md:text-sm">
            images (max 3)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => {
              const selectedFiles = Array.from(event.currentTarget.files || []);
              const combinedFiles = [
                ...formik.values.images,
                ...selectedFiles,
              ].slice(0, 3);
              formik.setFieldValue("images", combinedFiles);
              event.currentTarget.value = "";
            }}
            className="mt-2 w-full text-xs md:text-sm"
          />
          {formik.touched.images && formik.errors.images && (
            <p className="mt-1 text-xs font-bold text-red-500">
              {formik.errors.images as string}
            </p>
          )}

          {formik.values.images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {formik.values.images.map((file, index) => (
                <div
                  key={index}
                  className="relative h-24 w-full overflow-hidden rounded-md border"
                >
                  <Image
                    className="h-full w-full object-cover"
                    alt="preview"
                    src={URL.createObjectURL(file)}
                    width={200}
                    height={200}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedImages = formik.values.images.filter(
                        (_, i) => i !== index,
                      );
                      formik.setFieldValue("images", updatedImages);
                    }}
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
          className="bg-primary mt-8 mb-5 w-full cursor-pointer rounded-md py-2 text-xs font-semibold capitalize md:text-sm"
        >
          {formik.isSubmitting ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            "create product"
          )}
        </button>
      </form>
    </div>
  );
}
