import React, { useState } from "react";
import BusinessImage from "../assets/opp2.png";
import BusinessOwner from "../assets/Ellipse 4.png";
import TopRightIcon from "../assets/Vector.png";
import {
  FiChevronLeft,
  FiDownload,
  FiHeart,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";
import {
  BsCheckCircleFill,
  BsInstagram,
  BsTwitter,
  BsFacebook,
} from "react-icons/bs";

export default function BusinessDetail({ business = {}, onBack, onConnect }) {
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const b = {
    title: business.title ?? "Aquatics and Sport Coaching Opportunity",
    price: business.price ?? "₦400,000",
    reportedSales: business.reportedSales ?? "₦400,000",
    years: business.years ?? "12 - 15",
    employees: business.employees ?? "15 - 20 employees",
    location: business.location ?? "Lagos, Nigeria",
    businessName: business.businessName ?? "Octopus Limited",
    industry: business.industry ?? "Bakery",
    legalEntity: business.legalEntity ?? "Sole Ownership",
    intro:
      business.intro ??
      "Paggico is a growing car wash and cleaning service segment operational across India.\n  We arrange a 360-degree car washing service with highly qualified cleaning staff, tools, and. Paggico is a growing car wash and cleaning service segment operational across India. - We arrange a 360-degree car washing service with highly qualified cleaning staff, tools, and.",
    services:
      business.services ??
      "Paggico is a growing car wash and cleaning service segment operational across India. \n We arrange a 360-degree car washing service with highly qualified cleaning staff, tools, and. Paggico is a growing car wash and cleaning service segment operational across India. - We arrange a 360-degree car washing service with highly qualified cleaning staff, tools, and.",
    assets:
      business.assets ?? [
        "Lorem ipsum dolor sit amet cons piscing elit lorem.",
        "Lorem ipsum dolor sit amet cons piscing elit lorem ipsu.",
        "Lorem ipsum dolor sit amet cons pisc.",
      ],
    owner: {
      name: "Oyekunle Qudus",
      role: "Co-founder",
      location: "Oyo State, Nigeria",
      verified: true,
      image: BusinessOwner,
      socials: {
        twitter: "#",
        instagram: "#",
        facebook: "#",
      },
    },
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(b, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${b.businessName.replace(/\s+/g, "_")}_details.json`;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleConnect = () => {
    if (typeof onConnect === "function") return onConnect(b);
    alert("Connect pressed — provide an onConnect prop to handle this.");
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex flex-col overflow-x-hidden md:pt-6">
      {/* Header */}
      <header className="md:pl-[280px] px-4 md:px-8">
        <div className="flex items-center justify-between gap-3 mb-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-[#3399FF] text-sm md:text-base"
          >
            <FiChevronLeft className="w-5 h-5" />
            <span className="font-medium truncate max-w-[60vw] md:max-w-none">
              {b.title}
            </span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#EAF4FF] text-[#3399FF] px-4 py-2 rounded-md text-sm hover:bg-[#D6EBFF]"
          >
            <FiDownload className="w-4 h-4" />
            Download
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="md:pl-[280px] px-4 md:px-8 mb-6">
        <div className="flex gap-4 overflow-x-auto md:overflow-x-visible pb-3 md:grid md:grid-cols-3 md:gap-4 snap-x snap-mandatory scrollbar-hide">
          {[
            {
              label: "Investment Required",
              value: b.price,
              sub: b.location,
              badge: "10% stake",
            },
            {
              label: "Reported Sales",
              value: b.reportedSales,
              sub: "Yearly records",
            },
            {
              label: "Years of Existence",
              value: b.years,
              sub: b.employees,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-[4px] shadow-sm p-5 flex-shrink-0 snap-center"
              style={{
                width: "314px",
                height: "168px",
              }}
            >
              <img src={TopRightIcon} alt="icon" className="w-4 h-4 float-right" />
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="mt-3 flex items-center gap-2">
                <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                {stat.badge && (
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    {stat.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main */}
      <main className="md:pl-[280px] px-4 md:px-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div
              className="bg-white border border-gray-200 rounded-[4px] shadow-sm"
              style={{
                width: "100%",
                maxWidth: "714px",
                height: "auto",
              }}
            >
              {/* Tabs */}
              <nav className="flex items-center border-b border-gray-200 text-sm overflow-x-auto scrollbar-hide">
                {[
                  { id: "overview", label: "Business Overview" },
                  { id: "attachments", label: "Attachments" },
                  { id: "gallery", label: "Business Gallery" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-4 whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "text-[#3399FF] border-b-2 border-[#3399FF] font-medium"
                        : "text-gray-500 hover:text-[#3399FF]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Content */}
              <div className="p-4 md:p-5 space-y-6">
                {activeTab === "overview" && (
                  <>
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="relative w-[325px] md:w-[369px] rounded-[4px] overflow-hidden">
                        <img
                          src={BusinessImage}
                          alt={b.title}
                          className="object-cover w-full h-[163px] md:h-[197px] rounded-[4px]"
                        />
                        <button
                          onClick={() => setLiked(!liked)}
                          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-105 transition-transform z-10"
                        >
                          <FiHeart
                            className={`w-5 h-5 ${
                              liked ? "text-red-500" : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Business Name</p>
                        <h3 className="font-semibold text-gray-900 mt-1">
                          {b.businessName}
                        </h3>
                        <div className="text-sm text-gray-600 mt-3 space-y-1">
                          <p>
                            <span className="font-medium text-gray-700">
                              Industry:
                            </span>{" "}
                            {b.industry}
                          </p>
                          <p>
                            <span className="font-medium text-gray-700">
                              Legal Entity:
                            </span>{" "}
                            {b.legalEntity}
                          </p>
                        </div>
                      </div>
                    </div>

                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Business Introduction
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {b.intro}
                      </p>
                    </section>

                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Product & Services Overview
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {b.services}
                      </p>
                    </section>

                    <section>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Assets Overview
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        {b.assets.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white w-full border border-gray-200 rounded-[4px] shadow-sm p-5 lg:sticky lg:top-28">
              <div className="relative flex justify-center">
                <img
                  src={b.owner.image}
                  alt={b.owner.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                />

                {b.owner.verified && (
                  <div className="absolute -top-1 right-[34%] bg-[#E9F9EE] flex items-center gap-1 px-2 py-0.5 rounded-full shadow-sm">
                    <BsCheckCircleFill className="text-green-600 w-4 h-4" />
                    <span className="text-green-600 text-xs font-medium">
                      Verified
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center mt-4">
                <p className="font-semibold text-gray-900">{b.owner.name}</p>
                <p className="text-sm text-gray-500">{b.owner.role}</p>
                <p className="text-xs text-gray-400">{b.owner.location}</p>
              </div>

              <div className="mt-4 flex justify-center gap-3">
                {[BsTwitter, BsInstagram, BsFacebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 bg-gray-100 rounded-full text-[#3399FF] hover:bg-[#EAF4FF]"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <button
                onClick={handleConnect}
                className="mt-6 w-full bg-[#3399FF] hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium transition"
              >
                Connect
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
