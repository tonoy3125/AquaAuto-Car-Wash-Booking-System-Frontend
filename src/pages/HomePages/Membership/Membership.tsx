import { useState } from "react";

const Membership = () => {
  const [activeTab, setActiveTab] = useState("Small Car");

  const tabs = [
    {
      label: "Small Car",
      icon: "https://i.ibb.co.com/93JNTRs/svgviewer-png-output.png",
      plans: [
        {
          type: "Basic Cleaning",
          price: "29",
          duration: "15 - 30 Mins",
          features: ["Exterior washing", "Vacuum cleaning"],
        },
        {
          type: "Regular Cleaning",
          price: "49",
          duration: "20 - 40 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
          ],
        },
        {
          type: "Premium Cleaning",
          price: "69",
          duration: "30 - 50 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
        {
          type: "Full Cleaning",
          price: "89",
          duration: "40 - 60 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
      ],
    },
    {
      label: "SUV",
      icon: "https://i.ibb.co.com/tLn5qDF/svgviewer-png-output-2.png",
      plans: [
        {
          type: "Basic Cleaning",
          price: "39",
          duration: "20 - 40 Mins",
          features: ["Exterior washing", "Vacuum cleaning"],
        },
        {
          type: "Regular Cleaning",
          price: "59",
          duration: "30 - 50 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
          ],
        },
        {
          type: "Premium Cleaning",
          price: "79",
          duration: "40 - 60 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
        {
          type: "Full Cleaning",
          price: "99",
          duration: "50 - 70 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
      ],
    },
    {
      label: "Minibus",
      icon: "https://i.ibb.co.com/R3qpBC5/svgviewer-png-output-3.png",
      plans: [
        {
          type: "Basic Cleaning",
          price: "49",
          duration: "30 - 50 Mins",
          features: ["Exterior washing", "Vacuum cleaning"],
        },
        {
          type: "Regular Cleaning",
          price: "69",
          duration: "40 - 60 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
          ],
        },
        {
          type: "Premium Cleaning",
          price: "89",
          duration: "50 - 70 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
        {
          type: "Full Cleaning",
          price: "109",
          duration: "60 - 90 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
      ],
    },
    {
      label: "Pickup",
      icon: "https://i.ibb.co.com/V3Ph9bw/svgviewer-png-output-5.png",
      plans: [
        {
          type: "Basic Cleaning",
          price: "59",
          duration: "30 - 60 Mins",
          features: ["Exterior washing", "Vacuum cleaning"],
        },
        {
          type: "Regular Cleaning",
          price: "79",
          duration: "40 - 70 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
          ],
        },
        {
          type: "Premium Cleaning",
          price: "99",
          duration: "50 - 80 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
        {
          type: "Full Cleaning",
          price: "119",
          duration: "60 - 100 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
      ],
    },
    {
      label: "Truck",
      icon: "https://i.ibb.co.com/H7PcPn5/svgviewer-png-output-6.png",
      plans: [
        {
          type: "Basic Cleaning",
          price: "69",
          duration: "40 - 70 Mins",
          features: ["Exterior washing", "Vacuum cleaning"],
        },
        {
          type: "Regular Cleaning",
          price: "89",
          duration: "50 - 80 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
          ],
        },
        {
          type: "Premium Cleaning",
          price: "109",
          duration: "60 - 90 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
        {
          type: "Full Cleaning",
          price: "129",
          duration: "70 - 120 Mins",
          features: [
            "Exterior washing",
            "Vacuum cleaning",
            "Interior cleaning",
            "Window wiping",
          ],
        },
      ],
    },
  ];

  const activeTabPlans =
    tabs.find((tab) => tab.label === activeTab)?.plans || [];

  return (
    <div className="bg-[#FDFDFE]">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-poppins text-xl sm:text-2xl semi-sm:text-3xl md:text-4xl font-bold text-center mb-5">
          Membership Plan
        </h1>
        <hr className="bg-[#EE3131] h-1 w-12 mx-auto" />
        <p
          className="font-poppins text-center text-[#626472] mt-5 mx-5 md:mx-0"
          style={{ lineHeight: "1.5", letterSpacing: "1px" }}
        >
          Choose Your Membership Plan Pick a plan that fits your{" "}
          <br className="hidden md:block" /> needs and enjoy great benefits and
          services
        </p>

        {/* Tabs */}
        <div className="flex justify-center mt-8 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`relative flex flex-col items-center py-7 px-10 rounded-[10px] ${
                activeTab === tab.label
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-[#FFF0F5] text-[#141C2A]"
              } hover:bg-red-500 hover:text-white group`}
            >
              <img
                src={tab.icon}
                alt=""
                className={`transition-transform duration-300 w-20 h-12 ${
                  activeTab === tab.label ? "filter invert brightness-0" : ""
                } group-hover:filter group-hover:invert group-hover:brightness-0`}
              />
              <span className="mt-4 font-poppins font-medium">{tab.label}</span>
              <span
                className={`absolute -bottom-[10px] w-0 h-0 border-t-[10px] ${
                  activeTab === tab.label
                    ? "border-t-red-500"
                    : "border-t-transparent group-hover:border-t-red-500"
                } border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent`}
              ></span>
            </button>
          ))}
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-4 gap-6 mt-10 font-poppins">
          {activeTabPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-12 rounded-lg shadow-xl relative ${
                index === activeTabPlans.length - 1
                  ? "text-white"
                  : "bg-[#FFFFFF]"
              }`}
              style={{
                backgroundImage:
                  index === activeTabPlans.length - 1
                    ? "url('https://i.ibb.co.com/HBvt7yF/Group-388.png')"
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color:
                  index === activeTabPlans.length - 1 ? "white" : "inherit",
              }}
            >
              <h3
                className={`text-base font-medium mb-1 text-center ${
                  index === activeTabPlans.length - 1
                    ? "text-white"
                    : "text-[#EE3131]"
                }`}
              >
                {plan.type}
              </h3>
              <p className="text-5xl font-bold flex items-start gap-1 mb-5 justify-center">
                <span className="text-2xl">$</span> {plan.price}
              </p>
              <p
                className={`flex items-center justify-center gap-2 font-medium text-[15px] mb-1 ${
                  index === activeTabPlans.length - 1
                    ? "text-white"
                    : "text-[#141C2A]"
                }`}
              >
                <span>⏱</span> {plan.duration}
              </p>
              <ul className="mt-4 space-y-5">
                {[
                  "Exterior washing",
                  "Vacuum cleaning",
                  "Interior cleaning",
                  "Window wiping",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    {plan.features.includes(feature) ? (
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#11CB6D] text-white">
                        ✔
                      </div>
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#999999] text-white">
                        ✖
                      </div>
                    )}
                    <span
                      className={`${
                        plan.features.includes(feature)
                          ? index === activeTabPlans.length - 1
                            ? "text-white"
                            : "text-[#44515B]"
                          : "text-[#44515B]"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 py-2 px-4 rounded-lg text-base font-medium w-full ${
                  index === activeTabPlans.length - 1
                    ? "bg-red-500 text-white"
                    : "bg-[#EE3131] text-white"
                }`}
              >
                ORDER NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
