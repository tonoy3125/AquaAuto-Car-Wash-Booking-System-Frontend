import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Is it possible to re-order my FAQs?",
      answer:
        "Choose your training and register for free. If you are a freelancer, the courses are entirely taken care of, you have nothing to pay and no money to advance.",
    },
    {
      question: "Can I hide my FAQ categories?",
      answer: "Yes, you can hide FAQ categories via the settings page.",
    },
    {
      question: "What are the current FAQ shortcodes?",
      answer: "You can use [faq] to embed FAQs anywhere on your page.",
    },
    {
      question: "How do I get my FAQs to show up on my page?",
      answer: "Simply add the FAQ shortcode to the desired page or post.",
    },
  ];

  return (
    <div className="bg-[#F7F7FA]">
      <div className="lg:max-w-7xl mx-auto pb-10">
        <h1 className="font-poppins text-xl sm:text-2xl semi-sm:text-3xl md:text-4xl font-bold text-center mb-5">
          Have Any Questions?
        </h1>
        <hr className="bg-[#EE3131] h-1 w-12 mx-auto" />
        <p
          className="font-poppins text-center text-[#626472] mt-5 mx-5 md:mx-0"
          style={{ lineHeight: "1.5", letterSpacing: "1px" }}
        >
          Got Questions? We’re happy to help! Ask us{" "}
          <br className="hidden md:block" /> anything, and we’ll get back to you
          soon.
        </p>
        <div className="flex items-center gap-4 justify-center mt-16">
          <div className="w-full font-poppins">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="py-6 bg-white px-5 rounded-lg mb-3"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center cursor-pointer">
                  <h2 className="font-semibold text-lg">{faq.question}</h2>
                  <span>
                    {openIndex === index ? (
                      <IoMdArrowDropup className="text-xl" />
                    ) : (
                      <IoMdArrowDropdown className="text-xl" />
                    )}
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <img
            src="https://i.ibb.co/mXwpfD9/kisspng-car-wash-mercedes-benz-mercedes-b-class-washing-car-wash-5ac1b926cc6b98-1-1-768x407.png"
            alt="Car Wash"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Faq;
