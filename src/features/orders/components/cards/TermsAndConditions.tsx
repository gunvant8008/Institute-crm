import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="md:p-6 xl:p-8 bg-gray-50 flex flex-col justify-center w-full px-4 py-6 space-y-6">
      <h3 className="text-xl font-semibold leading-5 text-gray-600">
        Terms & Conditions
      </h3>
      <div className="flex flex-col w-full space-y-1 text-xs">
        <p>
          1. Purchase: The purchase fee covers uses of our software for a fix
          period of months and is non-refundable.
        </p>
        <p>
          2. Due Payment: Due payment must be completed before due date for
          uninterrupted services.
        </p>
        <p>3. Renewal: For renewal please contact support.</p>
        <p>
          4. Cancellation: Members may cancel their subscription at any time,
          but no refunds will be issued for the current month.
        </p>
        <p>
          4. Use of Software: Members agree to use the software only for its
          intended purpose and not to copy, modify, or distribute it.
        </p>
        <p>
          5. Support: Members will have access to technical support via email,
          chat, or phone during business hours.
        </p>
        <p>
          6. Liability: The company is not responsible for any damages or losses
          resulting from the use of the software.
        </p>
        <p>
          7. Termination: The company may terminate a membership for any reason
          with notice.
        </p>
        <p>
          8. Updates: The company may update these terms and conditions at any
          time, and members will be notified of any changes.
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <a
          href="www.igyanam.com"
          target="_blank"
          className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 w-96 md:w-full py-5 pl-4 text-base font-medium leading-4 text-white bg-gray-800"
        >
          Read Full Terms and Conditions On Website
        </a>
      </div>
    </div>
  );
};

export default TermsAndConditions;
