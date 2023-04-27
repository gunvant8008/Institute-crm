import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getAllProducts, getUser } from "../../axios/userApi";
import Link from "next/link";
import { TextFieldWithLabel } from "../basic/TextFieldWithLabel";
import { Product } from "../../types/userTypes";
import { FaProductHunt } from "react-icons/fa";

export const SingleProduct = ({ product }: { product: Product }) => {
  const [selected, setSelected] = useState(false);
  console.log(selected);
  return (
    <div className="bg-gray-50 hover:bg-gray-100 grid grid-cols-5 p-2 my-3 rounded-lg">
      <div className="flex">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => setSelected(!selected)}
          className="p-1 m-2"
        />
        <div className="p-3 bg-orange-200 rounded-lg">
          <FaProductHunt className="text-orange-800" />
        </div>
        <div className="pl-4">
          <p className="font-bold text-gray-800">
            ￡{product.productPrice?.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Id:{product.id}</p>
        </div>
      </div>
      <p className="sm:text-left text-right text-gray-600">
        <span>{product.productName}</span>
      </p>
      <p className="md:flex hidden">{product.validityInMonths}</p>
      <div className="sm:flex items-center justify-between hidden">
        <input
          placeholder="0"
          type="number"
          className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
          disabled={selected === false}
        />
      </div>
      <div className="">
        <input
          type="date"
          className=" focus:ring focus:ring-opacity-75 focus:ring-gray-400 p-1 text-black rounded-md"
          disabled={selected === false}
        />
      </div>
    </div>
  );
};

const NewOrder = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery(["user", id.toString()], () => (id ? getUser(id) : null));

  const { data: products } = useQuery(["products"], () => getAllProducts());
  console.log(products);
  if (isError) {
    return (
      <div className="flex items-center justify-center gap-4 mt-10">
        <p>Something went wrong!</p>
        <Link className="self-center p-2 bg-teal-800" href="/list">
          Try again{" "}
        </Link>
      </div>
    );
  }
  if (isLoading || !userData) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="gap-y-10 flex flex-col items-center p-8 bg-gray-100">
      <h2 className="p-4 text-2xl text-center">New Order</h2>
      <form
        className=" bg-gray-200 p-8 rounded-xl shadow-lg flex flex-col gap-4 w-[70vw]"
        // REVIEW: Typescript error removed after adding void
        //  onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <div className=" flex flex-wrap items-start gap-10">
            <TextFieldWithLabel
              labelText="Id"
              inputType="number"
              placeholder={userData.id.toString()}
              readOnly
              className="p-1 text-gray-400 rounded-md"
            />
            <TextFieldWithLabel
              labelText="Institute Name"
              inputType="text"
              placeholder={userData.instituteName}
              readOnly
              //  error={errors.instituteName?.message as string}
              //  inputProps={register("instituteName")}
            />
            <TextFieldWithLabel
              labelText="Owner's Name"
              inputType="text"
              placeholder={userData.ownersName}
              readOnly
              //  error={errors.ownersName?.message as string}
              //  inputProps={register("ownersName")}
            />
            <TextFieldWithLabel
              labelText="Manager's Name"
              inputType="text"
              placeholder={userData.managersName}
              readOnly
              //  error={errors.managersName?.message as string}
              //  inputProps={register("managersName")}
            />

            <TextFieldWithLabel
              labelText="Phone"
              inputType="number"
              placeholder={userData.phone1}
              readOnly
              //  error={errors.phone1?.message as string}
              //  inputProps={register("phone1")}
            />

            <TextFieldWithLabel
              labelText="Email"
              inputType="email"
              placeholder={userData.email}
              readOnly
              //  error={errors.email?.message as string}
              //  inputProps={register("email")}
            />

            <div className="flex items-start w-full gap-10">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lead Type
                <input
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder={userData.leadType}
                  readOnly
                ></input>
              </label>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lead Source
                <input
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder={userData.leadSource}
                  readOnly
                ></input>
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-2xl text-gray-600">Add Products/Services</h2>
        <div className="grid grid-cols-5 font-semibold">
          <span>Price</span>
          <span>Name</span>
          <span>Validity</span>
          <span>Discount</span>
          <span>Start From</span>
        </div>
        <ul>
          {products?.map((product: Product) => (
            <li key={product.id}>
              <SingleProduct product={product} />
            </li>
          ))}
        </ul>
      </div>
      <Link className=" self-center p-2 bg-white rounded-md" href="/enquiries">
        Go To Enquiries
      </Link>
    </div>
  );
};

export default NewOrder;
