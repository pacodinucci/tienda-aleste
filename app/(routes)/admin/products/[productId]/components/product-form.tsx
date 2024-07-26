"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, User } from "@prisma/client";
import { useRouter } from "next/navigation";
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
  size: z.string().min(1, {
    message: "Tamaño de vino es requerido.",
  }),
  description: z.string().min(1, {
    message: "Descripción del vino es requerido.",
  }),
  src: z.string().min(1, {
    message: "Imagen es requerida.",
  }),
});

const ProductForm = ({ initialData, user }: ProductFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      category: "",
      type: "",
      size: "750ml",
      description: "",
      src: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const wineTypes = ["Tinto", "Blanco", "Rosado", "Espumante"];

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!initialData) {
        await axios.post("/api/products", { ...data, user });
        console.log("producto agregado.");
        toast.success("Producto agregado.");
        router.push("/admin/products");
      } else {
        console.log("actualizar producto.");
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
            <div className="pt-6 flex gap-x-10">
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
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="min-w-48">
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
            <div>
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
