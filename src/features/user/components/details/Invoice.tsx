import React from "react";

export const Invoice = () => {
  return (
    // <!-- Invoice -->
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      {/* <!-- Grid --> */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Invoice</h2>
        </div>
        {/* <!-- Col --> */}

        <div className="gap-x-2 inline-flex">
          <button className="p-2 bg-gray-200">Invoice PDF</button>
          <button className="p-2 bg-blue-200">Print</button>
        </div>
        {/* <!-- Col --> */}
      </div>
      {/* <!-- End Grid --> */}

      {/* <!-- Grid --> */}
      <div className="md:grid-cols-2 grid gap-3">
        <div>
          <div className="grid space-y-3">
            <dl className="sm:flex gap-x-3 grid text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Billed to:
              </dt>
              <dd className="dark:text-gray-200 text-gray-800">
                <a
                  className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  sara@site.com
                </a>
              </dd>
            </dl>

            <dl className="sm:flex gap-x-3 grid text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Billing details:
              </dt>
              <dd className=" font-medium text-gray-800">
                <span className="block font-semibold">Sara Williams</span>
                <p className="not-italic font-normal">
                  280 Suzanne Throughway
                  <br />
                  Breannabury,
                  <br />
                  OR 45801 United States
                </p>
              </dd>
            </dl>

            <dl className="sm:flex gap-x-3 grid text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Shipping details:
              </dt>
              <dd className=" font-medium text-gray-800">
                <span className="block font-semibold">Sara Williams</span>
                <p className="not-italic font-normal">
                  280 Suzanne Throughway
                  <br />
                  Breannabury,
                  <br />
                  OR 45801 United States
                </p>
              </dd>
            </dl>
          </div>
        </div>
        {/* <!-- Col --> */}

        <div>
          <div className="grid space-y-3">
            <dl className="sm:flex gap-x-3 grid text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Invoice number:
              </dt>
              <dd className=" font-medium text-gray-800">ADUQ2189H1-0038</dd>
            </dl>

            <dl className="sm:flex gap-x-3 grid text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Currency:
              </dt>
              <dd className=" font-medium text-gray-800">USD - US Dollar</dd>
            </dl>

            <dl className="sm:flex gap-x-3 grid text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Due date:
              </dt>
              <dd className=" font-medium text-gray-800">10 Jan 2023</dd>
            </dl>

            <dl className="sm:flex gap-x-3 grid text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Billing method:
              </dt>
              <dd className=" font-medium text-gray-800">Send invoice</dd>
            </dl>
          </div>
        </div>
        {/* <!-- Col --> */}
      </div>
      {/* <!-- End Grid --> */}

      {/* <!-- Table --> */}
      <div className="dark:border-gray-700 p-4 mt-6 space-y-4 border border-gray-200 rounded-lg">
        <div className="sm:grid sm:grid-cols-5 hidden">
          <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
            Item
          </div>
          <div className="text-xs font-medium text-left text-gray-500 uppercase">
            Qty
          </div>
          <div className="text-xs font-medium text-left text-gray-500 uppercase">
            Rate
          </div>
          <div className="text-xs font-medium text-right text-gray-500 uppercase">
            Amount
          </div>
        </div>

        <div className="sm:block dark:border-gray-700 hidden border-b border-gray-200"></div>

        <div className="sm:grid-cols-5 grid grid-cols-3 gap-2">
          <div className="col-span-full sm:col-span-2">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            <p className=" font-medium text-gray-800">Design UX and UI</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            <p className=" text-gray-800">1</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Rate
            </h5>
            <p className=" text-gray-800">5</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Amount
            </h5>
            <p className="sm:text-right text-gray-800">$500</p>
          </div>
        </div>

        <div className="sm:hidden dark:border-gray-700 border-b border-gray-200"></div>

        <div className="sm:grid-cols-5 grid grid-cols-3 gap-2">
          <div className="col-span-full sm:col-span-2">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            <p className=" font-medium text-gray-800">Web project</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            <p className=" text-gray-800">1</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Rate
            </h5>
            <p className=" text-gray-800">24</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Amount
            </h5>
            <p className="sm:text-right text-gray-800">$1250</p>
          </div>
        </div>

        <div className="sm:hidden dark:border-gray-700 border-b border-gray-200"></div>

        <div className="sm:grid-cols-5 grid grid-cols-3 gap-2">
          <div className="col-span-full sm:col-span-2">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            <p className=" font-medium text-gray-800">SEO</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            <p className=" text-gray-800">1</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Rate
            </h5>
            <p className=" text-gray-800">6</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Amount
            </h5>
            <p className="sm:text-right text-gray-800">$2000</p>
          </div>
        </div>
      </div>
      {/* <!-- End Table --> */}

      {/* <!-- Flex --> */}
      <div className="sm:justify-end flex mt-8">
        <div className="sm:text-right w-full max-w-2xl space-y-2">
          {/* <!-- Grid --> */}
          <div className="sm:grid-cols-1 sm:gap-2 grid grid-cols-2 gap-3">
            <dl className="sm:grid-cols-5 gap-x-3 grid text-sm">
              <dt className="col-span-3 text-gray-500">Subotal:</dt>
              <dd className=" col-span-2 font-medium text-gray-800">
                $2750.00
              </dd>
            </dl>

            <dl className="sm:grid-cols-5 gap-x-3 grid text-sm">
              <dt className="col-span-3 text-gray-500">Total:</dt>
              <dd className=" col-span-2 font-medium text-gray-800">
                $2750.00
              </dd>
            </dl>

            <dl className="sm:grid-cols-5 gap-x-3 grid text-sm">
              <dt className="col-span-3 text-gray-500">Tax:</dt>
              <dd className=" col-span-2 font-medium text-gray-800">$39.00</dd>
            </dl>

            <dl className="sm:grid-cols-5 gap-x-3 grid text-sm">
              <dt className="col-span-3 text-gray-500">Amount paid:</dt>
              <dd className=" col-span-2 font-medium text-gray-800">
                $2789.00
              </dd>
            </dl>

            <dl className="sm:grid-cols-5 gap-x-3 grid text-sm">
              <dt className="col-span-3 text-gray-500">Due balance:</dt>
              <dd className=" col-span-2 font-medium text-gray-800">$0.00</dd>
            </dl>
          </div>
          {/* <!-- End Grid --> */}
        </div>
      </div>
      {/* <!-- End Flex --> */}
    </div>
  );
};
