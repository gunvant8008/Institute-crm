import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { getUser } from "../../../user/axios/userApi";
import { getOrder } from "../../axios/ordersApi";
import Loading from "@/AppComponents/basic/Loading";
import { TProductInOrder } from "@/features/product/types/productTypes";
import ProductInfo from "@/features/product/components/cards/ProductInfo";
import TermsAndConditions from "../cards/TermsAndConditions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@/AppComponents/basic/Button";

export const OrderDetails = ({ id }: { id: number }) => {
  const orderDetailsRef = useRef(null);
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery(["order", id], () => (id ? getOrder(id) : null));

  const { data: user } = useQuery(["user", order?.userId], () =>
    order?.userId ? getUser(order?.userId) : null,
  );

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }
  if (isLoading) {
    return <Loading />;
  }

  const handleConvertToPDF = async () => {
    try {
      const input = orderDetailsRef.current;
      const canvas = await html2canvas(input as unknown as HTMLElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      pdf.save(`order-${order?.id as number}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendPDFByEmail = async () => {
    try {
      const input = orderDetailsRef.current;
      const canvas = await html2canvas(input as unknown as HTMLElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      // convert PDF to Blob object
      const pdfBlob = pdf.output("blob");

      // create URL for PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);
      // open PDF in new window or default email app
      const emailSubject = "Order PDF";
      const emailBody = "Please find attached your order PDF.";
      const emailTo = user?.email as string;
      const windowParams = `scrollbars=yes,resizable=yes,width=800,height=600,top=${
        (screen.height - 600) / 2
      },left=${(screen.width - 800) / 2}`;
      const mailToLink = `mailto:${emailTo}?subject=${encodeURIComponent(
        emailSubject,
      )}&body=${encodeURIComponent(emailBody)}&attachment=${pdfUrl}`;
      window.open(mailToLink, "_blank", windowParams);
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center pt-8 gap-x-4">
        <Button variant="light" onClick={handleConvertToPDF}>
          ⇩ PDF
        </Button>
        <Button onClick={handleSendPDFByEmail}>✉️ PDF</Button>
      </div>
      <div ref={orderDetailsRef}>
        <div className="px-4 py-14 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-between space-y-2 item-start">
            <div className="flex items-center gap-x-4">
              <div>
                <h1 className="text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
                  Order #{order?.id}
                </h1>
                <h1 className="text-3xl font-semibold leading-7 text-gray-800 lg:text-xl lg:leading-9">
                  User Id #{order?.userId}
                </h1>
              </div>
            </div>
            <p className="text-base font-medium leading-6 text-gray-600">
              Date: {order?.orderDate}
            </p>
            <div className="flex flex-col text-base font-medium leading-6 text-gray-600">
              <span className="font-semibold">Support</span>
              <span className="text-sm">📧 info@igyanam.com</span>
              <span className="text-sm">📞 +91-9999999999</span>
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-center w-full mt-10 space-y-4 xl:flex-row xl:space-x-8 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col items-start justify-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col items-start justify-start w-full space-y-2 bg-gray-50 md:py-6 md:p-6 xl:p-8">
                <p className="text-lg font-semibold leading-6 text-gray-600 md:text-xl xl:leading-5">
                  Products
                </p>
                <div className="grid w-full grid-cols-6 font-semibold gap-x-8">
                  <span>Price</span>
                  <span>Name</span>
                  <span>Validity</span>
                  <span>Discount</span>
                  <span>Validity From</span>
                  <span>Validity Until</span>
                </div>

                <ul className="flex flex-col w-full gap-8 py-8">
                  {order?.products?.map((product: TProductInOrder) => {
                    if (product?.isSelected)
                      return (
                        <li
                          key={product.id}
                          className="w-full bg-gray-100 rounded-md shadow-md"
                        >
                          <ProductInfo product={product} />
                        </li>
                      );
                  })}
                </ul>
              </div>
              <div className="flex flex-col items-stretch justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col w-full px-4 py-6 space-y-6 md:p-6 xl:p-8 bg-gray-50">
                  <h3 className="text-xl font-semibold leading-5 text-gray-600">
                    Summary
                  </h3>
                  <div className="flex flex-col items-center justify-center w-full pb-4 space-y-4 border-b border-gray-200">
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Total Amount
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        ￡{order?.totalAmount}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Total Discount
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        ￡ {order?.totalDiscount}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Payable Amount
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        ￡{order?.payableAmount}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Paid Amount
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        ￡{order?.paidAmount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-semibold leading-4 text-gray-800">
                      Due Amount
                    </p>
                    <p className="text-base font-semibold leading-4 text-gray-600">
                      ￡{order?.dueAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-semibold leading-4 text-gray-800">
                      Due Date
                    </p>
                    <p className="text-base font-semibold leading-4 text-gray-600">
                      {order?.dueAmount !== undefined
                        ? order?.dueAmount > 0
                          ? order?.dueDate
                          : "N/A"
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <TermsAndConditions />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full px-4 py-6 bg-gray-50 xl:w-96 md:items-start md:p-6 xl:p-8">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Customer
              </h3>
              <div className="flex flex-col items-stretch justify-start w-full h-full md:flex-row xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col items-start justify-start flex-shrink-0">
                  <div className="flex items-center justify-center w-full py-8 space-x-4 border-b border-gray-200 md:justify-start">
                    <div className="flex flex-col items-start justify-start space-y-2 ">
                      <p className="text-base font-semibold leading-4 text-left text-gray-800">
                        Institute: {user?.instituteName}
                      </p>
                      <p className="text-sm leading-4 text-left text-gray-800">
                        Owner: {user?.ownersName}
                      </p>
                      <p className="text-sm leading-4 text-left text-gray-800">
                        Manager: {user?.managersName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-full py-4 space-x-4 border-b border-gray-200 md:justify-start">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm leading-5 text-gray-800 cursor-pointer">
                        ✉️ {user?.email}
                      </p>
                      <p className="text-sm leading-5 text-gray-600">
                        📞 {user?.phone1}
                      </p>
                      <p className="text-sm leading-5 text-gray-600">
                        📞 {user?.phone2}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch justify-between w-full mt-6 xl:h-full md:mt-0">
                  <div className="flex flex-col items-center justify-center space-y-4 md:justify-start xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 xl:space-y-12 md:space-y-0 md:flex-row md:items-start">
                    <div className="flex flex-col items-center justify-center pt-4 space-y-2 md:justify-start md:items-start">
                      <p className="text-base font-semibold leading-4 text-center text-gray-800 md:text-left">
                        Address
                      </p>
                      <p className="w-48 text-sm leading-5 text-center text-gray-600 lg:w-full xl:w-48 md:text-left">
                        {user?.address}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-center w-full md:justify-start md:items-start">
                    <Link
                      href={`/edituser/${user?.id as number}`}
                      className="p-3 text-gray-800 border border-gray-800"
                    >
                      Edit Customer
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
