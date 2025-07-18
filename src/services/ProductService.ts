import {
  safeParse,
  pipe,
  number,
  parse,
  string,
  transform,
  boolean,
} from "valibot";
import axios from "axios";

import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
  type Product,
} from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }

  return;
};

export const getProductByID = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }

  return;
};

export const addProduct = async (data: ProductData) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (data: ProductData, id: Product["id"]) => {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());
    const AvailabilitySchema = pipe(
      string(),
      transform((input) => input === "true"),
      boolean()
    );

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: parse(AvailabilitySchema, data.availability),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log("Ocurrio un error: ", error);
  }
  return;
};
