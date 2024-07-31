"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "./image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  initialData: Product | null;
  user: User | null;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Título es requerido.",
  }),
  category: z.string().min(1, {
    message: "Categoría de vino es requerida.",
  }),
  type: z.string().min(1, {
    message: "Variedad de vino requerida.",
  }),
  year: z.string().min(1, { message: "Año de cosecha es requerido." }),
  size: z.string().min(1, {
    message: "Tamaño de vino es requerido.",
  }),
  description: z.string().min(1, {
    message: "Descripción del vino es requerido.",
  }),
  src: z.string().min(1, {
    message: "Imagen es requerida.",
  }),
  discount: z.string(),
  price: z.string(),
  stock: z.string(),
  available: z.boolean().default(true),
  boxSize: z.string(),
});

const ProductForm = ({ initialData, user }: ProductFormProps) => {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      category: "",
      type: "",
      year: "",
      size: "750ml",
      description: "",
      src: "",
      discount: "0",
      price: "",
      stock: "",
      available: true,
      boxSize: "6",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const wineTypes = ["Tinto", "Blanco", "Rosado", "Espumante"];

  const boxes = ["2", "4", "6"];

  const discounts = ["0", "5", "10", "15", "20", "25", "30"];

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!initialData) {
        await axios.post("/api/products", { ...data, user });
        toast.success("Producto agregado.");
        router.push("/admin/products");
      } else {
        await axios.patch(`/api/products/${params.productId}`, { data });
        toast.success("Producto actualizado.");
        router.push("/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("No se pudo agregar el producto.");
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-6xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Agregar Producto</h3>
              <p className="text-sm text-muted-foreground">
                Completar los campos para agregar un nuevo producto.
              </p>
            </div>
            <Separator className="bg-primary/10" />
            <div className="pt-6 pb-4 flex gap-x-10">
              <div className="flex-1 flex flex-col gap-y-4">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del producto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-12">
                  <FormField
                    name="type"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Variedad</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="year"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="max-w-36 min-w-36">
                        <FormLabel>Año de cosecha</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="2020" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="max-w-36 min-w-36">
                        <FormLabel>Tipo de vino</FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Seleccionar un tipo de vino"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {wineTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} className="resize-none" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="src"
                render={({ field }) => (
                  <FormItem className="max-w-md flex flex-col space-y-4">
                    <FormControl>
                      <ImageUpload
                        disabled={isLoading}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-x-12">
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="stock"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="boxSize"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Botellas por caja</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value || "6"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boxes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="discount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Seleccionar descuento"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {discounts.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="py-4">
              <FormField
                name="available"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex gap-x-2 items-center">
                    <FormLabel className="pt-2">Disponible</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div className="pt-4">
              <Button type="submit" disabled={isLoading}>
                {initialData ? "Actualizar producto" : "Agregar producto"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
